import React from 'react'
import { Link<% if (!includeRedux) { %>, useHistory<% } %> } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'<% if (includeRedux) { %>
import { useFirebase } from 'react-redux-firebase'<% } %><% if (!includeRedux) { %>
import firebase from 'firebase/app' // imported for auth provider
import { useAuth } from 'reactfire'<% } %>
import { makeStyles } from '@material-ui/core/styles'
import { LOGIN_PATH<% if (!includeRedux) { %>, LIST_PATH<% } %> } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'
import styles from './SignupPage.styles'

const useStyles = makeStyles(styles)

function SignupPage() {
  const classes = useStyles()
  const { showError } = useNotifications()<% if (includeRedux) { %>
  const firebase = useFirebase()

  function onSubmitFail(formErrs, dispatch, err) {
    showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  }

  function googleLogin() {
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .catch((err) => showError(err.message))
  }

  function emailSignup(creds) {
    return firebase
      .createUser(creds, {
        email: creds.email,
        username: creds.username
      })
      .catch((err) => showError(err.message))
  }<% } %><% if (!includeRedux) { %>
  const auth = useAuth()
  const history = useHistory()

  auth.onAuthStateChanged((authState) => {
    if (authState) {
      history.replace(LIST_PATH)
    }
  })

  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider).catch((err) => showError(err.message))
  }

  function emailSignup(creds) {
    return auth
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .catch((err) => showError(err.message))
  }<% } %>

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <SignupForm onSubmit={emailSignup} <% if (includeRedux) { %>onSubmitFail={onSubmitFail} <% } %>/>
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
