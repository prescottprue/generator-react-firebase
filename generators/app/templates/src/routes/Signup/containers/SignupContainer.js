import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'

// Components
import SignupForm from '../components/SignupForm'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'

import classes from './SignupContainer.scss'

// redux-devsharev3
import { connect } from 'react-redux'
import { devshare, helpers } from 'redux-devshare'
const { isLoaded, isEmpty, pathToJS } = helpers

@devshare()
@connect(
  // Map state to props
  ({devshare}) => ({
    authError: pathToJS(devshare, 'authError'),
    account: pathToJS(devshare, 'profile')
  })
)
export default class Signup extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    account: PropTypes.object,
    devshare: PropTypes.object,
    authError: PropTypes.object
  }

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
    this.props.devshare
      .signup(creds)
      .then(account =>
        this.context.router.push(`${account.username}`)
      )
  }

  googleLogin = () => {
    this.setState({
      snackCanOpen: true,
      isLoading: true
    })
    this.props.devshare
      .login({ provider: 'google', type: 'popup' })
      .then(account =>
        this.context.router.push(`${account.username}`)
      )
  }

  render () {
    const { authError } = this.props
    const { snackCanOpen, isLoading } = this.state

    if (isLoading && !authError) {
      return (
        <div className={classes['container']}>
          <div className='Signup-Progress'>
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
          <GoogleButton onClick={this.googleLogin} />
        </div>
        <div className={classes['login']}>
          <span className={classes['login-label']}>
            Already have an account?
          </span>
          <Link className={classes['login-link']} to='/login'>
            Login
          </Link>
        </div>
        {
          authError && authError.message && snackCanOpen
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
