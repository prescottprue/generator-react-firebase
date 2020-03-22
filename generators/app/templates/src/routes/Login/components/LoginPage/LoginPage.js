import React from 'react'
import { Link<% if (!includeRedux) { %>, useHistory<% } %> } from 'react-router-dom'<% if (includeRedux) { %>
import { useFirebase } from 'react-redux-firebase'<% } %><% if (!includeRedux) { %>
import firebase from 'firebase/app' // imported for auth provider
import { useAuth } from 'reactfire'<% } %>
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH<% if (!includeRedux) { %>, LIST_PATH<% } %> } from 'constants/paths'<% if (includeRedux) { %>
import { useNotifications } from 'modules/notification'<% } %>
import LoginForm from '../LoginForm'
import styles from './LoginPage.styles'

const useStyles = makeStyles(styles)

function LoginPage() {
  const classes = useStyles()<% if (includeRedux) { %>
  const firebase = useFirebase()
  const { showError } = useNotifications()

  function onSubmitFail(formErrs, dispatch, err) {
    return showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  }

  function googleLogin() {
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .catch((err) => showError(err.message))
  }

  function emailLogin(creds) {
    return firebase.login(creds).catch((err) => showError(err.message))
  }<% } %><% if (!includeRedux) { %>
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
  }<% } %>

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <LoginForm onSubmit={emailLogin} <% if (includeRedux) { %>onSubmitFail={onSubmitFail} <% } %>/>
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
