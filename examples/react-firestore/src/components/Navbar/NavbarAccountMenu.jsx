import React, { useState } from 'react'
import { useAuth } from 'reactfire'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { ACCOUNT_PATH } from 'constants/paths'

function AccountMenu() {
  const [anchorEl, setMenu] = useState(null)
  const auth = useAuth()

  function closeAccountMenu() {
    setMenu(null)
  }
  function handleMenuClick(e) {
    setMenu(e.target)
  }
  function handleLogout() {
    closeAccountMenu()
    // redirect to '/login' will occur if on a route where auth is required
    return auth.signOut()
  }

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleMenuClick}
        style={{ color: 'white' }}
        size="large">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={closeAccountMenu}>
        <MenuItem component={Link} to={ACCOUNT_PATH} onClick={closeAccountMenu}>
          Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
