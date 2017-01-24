import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

export const SignupForm = ({ handleSubmit, error }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <TextField
          floatingLabelText='Username'
          errorText={error || null}
        />
      </div>
      <div>
        <TextField
          hintText='someone@email.com'
          floatingLabelText='Email'
          errorText={error || null}
        />
      </div>
      <div>
        <TextField
          floatingLabelText='Password'
          errorText={error || null}
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
