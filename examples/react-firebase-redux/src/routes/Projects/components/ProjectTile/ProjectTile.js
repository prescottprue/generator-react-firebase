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

import classes from './ProjectTile.scss'

const personIconStyle = { width: '50%', height: '65%' }
const avatarSize = 50
const hoverColor = '#03A9F4'

export default class ProjectTile extends Component {

  static propTypes = {
    project: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  handleSelect = e => {
    e.preventDefault()
    this.props.onSelect(this.props.project)
  }

  render () {
    const { name, owner } = this.props.project

    return (
      <Paper key={`Project-${name}`} className={classes['container']}>
        <div className={classes['top']}>
          <span className={classes['name']} onClick={this.handleSelect}>
            {name}
          </span>
          <SettingsIcon className={classes['settings']} onClick={this.toggleDropdown} hoverColor={hoverColor} />
        </div>
        <span className={classes['owner']}>
          {owner || 'No Owner'}
        </span>
      </Paper>
    )
  }
}
