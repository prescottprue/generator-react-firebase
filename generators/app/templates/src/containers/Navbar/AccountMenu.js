import React from 'react'
import PropTypes from 'prop-types'<% if (!materialv1) { %>
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'<% } %><% if (materialv1) { %>
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  buttonRoot: {
    color: 'white'
  }
}<% } %><% if (!materialv1) { %>
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import defaultUserImage from 'static/User.png'
import classes from './Navbar.scss'

const buttonStyle = { marginRight: '.5rem', width: '200px', height: '64px' }<% } %>

export const AccountMenu = ({
  avatarUrl,
  displayName,
  goToAccount,
  onLogoutClick<% if (materialv1) { %>,
  closeAccountMenu,
  anchorEl,
  handleMenu,
  classes<% } %>
}) => (
  <% if (materialv1) { %><div>
    <IconButton
      aria-owns={anchorEl ? 'menu-appbar' : null}
      aria-haspopup="true"
      onClick={handleMenu}
      classes={{ root: classes.buttonRoot }}>
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={closeAccountMenu}>
      <MenuItem onClick={goToAccount}>Account</MenuItem>
      <MenuItem onClick={onLogoutClick}>Sign Out</MenuItem>
    </Menu>
  </div><% } %><% if (!materialv1) { %><IconMenu
    iconButtonElement={
      <IconButton style={buttonStyle} disableTouchRipple>
        <div className={classes.avatar}>
          <div className="hidden-mobile">
            <Avatar src={avatarUrl || defaultUserImage} />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              {displayName || 'User'}
            </span>
            <DownArrow color="white" />
          </div>
        </div>
      </IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    animated={false}>
    <MenuItem primaryText="Account" onTouchTap={goToAccount} />
    <MenuItem primaryText="Sign out" onTouchTap={onLogoutClick} />
  </IconMenu><% } %>
)<% if (!materialv1) { %>

AccountMenu.muiName = 'IconMenu'<% } %>

AccountMenu.propTypes = {
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  goToAccount: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired<% if (materialv1) { %>,
  anchorEl: PropTypes.object,
  closeAccountMenu: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired // from withStyles<% } %>
}

export default <% if (!materialv1) { %>AccountMenu<% } else { %>withStyles(styles)(AccountMenu)<% } %>
