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

// firebase
import firebaseUtil from '../../utils/firebase'

// styles
import './Signup.scss'


export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: { username: null, password: null },
      snackCanOpen: false,
      errorMessage: null
    }
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
      snackCanOpen: false
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
      
      let newState = {
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
      }
    }

    const closeToast = () => this.setState({ snackCanOpen: false })

    if (isLoading) {
      return (
        <div className="Signup">
          <div className="Signup-Progress">
            <CircularProgress  mode="indeterminate" />
          </div>
        </div>
      )
    }
    return (
      <div className="Signup">
        <Paper className="Signup-Panel">
          <SignupForm onSignup={ handleSignup } />
        </Paper>
        <div className="Signup-Or">
          or
        </div>
        <RaisedButton
          label="Sign in with Google"
          secondary={ true }
          onTouchTap={ handleSignup.bind(this, { provider: 'google', type: 'popup' }) }
        />
        <div className="Signup-Login">
          <span className="Signup-Login-Label">
            Already have an account?
          </span>
          <Link className="Signup-Login-Link" to="/login">Login</Link>
        </div>
        <Snackbar
          open={ this.state.snackCanOpen }
          message={ this.state.errorMessage || 'Signup error'}
          action="close"
          autoHideDuration={ 3000 }
          onRequestClose={ closeToast }
        />
      </div>
    )
  }
}
