import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
<% if (!includeRedux) { %>// firebase
// TODO: Import actions for firebase<% } %><% if (includeRedux) { %>import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'<% } %>
import { LIST_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH } from 'constants'
import defaultUserImage from 'static/User.png'
import classes from './Navbar.scss'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: {
    marginRight: '.5rem',
    width: '30px',
    height: '64px',
    padding: '0'
  }
}

<% if (includeRedux) { %>@firebaseConnect()
@connect(
  ({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })
)<% } %>
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  <% if (includeRedux) { %>static propTypes = {
    profile: PropTypes.object,
    auth: PropTypes.object,
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
    const { profile, auth } = this.props
    <% if (includeRedux) { %>const authExists = isLoaded(auth) && !isEmpty(auth)<% } %>

    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className="hidden-mobile">
            <Avatar
              <% if (includeRedux) { %>src={profile && profile.avatarUrl ? profile.avatarUrl : defaultUserImage}<% } %><% if (!includeRedux) { %>src={profile.avatarUrl ? profile.avatarUrl : defaultUserImage}<% } %>
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              {profile && profile.displayName ? profile.displayName : 'User'}
            </span>
            <DownArrow color="white" />
          </div>
        </div>
      </IconButton>
    )

    const mainMenu = (
      <div className={classes.menu}>
        <Link to={SIGNUP_PATH}>
          <FlatButton label="Sign Up" style={buttonStyle} />
        </Link>
        <Link to={LOGIN_PATH}>
          <FlatButton label="Login" style={buttonStyle} />
        </Link>
      </div>
    )

    const rightMenu = authExists ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        animated={false}>
        <MenuItem
          primaryText="Account"
          onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
        />
        <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
      </IconMenu>
    ) : (
      mainMenu
    )

    return (
      <AppBar
        title={
          <Link to={authExists ? LIST_PATH : '/'} className={classes.brand}>
            <%= appName %>
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={isLoaded(auth, profile) ? rightMenu : null}
        iconStyleRight={authExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}
      />
    )
  }
}
