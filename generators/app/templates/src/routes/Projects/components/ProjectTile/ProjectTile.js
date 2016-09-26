import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import PersonIcon from 'material-ui/svg-icons/social/person'
import PersonAddIcon from 'material-ui/svg-icons/social/person-add'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ProjectSettingsDialog from '../ProjectSettingsDialog/ProjectSettingsDialog'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import DeleteDialog from '../DeleteDialog/DeleteDialog'

import classes from './ProjectTile.scss'

const personIconStyle = { width: '50%', height: '65%' }
const avatarSize = 50
const hoverColor = '#03A9F4'

export default class ProjectTile extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onAddCollabClick: PropTypes.func,
    onCollabClick: PropTypes.func,
    onDelete: PropTypes.func
  }

  state = {
    vimEnabled: false,
    settingsOpen: false,
    dropdownOpen: false,
    deleteOpen: false
  }

  handleSelect = e => {
    e.preventDefault()
    this.props.onSelect(this.props.project)
  }

  toggleDropdown = e => {
    this.setState({
      anchorEl: e.currentTarget,
      dropdownOpen: !this.state.dropdownOpen,
      settingsOpen: false,
      deleteOpen: false
    })
  }

  handleDropdownClose = () => {
    this.setState({
      dropdownOpen: false,
      deleteOpen: false
    })
  }

  addClick = e => {
    e.preventDefault()
    if (this.props.onAddCollabClick) this.props.onAddCollabClick()
  }

  collaboratorClick = collaborator => {
    if (this.props.onCollabClick) this.props.onCollabClick(collaborator)
  }

  closeDialog = (name, name2) => {
    let newState = {}
    newState[`${name}Open`] = false
    if (name2) newState[`${name2}Open`] = true
    this.setState(newState)
  }

  openDialog = (name, name2, e) => {
    let newState = {}
    newState[`${name}Open`] = true
    if (name2) {
      newState[`${name2}Open`] = false
      e && e.preventDefault && e.preventDefault()
    } else {
      name2 && name2.preventDefault && name2.preventDefault()
    }
    this.setState(newState)
  }

  deleteProject = () => {
    this.closeDialog('delete')
    if (this.props.onDelete) this.props.onDelete(this.props.project)
  }

  render () {
    const { collaborators, name, owner } = this.props.project
    let collaboratorsList = []
    // Collaborator Bubbles
    if (collaborators) {
      collaboratorsList = collaborators.map((user, i) => {
        const { username, avatarUrl } = user
        return (
          <div
            key={`${name}-Collab-${i}`}
            className={classes['collaborator']}
            onClick={this.collaboratorClick.bind(this, user)}>
            {
              !username
              ? (
                <Avatar
                  className={classes['collaborator-avatar']}
                  src={avatarUrl || null}
                  icon={<PersonIcon hoverColor={hoverColor} />}
                  size={avatarSize}
                />
              )
              : (
                <Avatar className={classes['collaborator-avatar']} size={avatarSize}>
                  {username.charAt(0).toUpperCase()}
                </Avatar>
              )
            }

          </div>
        )
      })
    }

    // New Collaborator Button
    if (this.props.onAddCollabClick) {
      collaboratorsList.push((
        <div key={`${name}-Add-Collab`} onClick={this.addClick}>
          <Avatar
            className={classes['collaborator-avatar']}
            icon={
              <PersonAddIcon
                style={personIconStyle}
                hoverColor={hoverColor}
              />
            }
            size={avatarSize}
          />
        </div>
      ))
    }

    return (
      <div>
        <ProjectSettingsDialog
          project={this.props.project}
          open={this.state.settingsOpen}
          onSave={this.saveSettings}
          onVimToggle={this.toggleVim}
          vimEnabled={this.state.vimEnabled}
          onRequestClose={this.closeDialog.bind(this, 'settings')}
        />
        <DeleteDialog
          name={name}
          open={this.state.deleteOpen || false}
          onSubmit={this.deleteProject}
        />
        <Paper key={`Project-${name}`} className={classes['container']}>
          <div className={classes['top']}>
            <span className={classes['name']} onClick={this.handleSelect}>
              {name}
            </span>
            <Popover
              open={this.state.dropdownOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.handleDropdownClose}
            >
              <List>
                <ListItem
                  primaryText='More Settings'
                  onClick={() => { this.openDialog('settings', 'dropdown') }}
                />
                <ListItem
                  primaryText='Delete'
                  onClick={() => { this.openDialog('delete', 'dropdown') }}
                />
              </List>
            </Popover>
            <SettingsIcon className={classes['settings']} onClick={this.toggleDropdown} hoverColor={hoverColor} />
          </div>
          <span className={classes['owner']}>
            {owner || 'No Owner'}
          </span>
          <div className={classes['collaborators']}>
            {collaboratorsList}
          </div>
        </Paper>
      </div>
    )
  }
}
