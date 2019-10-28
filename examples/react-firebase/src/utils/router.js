import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthCheck } from 'reactfire'
import { LOGIN_PATH } from 'constants/paths'

/**
 * Render children based on route config objects
 * @param {Array} routes - Routes settings array
 * @param {Object} match - Routes settings array
 * @param {Object} parentProps - Props to pass to children from parent
 * @returns {Array} List of routes
 */
export function renderChildren(routes, match, parentProps) {
  return routes.map(route => (
    <Route
      key={`${match.url}-${route.path}`}
      path={`${match.url}/${route.path}`}
      render={props =>
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
}
