import React, { Component } from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { map } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, populatedDataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase'<% } %>
import { LIST_PATH } from 'constants'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../components/ProjectTile'
import NewProjectTile from '../components/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog'
import classes from './ProjectsContainer.scss'

<% if (includeRedux) { %>const populates = [
  { child: 'createdBy', root: 'users' }
]

@firebaseConnect(({ params, auth }) => ([
  {
    path: 'projects',
    populates
  }
]))
@connect(({ firebase }, { params }) => ({
  projects: populatedDataToJS(firebase, 'projects', populates),
  auth: pathToJS(firebase, 'auth')
}))<% } %>
export default class Projects extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object<% if (includeRedux) { %>,
    projects: PropTypes.object,
    firebase: PropTypes.object<% } %><% if (!includeRedux) { %>,
    projects: PropTypes.array,
    account: PropTypes.object,
    params: PropTypes.object<% } %>
  }

  state = {
    newProjectModal: false
  }
<% if (!includeRedux) { %>
  componentWillMount() {
    //TODO: Call util to load list
  }

  newSubmit = name => {
    // TODO: create new project
  }<% } %><% if (includeRedux) { %>
  newSubmit = (newProject) => {
    const { firebase: { pushWithMeta } } = this.props
    // push new project with createdBy and createdAt
    return pushWithMeta('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = ({ name }) =>
    this.props.firebase.remove(`projects/${name}`)<% } %>

  toggleModal = (name, project) => {
    this.setState({ [`${name}Modal`]: !this.state[`${name}Modal`] })
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
                   key={`Project-${key}`}
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
