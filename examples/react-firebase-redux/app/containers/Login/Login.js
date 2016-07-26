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

import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS } = helpers

// Props decorators
@firebase()
@connect(
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class Login extends Component {
  state = {
    snackCanOpen: false,
    errors: { username: null, password: null },
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

  render () {
    const { isLoading, snackCanOpen, errorMessage } = this.state
    const { authError } = this.props
    const handleLogin = loginData => {
      this.setState({
        snackCanOpen: true,
        isLoading: true
      })
  this.props.firebase.login(loginData)
      .then(() => this.context.router.push('/sheets'))


    }
    const closeToast = () => this.setState({ snackCanOpen: false })


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
          <LoginForm onLogin={ handleLogin } />
        </Paper>
        <div className='Login-Or'>
          or
        </div>
        <RaisedButton
          label='Sign in With Google'
          secondary={ true }
          onTouchTap={ handleLogin.bind(this, { provider: 'google', type: 'popup' }) }
        />
        <div className='Login-Signup'>
          <span className='Login-Signup-Label'>
            Need an account?
          </span>
          <Link className='Login-Signup-Link' to='/signup'>
            Sign Up
          </Link>
        </div>
        <Snackbar
          open={ isLoaded(authError) && !isEmpty(authError) && snackCanOpen }
          message={ authError ? authError.toString() : 'Error' }
          action='close'
          autoHideDuration={ 3000 }
          onRequestClose={ this.handleRequestClose }
        />
      </div>
    )

  }
}
