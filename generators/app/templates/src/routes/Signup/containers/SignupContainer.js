import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import Snackbar from 'material-ui/Snackbar'
<% if (includeRedux) { %>import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import { UserIsNotAuthenticated } from 'utils/router'<% } %>
import { LIST_PATH, LOGIN_PATH } from 'constants'
import SignupForm from '../components/SignupForm'
<% if (!includeRedux) { %>import firebaseUtil from 'utils/firebase'
import LoadingSpinner from 'components/LoadingSpinner'<% } %>
import classes from './SignupContainer.scss'

<% if (includeRedux) { %>@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect()
@connect(({ firebase }) => ({
  authError: pathToJS(firebase, 'authError')
}))<% } %>
export default class Signup extends Component {
  <% if (!includeRedux) { %>static contextTypes = {
    router: PropTypes.object
  }<% } %><% if (includeRedux) { %>static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }<% } %>

  state = {
    snackCanOpen: false
  }

  handleSignup = (creds) => {
    this.setState({
      snackCanOpen: true
    })
    <% if (!includeRedux) { %>const { username, email, provider, password } = creds
    let newState
    if (email && password) {
      firebaseUtil.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          if (error) {
            console.error('Error logging in:', error)
            newState.errorMessage = error.message || 'Error with login'
          } else {
            console.log('time to redirect or login?', error)
          }
          this.setState({ isLoading: false })
        })
    } else {
      console.warn('other signups not currently supported', provider)
    }<% } %><% if (includeRedux) { %>this.props.firebase.createUser(creds, {
      email: creds.email,
      username: creds.username
    })
<% } %>
  }

  providerLogin = provider => {
    this.setState({
      snackCanOpen: true
    })
<% if (!includeRedux) { %>
  // TODO: Handle Google Login without react-redux-firebase<% } %><% if (includeRedux) { %>
    this.props.firebase
      .login({ provider, type: 'popup' })
      .then(account =>
        this.context.router.push(LIST_PATH)
      )<% } %>
  }

  render() {
    const { snackCanOpen } = this.state<% if (includeRedux) { %>
    const { authError } = this.props<% } %><% if (!includeRedux) { %>
    const { snackCanOpen, isLoading, errorMessage } = this.state

    if (isLoading) {
      return <LoadingSpinner />
    }<% } %>

    return (
      <div className={classes.container}>
        <Paper className={classes.panel}>
          <SignupForm onSubmit={this.handleSignup} />
        </Paper>
        <div className={classes.or}>
          or
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.login}>
          <span className={classes.loginLabel}>Already have an account?</span>
          <Link className={classes.loginLink} to={LOGIN_PATH}>
            Login
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
        }<% } %><% if (includeRedux) { %>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
              onRequestClose={() => this.setState({ snackCanOpen: false })}
            />
        }<% } %>
      </div>
    )
  }
}
