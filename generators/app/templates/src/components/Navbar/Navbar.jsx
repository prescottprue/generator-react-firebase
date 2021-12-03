import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/material/styles'<% if (includeRedux) { %>
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'<% } %><% if (!includeRedux) { %>
import { useUser } from 'reactfire'<% } %>
import { LIST_PATH, LOGIN_PATH } from 'constants/paths'
import AccountMenu from './NavbarAccountMenu'
import NavbarWithoutAuth from './NavbarWithoutAuth'

function Navbar() {<% if (includeRedux) { %>
  // Get auth from redux state
  const auth = useSelector(({ firebase }) => firebase.auth)
  const authExists = isLoaded(auth) && !isEmpty(auth)<% } %><% if (!includeRedux) { %>
  const { data: auth } = useUser()
  const authExists = !!auth?.uid<% } %>

  return (
    <NavbarWithoutAuth brandPath={authExists ? LIST_PATH : '/'}>
      {authExists ? (
        <AccountMenu />
      ) : (
        <Button
          component={Link}
          to={LOGIN_PATH}
          data-test="sign-in"
          color="inherit">
          Sign In
        </Button>
      )}
    </NavbarWithoutAuth>
  )
}

export default Navbar
