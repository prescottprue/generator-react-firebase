import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'

function LoginForm({ handleSubmit, error }) {
  return (
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
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default LoginForm
