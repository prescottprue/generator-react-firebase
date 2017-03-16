import React, { Component, PropTypes } from 'react'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import {
  LIST_PATH,
  ACCOUNT_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants/paths'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import defaultUserImage from 'static/User.png'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

<% if (!includeRedux) { %>// firebase
// TODO: Import actions for firebase<% } %><% if (includeRedux) { %>import { connect } from 'react-redux'
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase'

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  <% if (includeRedux) { %>static propTypes = {
    auth: PropTypes.object,
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }<% } %><% if (!includeRedux) { %>static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }<% } %>

  handleLogout = () => {
    <% if (!includeRedux) { %>this.props.logout()<% } %><% if (includeRedux) { %>this.props.firebase.logout()
    this.context.router.push('/')<% } %>
  }

  render () {
    const { account } = this.props
    <% if (includeRedux) { %>const accountExists = isLoaded(account) && !isEmpty(account)<% } %>

    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className='hidden-mobile'>
            <Avatar
              <% if (includeRedux) { %>src={accountExists && account.avatarUrl ? account.avatarUrl : defaultUserImage}<% } %><% if (!includeRedux) { %>src={account.avatarUrl ? account.avatarUrl : defaultUserImage}<% } %>
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              { accountExists && account.displayName ? account.displayName : 'User' }
            </span>
            <DownArrow color='white' />
          </div>
        </div>
      </IconButton>
    )

    const mainMenu = (
      <div className={classes.menu}>
        <Link to={SIGNUP_PATH}>
          <FlatButton
            label='Sign Up'
            style={buttonStyle}
          />
        </Link>
        <Link to={LOGIN_PATH}>
          <FlatButton
            label='Login'
            style={buttonStyle}
          />
        </Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        animated={false}
      >
        <MenuItem
          primaryText='Account'
          onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
        />
        <MenuItem
          primaryText='Sign out'
          onTouchTap={this.handleLogout}
        />
      </IconMenu>
    ) : mainMenu

    return (
      <AppBar
        title={
          <Link to={accountExists ? `${LIST_PATH}` : '/'} className={classes.brand}>
            <%= appName %>
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        iconStyleRight={accountExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}
      />
    )
  }
}
