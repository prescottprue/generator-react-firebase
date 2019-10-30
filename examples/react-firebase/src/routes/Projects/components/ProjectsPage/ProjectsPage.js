import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { SuspenseWithPerf } from 'reactfire'
import ProjectRoute from 'routes/Projects/routes/Project'
import LoadingSpinner from 'components/LoadingSpinner'
import { renderChildren } from 'utils/router'
import ProjectsList from '../ProjectsList'

function ProjectsPage({ match }) {
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute], match)}
      {/* Main Route */}
      <Route
        exact
        path={match.path}
        render={() => (
          <SuspenseWithPerf fallback={<LoadingSpinner />}>
            <ProjectsList />
          </SuspenseWithPerf>
        )}
      />
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired // from enhancer (withRouter)
}

export default ProjectsPage
