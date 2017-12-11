import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import AccountMenu from './AccountMenu'
import LoginMenu from './LoginMenu'
import { LIST_PATH } from 'constants'
import classes from './Navbar.scss'

export const Navbar = ({
  avatarUrl,
  displayName,
  authExists,
  goToAccount,
  handleLogout
}) => (
  <AppBar
    title={
      <Link to={authExists ? LIST_PATH : '/'} className={classes.brand}>
        react-firebase-redux
      </Link>
    }
    showMenuIconButton={false}
    iconElementRight={
      authExists ? (
        <AccountMenu
          avatarUrl={avatarUrl}
          displayName={displayName}
          onLogoutClick={handleLogout}
        />
      ) : (
        <LoginMenu />
      )
    }
    iconStyleRight={authExists ? { marginTop: 0 } : {}}
    className={classes.appBar}
  />
)

Navbar.propTypes = {
  displayName: PropTypes.string, // from enhancer (flattenProps - profile)
  avatarUrl: PropTypes.string, // from enhancer (flattenProps - profile)
  authExists: PropTypes.bool, // from enhancer (withProps - auth)
  goToAccount: PropTypes.func, // from enhancer (withHandlers - router)
  handleLogout: PropTypes.func // from enhancer (withHandlers - firebase)
}

export default Navbar
