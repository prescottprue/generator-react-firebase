import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import LoginForm from '../components/LoginForm/LoginForm'
import { LIST_PATH } from 'constants/paths'

// styles
import classes from './LoginContainer.scss'

// redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
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
      .then((account) =>
        this.context.router.push(LIST_PATH)
      )
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider, type: 'popup' })

  render () {
    const { account, authError } = this.props
    const { snackCanOpen } = this.state

    if (!isLoaded(account) && !isEmpty(account)) {
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
          <GoogleButton onClick={() => this.providerLogin('google')} />
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
          isLoaded(authError) && !isEmpty(authError) && snackCanOpen &&
            <Snackbar
              open={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
              message={authError ? authError.message : 'Signup error'}
              action='close'
              autoHideDuration={3000}
            />
        }
      </div>
    )
  }
}
