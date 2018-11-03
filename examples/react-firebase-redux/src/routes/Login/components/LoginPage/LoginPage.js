import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { SIGNUP_PATH } from 'constants/paths'
import LoginForm from '../LoginForm'

export const LoginPage = ({
  emailLogin,
  googleLogin,
  onSubmitFail,
  classes
}) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <LoginForm onSubmit={emailLogin} onSubmitFail={onSubmitFail} />
    </Paper>
    <div className={classes.or}>or</div>
    <div className={classes.providers}>
      <GoogleButton onClick={googleLogin} />
    </div>
    <div className={classes.signup}>
      <span className={classes.signupLabel}>Need an account?</span>
      <Link className={classes.signupLink} to={SIGNUP_PATH}>
        Sign Up
      </Link>
    </div>
  </div>
)

LoginPage.propTypes = {
  emailLogin: PropTypes.func, // from enhancer (withHandlers)
  onSubmitFail: PropTypes.func, // from enhancer (withHandlers)
  googleLogin: PropTypes.func // from enhancer (withHandlers)
}

export default LoginPage
