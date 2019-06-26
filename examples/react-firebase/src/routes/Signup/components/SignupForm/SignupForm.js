import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function SignupForm({ handleSubmit }) {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <TextField label='Username' />
      </div>
      <div>
        <TextField
          hintText='someone@email.com'
          label='Email'
        />
      </div>
      <div>
        <TextField
          label='Password'
          type="password"
        />
      </div>
      <div className={classes.submit}>
        <RaisedButton
          label='Signup'
          primary
          type='submit'
          style={buttonStyle}
        />
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default SignupForm
