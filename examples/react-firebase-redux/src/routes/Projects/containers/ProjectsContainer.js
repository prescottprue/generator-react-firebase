import React, { Component, PropTypes } from 'react'
import { toArray } from 'lodash'

// Components
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import CircularProgress from 'material-ui/CircularProgress'

import classes from './ProjectsContainer.scss'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { dataToJS, isLoaded, isEmpty } = helpers

// Decorators
@firebase(
  ({ params }) => ([
    'todos'
  ])
)
@connect(
  ({ firebase }, { params }) => ({
    todos: toArray(dataToJS(firebase, `todos/${params.username}`))
  })
)
export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    newProjectModal: false,
    addProjectModal: false
  }

  static propTypes = {
    account: PropTypes.object,
    todos: PropTypes.array,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object
  }

  newSubmit = name =>
    this.props.firebase
      .child('todos')
      .push({ name, owner: this.props.account.username })
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err)
      })

  deleteProject = ({ name }) =>
    this.props.firebase.remove(`todos/${name}`)

  openProject = project =>
    this.context.router.push(`/todos/${project.name}`)

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children

    const { todos } = this.props
    const { newProjectModal } = this.state

    if (!isLoaded(todos)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    // User has no todos and doesn't match logged in user
    if (isEmpty(todos)) {
      return (
        <div className={classes['container']}>
          <div>This user has no todos</div>
        </div>
      )
    }

    const todosList = todos.map((project, i) => (
      <ProjectTile
        key={`${project.name}-Collab-${i}`}
        project={project}
        onCollabClick={this.collabClick}
        onSelect={this.openProject}
        onDelete={this.deleteProject}
      />
    ))

    todosList.unshift(
      <NewProjectTile
        onClick={this.toggleModal('newProject')}
      />
    )

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
          {todosList}
        </div>
      </div>
    )
  }
}
