import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'

// Components
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import { LIST_PATH } from 'constants/paths'
import SignupForm from '../components/SignupForm/SignupForm'

import classes from './SignupContainer.scss'

<% if (!includeRedux) { %>import firebaseUtil from '../../../utils/firebase'<% } %><% if (includeRedux) { %>// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, pathToJS } = helpers

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
<% if (includeRedux) { %>
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object,
    authError: PropTypes.object
  }<% } %>

  state = {
    snackCanOpen: false,
    isLoading: false
  }

  handleRequestClose = () =>
    this.setState({
      snackCanOpen: false
    })

  handleSignup = (creds) => {
    this.setState({
      snackCanOpen: true,
      isLoading: true
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
    }<% } %><% if (includeRedux) { %>const { createUser, login } = this.props.firebase
    createUser(creds, { email: creds.email, username: creds.username })
    .then(() => {
      login(creds)
    })
    .then(() =>
      this.context.router.push(LIST_PATH)
    )<% } %>
  }

  providerLogin = (provider) => {
    this.setState({
      snackCanOpen: true,
      isLoading: true
    })
<% if (!includeRedux) { %>
  // TODO: Handle Google Login without react-redux-firebase<% } %><% if (includeRedux) { %>
    this.props.firebase
      .login({ provider, type: 'popup' })
      .then(account =>
        this.context.router.push(LIST_PATH)
      )<% } %>
  }

  render () {
    <% if (includeRedux) { %>const { account, authError } = this.props
    const { snackCanOpen } = this.state

    if (!isLoaded(account) && !authError) {<% } %><% if (!includeRedux) { %>const { snackCanOpen, isLoading, errorMessage } = this.state

    if (isLoading) {<% } %>
      return (
        <div className={classes['container']}>
          <div className={classes['progress']}>
            <CircularProgress mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className={classes['container']}>
        <Paper className={classes['panel']}>
          <SignupForm onSubmit={this.handleSignup} />
        </Paper>
        <div className={classes['or']}>
          or
        </div>
        <div className={classes['providers']}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes['login']}>
          <span className={classes['login-label']}>
            Already have an account?
          </span>
          <Link className={classes['login-link']} to='/login'>
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
              onRequestClose={this.handleRequestClose}
            />
        }<% } %><% if (includeRedux) { %>
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
