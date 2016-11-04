import React, { Component, PropTypes } from 'react'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import { LIST_PATH, ACCOUNT_PATH } from 'constants/paths'
// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import StockPhoto from 'static/User.png'

const originSettings = { horizontal: 'right', vertical: 'top' }
const buttonStyle = { color: 'white', textDecoration: 'none' }
const avatarSize = 50

const avatarStyles = {
  icon: { width: avatarSize, height: avatarSize },
  button: { marginRight: '1.5rem', width: avatarSize, height: avatarSize },
  wrapper: { marginTop: 45 - avatarSize }
}

import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { pathToJS } = helpers

// Props decorators
@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render () {
    const { account } = this.props

    const iconButton = (
      <IconButton iconStyle={avatarStyles.icon} style={avatarStyles.button}>
        <Avatar
          src={account && account.avatarUrl ? account.avatarUrl : StockPhoto}
        />
      </IconButton>
    )

    const mainMenu = (
      <div className={classes['menu']}>
        <Link to='/signup'>
          <FlatButton
            label='Sign Up'
            style={buttonStyle}
          />
        </Link>
        <Link to='/login'>
          <FlatButton
            label='Login'
            style={buttonStyle}
          />
        </Link>
      </div>
    )

    const rightMenu = account && account.email ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={originSettings}
        animated={false}
      >
        <MenuItem
          primaryText='Account'
          value='account'
          onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
        />
        <MenuItem
          primaryText='Sign out'
          value='logout'
          onClick={this.handleLogout}
        />
      </IconMenu>
    ) : mainMenu

    // Only apply styling if avatar is showing
    const menuStyle = account && account.email && avatarStyles.wrapper

    // Redirect to projects page if logged in
    const brandPath = account && account.email ? `/${LIST_PATH}` : '/'

    return (
      <AppBar
        title={
          <Link to={brandPath} className={classes['brand']}>
            react-firebase-redux
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        iconStyleRight={menuStyle}
      />
    )
  }
}
