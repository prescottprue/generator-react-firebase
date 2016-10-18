import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

import classes from './ProjectContainer.scss'
import CircularProgress from 'material-ui/CircularProgress'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, dataToJS } = helpers

@firebase(
  // Get paths from firebase
  ({ params }) => ([
    `projects/${params.username}/${params.projectname}`
  ])
)
@connect(
  // Map state to props
  ({ firebase }, { params }) => ({
    project: toArray(dataToJS(firebase, `projects/${params.username}/${params.projectname}`))
  })
)
export default class Project extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    project: PropTypes.object,
    params: PropTypes.object.isRequired,
    children: PropTypes.object,
    firebase: PropTypes.shape({
      project: PropTypes.func.isRequired
    })
  }

  selectProject = proj => {
    if (proj.owner) {
      this.context.router.push(`/projects/${proj.owner}/${proj.name}`)
    }
  }

  render () {
    const { project } = this.props

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
        <pre>{JSON.stringify(project)}</pre>
      </div>
    )
  }
}
