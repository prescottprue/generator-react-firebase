import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'<% if (!includeRedux) { %>
import { SuspenseWithPerf, AuthCheck } from 'reactfire'<% } %>
import ProjectRoute from 'routes/Projects/routes/Project'<% if (!includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'
import { LOGIN_PATH, LIST_PATH } from 'constants/paths'<% } %>
import { renderChildren } from 'utils/router'
import ProjectsList from '../ProjectsList'

function ProjectsPage() {
  const match = useRouteMatch()
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute])}
      {/* Main Route */}
      <% if (!includeRedux) { %><Route
        exact
        path={match.path}
        render={() => (
          <SuspenseWithPerf
            fallback={<LoadingSpinner />}
            traceId="load-projects">
            <AuthCheck
              fallback={
                <Redirect
                  to={{
                    pathname: LOGIN_PATH,
                    state: { from: LIST_PATH }
                  }}
                />
              }>
              <ProjectsList />
            </AuthCheck>
          </SuspenseWithPerf>
        )}
      /><% } %><% if (includeRedux) { %><Route exact path={match.path} render={() => <ProjectsList />} /><% } %>
    </Switch>
  )
}

export default ProjectsPage
