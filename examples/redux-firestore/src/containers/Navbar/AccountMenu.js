import React from 'react'
import PropTypes from 'prop-types'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import defaultUserImage from 'static/User.png'
import classes from './Navbar.scss'

const buttonStyle = { marginRight: '.5rem', width: '200px', height: '64px' }

export const AccountMenu = ({
  avatarUrl,
  displayName,
  goToAccount,
  onLogoutClick
}) => (
  <IconMenu
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
  </IconMenu>
)

AccountMenu.muiName = 'IconMenu'

AccountMenu.propTypes = {
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  goToAccount: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default AccountMenu
