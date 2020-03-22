import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from 'reactfire'
import { LIST_PATH, LOGIN_PATH } from 'constants/paths'
import AccountMenu from './AccountMenu'
import NavbarWithoutAuth from './NavbarWithoutAuth'
import styles from './Navbar.styles'

const useStyles = makeStyles(styles)

function Navbar() {
  const classes = useStyles()
  const auth = useUser()
  const authExists = !!auth && !!auth.uid

  return (
    <NavbarWithoutAuth brandPath={authExists ? LIST_PATH : '/'}>
      {authExists ? (
        <AccountMenu />
      ) : (
        <Button
          className={classes.signIn}
          component={Link}
          to={LOGIN_PATH}
          data-test="sign-in">
          Sign In
        </Button>
      )}
    </NavbarWithoutAuth>
  )
}

export default Navbar
