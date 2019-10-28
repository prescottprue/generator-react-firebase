import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import { useFirebase } from 'react-redux-firebase'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { SIGNUP_PATH } from 'constants/paths'
import LoginForm from '../LoginForm'
import styles from './LoginPage.styles'

const useStyles = makeStyles(styles)

function LoginPage() {
  const classes = useStyles()
  const firebase = useFirebase()

  function googleLogin() {
    return firebase.login({ provider: 'google', type: 'popup' })
  }

  function emailLogin(creds) {
    return firebase.login(creds)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <LoginForm onSubmit={emailLogin} />
      </Paper>
      <div className={classes.orLabel}>or</div>
      <div className={classes.providers}>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </div>
      <div className={classes.signup}>
        <span className={classes.signupLabel}>Need an account?</span>
        <Link className={classes.signupLink} to={SIGNUP_PATH}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
