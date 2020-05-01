import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import ProjectRoute from 'routes/Projects/routes/Project'
import LoadingSpinner from 'components/LoadingSpinner'
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
            <ProjectsList />
          </SuspenseWithPerf>
        )}
      />
    </Switch>
  )
}

export default ProjectsPage
