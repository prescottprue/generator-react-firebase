import React, { Suspense } from 'react'<% if (!includeRedux) { %>
import { Route, Redirect } from 'react-router-dom'
import { AuthCheck } from 'reactfire'
import { LOGIN_PATH } from 'constants/paths'<% } %><% if (includeRedux) { %>
import { Route } from 'react-router-dom'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { createBrowserHistory } from 'history'<% } %>
import LoadingSpinner from 'components/LoadingSpinner'<% if (includeRedux) { %>
import { LIST_PATH } from 'constants/paths'

const locationHelper = locationHelperBuilder({})
const history = createBrowserHistory()

const AUTHED_REDIRECT = 'AUTHED_REDIRECT'
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT'

/**
 * Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {React.Component} componentToWrap - Component to wrap
 * @returns {React.Component} wrappedComponent
 */
export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    !auth.isEmpty && !!auth.uid,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectAction: (newLoc) => (dispatch) => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

/**
 * Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {React.Component} componentToWrap - Component to wrap
 * @returns {React.Component} wrappedComponent
 */
export const UserIsNotAuthenticated = connectedRouterRedirect({
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || LIST_PATH,
  redirectAction: (newLoc) => (dispatch) => {
    // Use push, replace, and go to navigate around.
    history.push(newLoc)
    dispatch({
      type: AUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})<% } %><% if (includeRedux) { %>

/**
 * Render children based on route config objects
 * @param {Array} routes - Routes settings array
 * @param {Object} match - Routes settings array
 * @param {Object} parentProps - Props to pass to children from parent
 * @returns {Array} List of routes
 */
export function renderChildren(routes, match, parentProps) {
  return routes.map((route) => (
    <Route
      key={`${match.url}-${route.path}`}
      path={`${match.url}/${route.path}`}
      render={(props) => <route.component {...parentProps} {...props} />}
    />
  ))
}<% } else { %>

/**
 * Render children based on route config objects
 * @param {Array} routes - Routes settings array
 * @param {Object} match - Routes settings array
 * @param {Object} parentProps - Props to pass to children from parent
 * @returns {Array} List of routes
 */
export function renderChildren(routes, match, parentProps) {
  return routes.map((route) => (
    <Route
      key={`${match.url}-${route.path}`}
      path={`${match.url}/${route.path}`}
      render={(props) =>
        route.authRequired ? (
          <AuthCheck
            fallback={
              <Redirect
                to={{
                  pathname: LOGIN_PATH,
                  state: { from: props.location }
                }}
              />
            }>
            <route.component {...parentProps} {...props} />
          </AuthCheck>
        ) : (
          <route.component {...parentProps} {...props} />
        )
      }
    />
  ))
}<% } %>

/**
 * Create component which is loaded async, showing a loading spinner
 * in the meantime.
 * @param {object} loadFunc - Loading options
 * @returns {React.Component}
 */
export function loadable(loadFunc) {
  const OtherComponent = React.lazy(loadFunc)
  return function LoadableWrapper(loadableProps) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <OtherComponent {...loadableProps} />
      </Suspense>
    )
  }
}
