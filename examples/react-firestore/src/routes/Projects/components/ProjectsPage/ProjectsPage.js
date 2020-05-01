import React from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf, AuthCheck } from 'reactfire'
import ProjectRoute from 'routes/Projects/routes/Project'
import LoadingSpinner from 'components/LoadingSpinner'
import { LOGIN_PATH, LIST_PATH } from 'constants/paths'
import { renderChildren } from 'utils/router'
import ProjectsList from '../ProjectsList'

function ProjectsPage() {
  const match = useRouteMatch()
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute])}
      {/* Main Route */}
      <Route
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
      />
    </Switch>
  )
}

export default ProjectsPage
