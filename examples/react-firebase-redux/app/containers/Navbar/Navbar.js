import React, { Component, PropTypes } from 'react'
import './Navbar.scss'
import { Link } from 'react-router'
import { project as projectSettings } from '../../config'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'

const stockPhotoUrl = 'https://s3.amazonaws.com/kyper-cdn/img/User.png'
const originSettings = { horizontal: 'right', vertical: 'top' }
const avatarSize = 50
const buttonStyle = { color: 'white' }

export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    onMenuClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  }

  selectItem = (e, val) => {
    if (val === 'logout' && this.props.onLogoutClick) {
      this.context.router.push(`/`)
      return this.props.onLogoutClick()
    }
    this.props.onMenuClick(val)
  }

  render() {
    const { username, avatar_url } = this.props.account ? this.props.account : {}
    const iconButton = (
      <Avatar
        className='Navbar-Avatar'
        src={ avatar_url || stockPhotoUrl }
        size={ avatarSize }
      />
    )
    const mainMenu = (
      <div className='Navbar-Main-Menu'>
        <Link to='/signup'><FlatButton label='Sign Up' style={ buttonStyle } /></Link>
        <Link to='/login'><FlatButton label='Login' style={ buttonStyle } /></Link>
      </div>
    )
    const rightMenu = username ? (
      <IconMenu
        iconButtonElement={ iconButton }
        targetOrigin={ originSettings }
        anchorOrigin={ originSettings }
        onChange={ this.selectItem }
      >
        <Link to='/account'><MenuItem primaryText='Account' value='account' /></Link>
        <MenuItem primaryText='Sign out' value='logout'/>
      </IconMenu>
    ) : mainMenu
    return (
      <AppBar
        title={
          <Link className='Navbar-Brand' to='/'>
            {projectSettings.name}
          </Link>
        }
        className='Navbar'
        showMenuIconButton={ false }
        iconElementRight={ rightMenu }
      />
    )
  }
}
