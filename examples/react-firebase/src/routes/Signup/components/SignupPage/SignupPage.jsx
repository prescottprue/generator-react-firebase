import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import firebase from 'firebase/app' // imported for auth provider
import { useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import { LOGIN_PATH, LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'
import styles from './SignupPage.styles'

const useStyles = makeStyles(styles)

function SignupPage() {
  const classes = useStyles()
  const { showError } = useNotifications()
  const auth = useAuth()

  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth
      .signInWithPopup(provider)
      .then((result) => {
        // NOTE: window.location used since history.push/replace does not always work
        window.location = LIST_PATH
      })
      .catch((err) => showError(err.message))
  }

  function emailSignup(creds) {
    return auth
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((result) => {
        // NOTE: window.location used since history.push/replace does not always work
        window.location = LIST_PATH
      })
      .catch((err) => showError(err.message))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <SignupForm onSubmit={emailSignup} />
      </Paper>
      <div className={classes.orLabel}>or</div>
      <div className={classes.providers}>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </div>
      <div className={classes.login}>
        <span className={classes.loginLabel}>Already have an account?</span>
        <Link className={classes.loginLink} to={LOGIN_PATH}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignupPage
