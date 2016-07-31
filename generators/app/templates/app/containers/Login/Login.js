import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
<% if (!answers.includeRedux) { %>import firebase from '../../utils/firebase'<% } %><% if (answers.includeRedux) { %>import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS } = helpers<% } %>

import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import LoginForm from '../../components/LoginForm/LoginForm'
import { project as projectSettings } from '../../config'
import './Login.scss'

<% if (answers.includeRedux) { %>// Props decorators
@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)<% } %>
export default class Login extends Component {
  <% if (answers.includeRedux) { %>static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object,
    authError: PropTypes.object
  }<% } %>

  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    snackCanOpen: false,
    errorMessage: null
  }

  componentWillReceiveProps (nextProps) {
    const { account, authError } = nextProps
    if (authError) {
      this.setState({
        isLoading: false
      })
    }
  }

  handleRequestClose = () => this.setState({ snackCanOpen: false })

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true,
      isLoading: true
    })
    <% if (answers.includeRedux) { %>this.props.firebase.login(loginData)
        .then(() => this.context.router.push(`/${projectSettings.postLoginRoute}`))<% } %><% if (!answers.includeRedux) { %>const { email, password } = loginData
    if (email && password) {
      firebase.auth()
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
  }

  googleLogin = () => {
    // TODO: Handle Google Login
    console.log('google')
  }

  render () {
    const { isLoading, snackCanOpen, errorMessage } = this.state
    const { authError } = this.props

    if (isLoading) {
      return (
        <div className='Login'>
          <div className='Login-Progress'>
            <CircularProgress  mode='indeterminate' />
          </div>
        </div>
      )
    }

    return (
      <div className='Login'>
        <Paper className='Login-Panel'>
          <LoginForm onLogin={ this.handleLogin } />
        </Paper>
        <div className='Login-Or'>
          or
        </div>
        <GoogleButton onClick={ this.googleLogin } />
        <div className='Login-Signup'>
          <span className='Login-Signup-Label'>
            Need an account?
          </span>
          <Link className='Login-Signup-Link' to='/signup'>
            Sign Up
          </Link>
        </div>
        <Snackbar
          <% if (answers.includeRedux) { %>open={ isLoaded(authError) && !isEmpty(authError) && snackCanOpen }
          message={ authError ? authError.toString() : 'Error' }<% } %><% if (!answers.includeRedux) { %>open={ snackCanOpen && typeof errorMessage !== 'null' }
          message={ errorMessage }
          <% } %>
          action='close'
          autoHideDuration={ 3000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    )

  }
}
