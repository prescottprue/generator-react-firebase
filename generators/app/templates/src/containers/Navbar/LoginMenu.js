import React from 'react'
import { Link } from 'react-router'
<% if (materialv1) { %>import Button from '@material-ui/core/Button'<% } %><% if (!materialv1) { %>import FlatButton from 'material-ui/FlatButton'<% } %>
import { LOGIN_PATH, SIGNUP_PATH } from 'constants'
import classes from './Navbar.scss'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

export const LoginMenu = () => (
  <div className={classes.menu}>
    <% if (materialv1) { %><Button style={buttonStyle} component={Link} to={SIGNUP_PATH}>
      Sign Up
    </Button>
    <Button style={buttonStyle} component={Link} to={LOGIN_PATH}>
      Login
    </Button><% } %><% if (!materialv1) { %><Link to={SIGNUP_PATH}>
      <FlatButton label="Sign Up" style={buttonStyle} />
    </Link>
    <Link to={LOGIN_PATH}>
      <FlatButton label="Login" style={buttonStyle} />
    </Link><% } %>
  </div>
)

export default LoginMenu
