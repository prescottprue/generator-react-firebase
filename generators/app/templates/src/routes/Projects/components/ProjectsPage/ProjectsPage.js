import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'<% if (!includeRedux) { %>
import { SuspenseWithPerf } from 'reactfire'<% } %>
import ProjectRoute from 'routes/Projects/routes/Project'<% if (!includeRedux) { %>
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import { renderChildren } from 'utils/router'
import ProjectsList from '../ProjectsList'

function ProjectsPage({ match }) {
  return (
    <Switch>
      {/* Child routes */}
      {renderChildren([ProjectRoute], match)}
      {/* Main Route */}
      <% if (!includeRedux) { %><Route
        exact
        path={match.path}
        render={() => (
          <SuspenseWithPerf fallback={<LoadingSpinner />}>
            <ProjectsList />
          </SuspenseWithPerf>
        )}
      /><% } %><% if (includeRedux) { %><Route exact path={match.path} render={() => <ProjectsList />} /><% } %>
    </Switch>
  )
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired // from enhancer (withRouter)
}

export default ProjectsPage
