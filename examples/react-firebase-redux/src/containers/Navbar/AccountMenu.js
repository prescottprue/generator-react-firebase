import React from 'react'
import PropTypes from 'prop-types'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui-icons/AccountCircle'

export const AccountMenu = ({
  avatarUrl,
  displayName,
  goToAccount,
  onLogoutClick,
  closeAccountMenu,
  anchorEl,
  handleMenu
}) => (
  <div>
    <IconButton
      aria-owns={anchorEl ? 'menu-appbar' : null}
      aria-haspopup="true"
      onClick={handleMenu}
      color="contrast">
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
  </div>
)

AccountMenu.propTypes = {
  displayName: PropTypes.string,
  avatarUrl: PropTypes.string,
  goToAccount: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  closeAccountMenu: PropTypes.func.isRequired,
  handleMenu: PropTypes.func
}

export default AccountMenu
