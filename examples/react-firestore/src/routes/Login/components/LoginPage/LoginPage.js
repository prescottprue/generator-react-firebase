import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase/app' // imported for auth provider
import { useAuth } from 'reactfire'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH, LIST_PATH } from 'constants/paths'
import LoginForm from '../LoginForm'
import styles from './LoginPage.styles'

const useStyles = makeStyles(styles)

function LoginPage() {
  const classes = useStyles()
  const auth = useAuth()
  const history = useHistory()

  auth.onAuthStateChanged((auth) => {
    if (auth) {
      history.replace(LIST_PATH)
    }
  })

  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
  }

  function emailLogin(creds) {
    return auth.signInWithEmailAndPassword(creds.email, creds.password)
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
