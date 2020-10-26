import React, { useState } from 'react'<% if (includeRedux) { %>
import { useFirebase } from 'react-redux-firebase'<% } %><% if (!includeRedux) { %>
import { useFirebaseApp } from 'reactfire'<% } %>
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import { ACCOUNT_PATH } from 'constants/paths'
import styles from './Navbar.styles'

const useStyles = makeStyles(styles)

function AccountMenu() {
  const classes = useStyles()
  const [anchorEl, setMenu] = useState(null)<% if (includeRedux) { %>
  const firebase = useFirebase()<% } %><% if (!includeRedux) { %>
  const firebase = useFirebaseApp()<% } %>

  function closeAccountMenu() {
    setMenu(null)
  }
  function handleMenuClick(e) {
    setMenu(e.target)
  }
  function handleLogout() {
    closeAccountMenu()<% if (includeRedux) { %>// redirect to '/' handled by UserIsAuthenticated HOC
    return firebase.logout()<% } %><% if (!includeRedux) { %>
    // redirect to '/login' will occur if on a route where auth is required
    return firebase.auth().signOut()<% } %>
  }

  return (
    <>
      <IconButton
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleMenuClick}
        classes={{ root: classes.accountButton }}>
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
