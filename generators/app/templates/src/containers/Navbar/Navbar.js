import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'<% if (materialv1) { %>
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'<% } %>
import AccountMenu from './AccountMenu'
import LoginMenu from './LoginMenu'
import { LIST_PATH } from 'constants'
import classes from './Navbar.scss'

export const Navbar = ({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  handleLogout<% if (materialv1) { %>,
  closeAccountMenu,
  anchorEl,
  handleMenu<% } %>
}) => (
  <% if (!materialv1) { %><AppBar
    title={
      <Link to={authExists ? LIST_PATH : '/'} className={classes.brand}>
        <%= appName %>
      </Link>
    }
    showMenuIconButton={false}
    iconElementRight={
      authExists ? (
        <AccountMenu
          avatarUrl={avatarUrl}
          displayName={displayName}
          onLogoutClick={handleLogout}
          goToAccount={goToAccount}
        />
      ) : (
        <LoginMenu />
      )
    }
    iconStyleRight={authExists ? { marginTop: 0 } : {}}
    className={classes.appBar}
  /><% } %><% if (materialv1) { %><AppBar position="static">
    <Toolbar>
      <Link to={authExists ? LIST_PATH : '/'} className={classes.brand}>
        <Typography type="title" color="inherit" className={classes.flex}>
          <%= appName %>
        </Typography>
      </Link>
      {authExists ? (
          <AccountMenu
            avatarUrl={avatarUrl}
            displayName={displayName}
            onLogoutClick={handleLogout}
            goToAccount={goToAccount}
            closeAccountMenu={closeAccountMenu}
            handleMenu={handleMenu}
            anchorEl={anchorEl}
          />
      )
    : (
      <LoginMenu />
    )}
    </Toolbar>
  </AppBar><% } %>
)

Navbar.propTypes = {
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func.isRequired, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func.isRequired<% if (materialv1) { %>,<% } %> // from enhancer (withHandlers - firebase)<% if (materialv1) { %>
  anchorEl: PropTypes.object,
  closeAccountMenu: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  handleMenu: PropTypes.func.isRequired // from enhancer (withHandlers - firebase)<% } %>
}

export default Navbar
