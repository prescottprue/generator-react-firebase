import React, { Component, PropTypes } from 'react'<% if (answers.includeRedux) { %>
import { map } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty  } from 'react-redux-firebase'<% } %>

import { LIST_PATH } from 'constants/paths'
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './ProjectsContainer.scss'

<% if (answers.includeRedux) { %>@firebaseConnect(
  ({ params, auth }) => ([
    {
      path: 'projects',
      populates: [
        { child: 'owner', root: 'users' }
      ]
    }
    // 'projects#populate=owner:users' // string equivalent
  ])
)
@connect(
  ({ firebase }, { params }) => ({
    projects: dataToJS(firebase, 'projects'),
    auth: pathToJS(firebase, 'auth')
  })
)<% } %>
export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    newProjectModal: false,
    addProjectModal: false
  }
<% if (!includeRedux) { %>
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
  }<% } %><% if (includeRedux) { %>
  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  newSubmit = (newProject) => {
    const { auth, firebase: { push } } = this.props
    if (auth.uid) {
      newProject.owner = auth.uid
    }
    push('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = ({ name }) =>
    this.props.firebase.remove(`projects/${name}`)<% } %>

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children<% if (includeRedux) { %>

    const { projects } = this.props
    const { newProjectModal } = this.state

    if (!isLoaded(projects)) {
      return <LoadingSpinner />
    }<% } %>

    return (
      <div className={classes.container}>
        {
          newProjectModal &&
            <NewProjectDialog
              open={newProjectModal}
              <% if (includeRedux) { %>onSubmit={this.newSubmit}<% } %><% if (!includeRedux) { %>onCreateClick={this.newSubmit}<% } %>
              onRequestClose={() => this.toggleModal('newProject')}
            />
        }
        <div className={classes.tiles}>
          <NewProjectTile
            onClick={() => this.toggleModal('newProject')}
          />
          <% if (includeRedux) { %>{
            !isEmpty(projects) &&
               map(projects, (project, key) => (
                 <ProjectTile
                   key={`${project.name}-Collab-${key}`}
                   project={project}
                   onCollabClick={this.collabClick}
                   onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
                   onDelete={this.deleteProject}
                 />
              ))
          }<% } %>
        </div>
      </div>
    )
  }
}
