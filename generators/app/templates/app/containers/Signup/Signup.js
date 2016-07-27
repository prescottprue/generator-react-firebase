import { capitalize, find } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// components
import SignupForm from '../../components/SignupForm/SignupForm'

// material-ui components
import Paper from 'material-ui/lib/paper'
import RaisedButton from 'material-ui/lib/raised-button'
import CircularProgress from 'material-ui/lib/circular-progress'
import Snackbar from 'material-ui/lib/snackbar'

<% if (!answers.includeRedux) { %>import firebaseUtil from '../../utils/firebase'<% } %>

// styles
import './Signup.scss'

<% if (answers.includeRedux) { %>import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const {isLoaded, isEmpty,  dataToJS, pathToJS} = helpers

@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
  })
)<% } %>
export default class Signup extends Component {
  state = {
    errors: { username: null, password: null },
    snackCanOpen: false,
    errorMessage: null
  }
  /**
   * @function reset
   * @description Reset whole state (inputs, errors, snackbar open/close)
   */
  reset = () =>
    this.setState({
      errors: {},
      username: null,
      email: null,
      name: null,
      snackCanOpen: false,
      errorMessage: null
    })

  render () {
    const { isLoading } = this.props
    const { isFetching, error } = this.props.account || {}

    /**
     * @function handleSignup
     * @description Call signup through redux-devshare action
     */
    const handleSignup = signupData => {
      const { username, email, provider, password } = signupData
      this.setState({ snackCanOpen: true, isLoading: true })
      <% if (answers.includeRedux) { %>if (provider) {
        return this.props.firebase.login(signupData)
          .then(response => {
            console.log('response:', response)
            this.props.firebase.createUser(response, response)
          })
          .catch(error => {
            console.error('error signing up:', error, error.toString())
          })
      }
      this.props.firebase.createUser(signupData, { username, email })<% } %>
      <% if (!answers.includeRedux) { %>let newState = {
          isLoading: false,
          errors: { username: null, email: null }
        }
      if (!provider && (!email || !password)) {
        newState.errors.email = email ? 'Email is required' : null
        newState.errors.password = password ? 'Password is required' : null
        return this.setState(newState)
      }
      if (email && password) {
        firebase.auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            if (error) {
              console.error('Error logging in:', error)
              newState.errorMessage = error.message || 'Error with login'
            } else {
              console.log('time to redirect or login?', error)
            }
            this.setState(newState)
          })
      } else {
        console.warn('other signups not currently supported', provider)
      }<% } %>
    }

    const closeToast = () => this.setState({ snackCanOpen: false })

    if (isLoading) {
      return (
        <div className='Signup'>
          <div className='Signup-Progress'>
            <CircularProgress  mode='indeterminate' />
          </div>
        </div>
      )
    }
    return (
      <div className='Signup'>
        <Paper className='Signup-Panel'>
          <SignupForm onSignup={ handleSignup } />
        </Paper>
        <div className='Signup-Or'>
          or
        </div>
        <RaisedButton
          label='Sign in with Google'
          secondary={ true }
          onTouchTap={ handleSignup.bind(this, { provider: 'google', type: 'popup' }) }
        />
        <div className='Signup-Login'>
          <span className='Signup-Login-Label'>
            Already have an account?
          </span>
          <Link className='Signup-Login-Link' to='/login'>Login</Link>
        </div>
        <Snackbar
          <% if (answers.includeRedux) { %>open={ error !== null && this.state.snackCanOpen }
          message={ error || 'Signup error' }<% } %><% if (!answers.includeRedux) { %>open={ this.state.snackCanOpen }
          message={ this.state.errorMessage || 'Signup error'}<% } %>
          action='close'
          autoHideDuration={ 3000 }
          onRequestClose={ closeToast }
        />
      </div>
    )
  }
}
