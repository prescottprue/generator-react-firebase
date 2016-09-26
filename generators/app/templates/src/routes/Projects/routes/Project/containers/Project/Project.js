import React, { Component, PropTypes } from 'react'
import Workspace from '../Workspace/Workspace'
import { toArray } from 'lodash'

import classes from './Project.scss'
import SettingsDialog from '../../components/SettingsDialog/SettingsDialog'
import SharingDialog from 'components/SharingDialog/SharingDialog'
import CircularProgress from 'material-ui/CircularProgress'
// redux-devsharev3
import { connect } from 'react-redux'
import { devshare, helpers } from 'redux-devshare'
const { isLoaded, dataToJS } = helpers

@devshare(
  // Get paths from devshare
  ({ params }) =>
    ([
      `projects/${params.username}`,
      `projects/${params.username}/${params.projectname}`
    ])
)
@connect(
  // Map state to props
  ({ devshare }, { params }) => ({
    projects: toArray(dataToJS(devshare, `projects/${params.username}`)),
    project: dataToJS(devshare, `projects/${params.username}/${params.projectname}`)
  })
)
export default class Project extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    projects: PropTypes.array,
    project: PropTypes.object,
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    children: PropTypes.object,
    devshare: PropTypes.shape({
      project: PropTypes.func.isRequired
    })
  }

  state = {
    settingsOpen: false,
    sharingOpen: false,
    vimEnabled: false
  }

  selectProject = proj => {
    if (proj.owner) {
      this.context.router.push(`/${proj.owner.username}/${proj.name}`)
    }
  }

  addCollaborator = username =>
    this.props.devshare.project(this.props.project).addCollaborator(username)

  removeCollaborator = username =>
    this.props.devshare.project(this.props.project).removeCollaborator(username)

  toggleDialog = (name) => {
    const newState = {}
    newState[`${name}Open`] = !this.state[`${name}Open`]
    this.setState(newState)
  }

  render () {
    const { projects, project, params, devshare } = this.props
    const { settingsOpen, sharingOpen, vimEnabled } = this.state

    if (!isLoaded(project)) {
      return (
        <div className={classes['progress']}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div className={classes['container']} ref='workspace'>
        <Workspace
          project={project}
          projects={projects}
          params={params}
          onSettingsClick={() => { this.toggleDialog('settings') }}
          onSharingClick={() => { this.toggleDialog('sharing') }}
        />
        {
          settingsOpen &&
          (
            <SettingsDialog
              project={project}
              open={settingsOpen}
              onSave={this.saveSettings}
              onVimToggle={this.toggleVim}
              vimEnabled={vimEnabled}
              onRequestClose={() => { this.toggleDialog('settings') }}
            />
          )
        }
        {
          sharingOpen &&
          (
            <SharingDialog
              project={project}
              open={sharingOpen}
              searchUsers={devshare.users().search}
              onSave={this.saveSettings}
              onAddCollab={this.addCollaborator}
              onRemoveCollab={this.removeCollaborator}
              onRequestClose={() => this.toggleDialog('sharing')}
            />
          )
        }
      </div>
    )
  }
}
