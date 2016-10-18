import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

import classes from './ProjectContainer.scss'
import CircularProgress from 'material-ui/CircularProgress'

<% if (answers.includeRedux) { %>// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, dataToJS } = helpers

@firebase(
  // Get paths from firebase
  ({ params }) =>
    ([
      `projects/${params.username}`,
    ])
)
@connect(
  // Map state to props
  ({ firebase }, { params }) => ({
    projects: toArray(dataToJS(firebase, `projects/${params.username}`)),
  })
)<% } %>
export default class Project extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  <% if (answers.includeRedux) { %>static propTypes = {
    account: PropTypes.object,
    projects: PropTypes.array,
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    children: PropTypes.object,
    firebase: PropTypes.shape({
      project: PropTypes.func.isRequired
    })
  }<% } %>

  selectProject = proj => {
    if (proj.owner) {
      this.context.router.push(`/projects/${proj.name}`)
    }
  }

  render () {
    const { projects, params, firebase } = this.props

    if (!isLoaded(project)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes['container']}>
        <h2>Project Container</h2>
      </div>
    )
  }
}
