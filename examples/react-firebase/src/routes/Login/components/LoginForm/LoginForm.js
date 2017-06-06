import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import { RECOVER_PATH, LOGIN_FORM_NAME } from 'constants'
import classes from './LoginForm.scss'

export const LoginForm = ({ handleSubmit, error }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <div>
      <TextField
        hintText='someone@email.com'
        floatingLabelText='Email'
        errorText={error || null}
      />
    </div>
    <div>
      <TextField
        type='password'
        floatingLabelText='Password'
        errorText={error || null}
      />
    </div>
    <div className={classes.submit}>
      <RaisedButton
        label='Login'
        primary
        type='submit'
      />
    </div>
    <div className={classes.options}>
      <div className={classes.remember}>
        <Checkbox
          name='remember'
          value='remember'
          label='Remember'
          labelStyle={{ fontSize: '.8rem' }}
        />
      </div>
      <Link className={classes.recover} to={RECOVER_PATH}>
        Forgot Password?
      </Link>
    </div>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default LoginForm
