import React, { Component, PropTypes } from 'react'
import { LIST_PATH } from 'constants'
import LoadingSpinner from 'components/LoadingSpinner'
import ProjectTile from '../components/ProjectTile'
import NewProjectTile from '../components/NewProjectTile'
import NewProjectDialog from '../components/NewProjectDialog'
import classes from './ProjectsContainer.scss'


export default class Projects extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object,
    projects: PropTypes.array,
    account: PropTypes.object,
    params: PropTypes.object
  }
  state = {
    newProjectModal: false
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

    return (
      <div className={classes.container}>
        {
          newProjectModal &&
            <NewProjectDialog
              open={newProjectModal}
              onCreateClick={this.newSubmit}
              onRequestClose={() => this.toggleModal('newProject')}
            />
        }
        <div className={classes.tiles}>
          <NewProjectTile
            onClick={() => this.toggleModal('newProject')}
          />
          
        </div>
      </div>
    )
  }
}
