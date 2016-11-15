import React, { Component, PropTypes } from 'react'
import { LIST_PATH } from 'constants/paths'

// Components
import ProjectTile from '../components/ProjectTile/ProjectTile'
import NewProjectTile from '../components/NewProjectTile/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog/NewProjectDialog'
import CircularProgress from 'material-ui/CircularProgress'

import classes from './ProjectsContainer.scss'

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
    projects: PropTypes.array,
    children: PropTypes.object,
    params: PropTypes.object
  }

  componentWillMount() {
    //TODO: Call util to load list
  }

  newSubmit = name => {
    // TODO: create new project
  }

  toggleModal = (name, project) => {
    let newState = {}
    newState[`${name}Modal`] = !this.state[`${name}Modal`]
    this.setState(newState)
  }

  render () {
    // Project Route is being loaded
    if (this.props.children) return this.props.children
    const { projects } = this.props
    const { newProjectModal } = this.state

    if (!projects) {
      return (
        <div className={classes['container']}>
          <p>No Projects found</p>
        </div>
      )
    }

    const projectsList = map(projects, (project, key) => (
      <ProjectTile
        key={`${project.name}-Collab-${key}`}
        project={project}
        onCollabClick={this.collabClick}
        onSelect={() => this.context.router.push(`${LIST_PATH}/${key}`)}
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
          <NewProjectTile
            onClick={() => this.toggleModal('newProject')}
          />
          {projectsList}
        </div>
      </div>
    )
  }
}
