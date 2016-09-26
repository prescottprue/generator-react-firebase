import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

// Components
import ProjectTile from '../../components/ProjectTile/ProjectTile'
import NewProjectTile from '../../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../../components/NewProjectDialog/NewProjectDialog'
import SharingDialog from 'components/SharingDialog/SharingDialog'
import CircularProgress from 'material-ui/CircularProgress'
import classes from './Projects.scss'

// redux/devshare
import { connect } from 'react-redux'
import { devshare, helpers } from 'redux-devshare'
const { pathToJS, dataToJS, isLoaded, isEmpty } = helpers

// Decorators
@devshare(
  ({ params }) =>
    ([
      `projects/${params.username}`,
      // TODO: Use population instead of loading whole usernames list
      'usernames'
      // `projects/${params.username}#populate=collaborators:users`,
    ])
)
@connect(
  ({ devshare }, { params }) => ({
    projects: toArray(dataToJS(devshare, `projects/${params.username}`))
    .map(project =>
      (project.collaborators && dataToJS(devshare, 'usernames'))
        ? Object.assign(project, {
          collaborators: project.collaborators.map(id => ({ username: dataToJS(devshare, 'usernames')[id] }))
        })
        : project
    ),
    account: pathToJS(devshare, 'profile'),
    auth: pathToJS(devshare, 'auth')
  })
)
export class Projects extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    projects: PropTypes.array,
    devshare: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object,
    history: PropTypes.object
  }

  state = {
    addCollabModal: false,
    newProjectModal: false
  }

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    if (project) {
      newState.currentProject = project
    }
    this.setState(newState)
  }

  newSubmit = name =>
    this.props.devshare
      .projects()
      .add({ name, owner: this.props.account.username })
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err)
      })

  // TODO: Delete through devshare projects method
  deleteProject = ({ name }) =>
    this.props.devshare
      .remove(`projects/${this.props.params.username}/${name}`)

  // TODO: Open based on project info instead of route param
  openProject = project =>
    this.context.router.push(`/${this.props.params.username}/${project.name}`)

  collabClick = user => {
    this.context.router.push(`/${user.username}`)
  }

  render () {
    // console.log('projects container render:', this.props)
    // TODO: Look into moving this into its own layer
    if (this.props.children) return this.props.children

    const { projects, account, params: { username }, devshare } = this.props
    const { newProjectModal, addCollabModal, currentProject } = this.state

    if (!isLoaded(projects)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    // User has no projects and doesn't match logged in user
    if (isEmpty(projects) && account && username !== account.username) {
      return (
        <div className={classes['container']}>
          <div>This user has no projects</div>
        </div>
      )
    }

    const projectsList = projects.map((project, i) =>
      (
      <ProjectTile
        key={`${project.name}-Collab-${i}`}
        project={project}
        onCollabClick={this.collabClick}
        onAddCollabClick={() => this.toggleModal('addCollab', project)}
        onSelect={this.openProject}
        onDelete={this.deleteProject}
      />
      )
    )

    // If username doesn't match route then hide add project tile
    if (account && account.username === username) {
      projectsList.unshift((
        <NewProjectTile
          key='Project-New'
          onClick={() => this.toggleModal('newProject')}
        />
      ))
    }

    return (
      <div className={classes['container']}>
        {
          addCollabModal
          ? (
            <SharingDialog
              project={currentProject}
              open={addCollabModal}
              searchUsers={devshare.users().search}
              onAddCollab={devshare.project(currentProject).addCollaborator}
              onRemoveCollab={devshare.project(currentProject).removeCollaborator}
              onRequestClose={() => this.toggleModal('addCollab')}
            />
          ) : null
        }
        {
          newProjectModal
          ? (
            <NewProjectDialog
              open={newProjectModal}
              onCreateClick={this.newSubmit}
              onRequestClose={() => this.toggleModal('newProject')}
            />
          ) : null
        }
        <div className={classes['tiles']}>
          {projectsList}
        </div>
      </div>
    )
  }
}
export default Projects
