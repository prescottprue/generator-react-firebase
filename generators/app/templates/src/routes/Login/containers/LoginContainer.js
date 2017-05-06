import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
<% if (includeRedux) { %>
import { connect } from 'react-redux'
import { UserIsNotAuthenticated } from 'utils/router'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
<% } %>
import { SIGNUP_PATH } from 'constants'
import LoginForm from '../components/LoginForm'
<% if (!includeRedux) { %>import firebaseUtil from 'utils/firebase'
<% } %>
import classes from './LoginContainer.scss'

<% if (includeRedux) { %>@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))<% } %>
export default class Login extends Component {
  <% if (!includeRedux) { %>static contextTypes = {
    router: PropTypes.object
  }<% } %><% if (includeRedux) { %>static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string // eslint-disable-line react/no-unused-prop-types
    })
  }
<% } %>
  state = {
    snackCanOpen: false
  }

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true
    })
<% if (!includeRedux) { %>
    const { email, password } = loginData
    if (email && password) {
      firebaseUtil.auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error) {
            console.error('Error logging in:', error)
            newState.errorMessage = error.message || 'Error with login'
          } else {
            console.log('time to redirect or login?', error)
          }
          this.setState({ isLoading: false })
        })
    }<% } %>
    <% if (includeRedux) { %>return this.props.firebase.login(loginData)<% } %>
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider, type: 'popup' })

  render () {
    <% if (includeRedux) { %>const { authError } = this.props<% } %>
    const { snackCanOpen } = this.state

    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={classes.or}>
          or
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.signup}>
          <span className={classes.signupLabel}>
            Need an account?
          </span>
          <Link className={classes.signupLink} to={SIGNUP_PATH}>
            Sign Up
          </Link>
        </div><% if (!includeRedux) { %>
        {
          snackCanOpen && typeof errorMessage !== null &&
            <Snackbar
              open={snackCanOpen && typeof errorMessage !== 'null'}
              message={errorMessage}
              action='close'
              autoHideDuration={3000}
              onRequestClose={() => this.setState({ snackCanOpen: false })}
            />
        }
<% } %><% if (includeRedux) { %>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
            />
        }<% } %>
      </div>
    )
  }
}
