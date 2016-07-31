import React, { Component, PropTypes } from 'react'
import './Navbar.scss'
import { Link } from 'react-router'

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
  static propTypes = {
    account: PropTypes.object,
    onMenuClick: PropTypes.func,
    onLogoutClick: PropTypes.func
  }

  selectItem = (item) => {
    if (item === 'logout' && this.props.onLogoutClick) {
      return this.props.onLogoutClick()
    }
    if (this.props.onMenuClick) {
      this.props.onMenuClick(item)
    }
  }

  render() {
    const { username, avatar_url } = this.props.account ? this.props.account : {}
    const brandLinkLoc = `/${username || ''}`
    const iconButton = (
      <Avatar
        className='Navbar-Avatar'
        src={ avatar_url || stockPhotoUrl }
        size={ avatarSize }
      />
    )
    const mainMenu = (
      <div className='Navbar-Main-Menu'>
        <FlatButton label='Sign Up' style={ buttonStyle } onClick={ () => this.selectItem('signup') } />
        <FlatButton label='Login' style={ buttonStyle } onClick={ () => this.selectItem('login') } />
      </div>
    )
    const rightMenu = username ? (
      <IconMenu
        iconButtonElement={ iconButton }
        targetOrigin={ originSettings }
        anchorOrigin={ originSettings }
        onChange={ this.selectItem }
      >
        <MenuItem primaryText='Account' value='account' />
        <MenuItem primaryText='About' value='about'/>
        <MenuItem primaryText='Sign out' value='logout'/>
      </IconMenu>
    ) : mainMenu
    return (
      <AppBar
        title={
          <Link className='Navbar-Brand' to={ brandLinkLoc }>
            <%= appName %>
          </Link>
        }
        className='Navbar'
        showMenuIconButton={ false }
        iconElementRight={ rightMenu }
      />
    )
  }
}
