import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import LoginForm from '../components/LoginForm'

// styles
import classes from './LoginContainer.scss'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS } = helpers

// Props decorators
@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object,
    authError: PropTypes.object,
    location: PropTypes.object.isRequired
  }

  state = {
    snackCanOpen: false,
    isLoading: false
  }

  handleLogin = loginData => {
    this.setState({
      snackCanOpen: true,
      isLoading: true
    })
    
    this.props.firebase
      .login(loginData)
      .then((account) => this.context.router.push(`/${account.username}`))
    
  }

  googleLogin = () =>
    this.handleLogin({ provider: 'google', type: 'popup' })

  render () {
    const { isLoading, snackCanOpen } = this.state
    const { authError } = this.props

    if (isLoading && !authError) {
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
          <LoginForm onSubmit={this.handleLogin} />
        </Paper>
        <div className={classes['or']}>
          or
        </div>
        <div className={classes['providers']}>
          <GoogleButton onClick={this.googleLogin} />
        </div>
        <div className={classes['signup']}>
          <span className={classes['signup-label']}>
            Need an account?
          </span>
          <Link className={classes['signup-link']} to='/signup'>
            Sign Up
          </Link>
        </div>
        {
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen
            ? <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
              />
            : null
        }
      </div>
    )
  }
}
