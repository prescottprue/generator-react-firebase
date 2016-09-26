import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

export const SignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes['container']} onSubmit={handleSubmit}>
      <div>
        <input name='username' placeholder='Username' />
      </div>
      <div>
        <input name='email' placeholder='Email' />
      </div>
      <div>
        <input name='password' placeholder='Password' type='password' />
      </div>
      <div className={classes['submit']}>
        <RaisedButton
          label='Signup'
          primary
          type='submit'
          disabled={submitting}
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
