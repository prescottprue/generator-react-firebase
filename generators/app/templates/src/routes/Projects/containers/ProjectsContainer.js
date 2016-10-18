import React, { Component, PropTypes } from 'react'<% if (answers.includeRedux) { %>
import { toArray } from 'lodash'<% } %>

// Components
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import CircularProgress from 'material-ui/CircularProgress'

import classes from './ProjectsContainer.scss'
<% if (answers.includeRedux) { %>
// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { pathToJS, dataToJS, isLoaded, isEmpty } = helpers

// Decorators
@firebase(
  ({ params }) =>
    ([
      `projects/${params.username}`,
      // TODO: Use population instead of loading whole usernames list
      // `projects/${params.username}#populate=collaborators:users`,
    ])
)
@connect(
  ({ firebase }, { params }) => ({
    projects: toArray(dataToJS(firebase, `projects/${params.username}`)),
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)<% } %>
export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    newProjectModal: false,
    addProjectModal: false,
    currentProject: null
  }

<% if (!answers.includeRedux) { %>
  static propTypes = {
    account: PropTypes.object,
    projects: PropTypes.array,
    children: PropTypes.object,
    params: PropTypes.object
  }

  componentWillMount() {
    //TODO: Call util to load list
  }

  newSubmit = name => {
    // TODO: create new project
  }<% } %>

<% if (answers.includeRedux) { %>
  static propTypes = {
    account: PropTypes.object,
    projects: PropTypes.array,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  newSubmit = name =>
    this.props.firebase
      .child('projects')
      .push({ name, owner: this.props.account.username })
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err)
      })

  deleteProject = ({ name }) =>
    this.props.firebase
      .remove(`projects/${name}`)<% } %>

  openProject = project =>
    this.context.router.push(`/projects/${project.name}`)

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    if (project) {
      newState.currentProject = project
    }
    this.setState(newState)
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children<% if (answers.includeRedux) { %>

    const { projects, account, params: { username }, firebase } = this.props
    const { newProjectModal, addCollabModal, currentProject } = this.state

    if (!isLoaded(projects)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    // User has no projects and doesn't match logged in user
    if (isEmpty(projects)) {
      return (
        <div className={classes['container']}>
          <div>This user has no projects</div>
        </div>
      )
    }
<% } %>
<% if (!answers.includeRedux) { %>
    const { projects } = this.props
    const { newProjectModal } = this.state

    if (!projects) {
      return (
        <div className={classes['container']}>
          <p>No Projects found</p>
        </div>
      )
    }
<% } %>
    const projectsList = projects.map((project, i) => (
      <ProjectTile
        key={`${project.name}-Collab-${i}`}
        project={project}
        onCollabClick={this.collabClick}
        onAddCollabClick={() => this.toggleModal('addCollab', project)}
        onSelect={this.openProject}
        onDelete={this.deleteProject}
      />
    ))

    return (
      <div className={classes['container']}>
        {
          newProjectModal &&
            <NewProjectDialog
              open={newProjectModal}
              onCreateClick={this.newSubmit}
              onRequestClose={() => this.toggleModal('newProject')}
            />
        }
        <div className={classes['tiles']}>
          {projectsList}
        </div>
      </div>
    )
  }
}
