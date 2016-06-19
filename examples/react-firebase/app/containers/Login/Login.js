import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

// components
import LoginForm from '../../components/LoginForm/LoginForm'

// material-ui components
import Paper from 'material-ui/lib/paper'
import CircularProgress from 'material-ui/lib/circular-progress'
import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
import FontIcon from 'material-ui/lib/font-icon'

// styles
import './Login.scss'

// firebase
import firebase from '../../utils/firebase'


export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      snackCanOpen: false,
      errors: { username: null, password: null },
      errorMessage: null
    }
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

  render () {
    const { isLoading, snackCanOpen, errorMessage } = this.state
    const { authError } = this.props
    const handleLogin = loginData => {
      this.setState({
        snackCanOpen: true,
        isLoading: true
      })
  
  const { email, password, provider } = loginData
    let newState = {
      isLoading: false,
      errors: { username: null, email: null }
    }
    if (!provider && (!email || !password)) {
      newState.errors.email = email ? 'Email is required' : null
      newState.errors.password = password ? 'Password is required' : null
      console.error('missing info', loginData, email, password)
      return this.setState(newState)
    }
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
          this.setState(newState)
        })
    }
    }
    const closeToast = () => this.setState({ snackCanOpen: false })


    if (isLoading) {
      return (
        <div className="Login">
          <div className="Login-Progress">
            <CircularProgress  mode="indeterminate" />
          </div>
        </div>
      )
    }

    return (
      <div className="Login">
        <Paper className="Login-Panel">
          <LoginForm onLogin={ handleLogin } />
        </Paper>
        <div className="Login-Or">
          or
        </div>
        <RaisedButton
          label="Sign in With Google"
          secondary={ true }
          onTouchTap={ handleLogin.bind(this, { provider: 'google', type: 'popup' }) }
        />
        <div className="Login-Signup">
          <span className="Login-Signup-Label">
            Need an account?
          </span>
          <Link className="Login-Signup-Link" to="/signup">
            Sign Up
          </Link>
        </div>
        <Snackbar
          open={ snackCanOpen && typeof errorMessage !== 'null' }
          message={ errorMessage }
          
          action="close"
          autoHideDuration={ 3000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    )

  }
}
