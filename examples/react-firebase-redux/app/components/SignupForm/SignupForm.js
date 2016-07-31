import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { reduxForm } from 'redux-form'

import './SignupForm.scss'

const fieldStyle = { width: '80%' }
const buttonStyle = { width: '96%', marginBottom: '.5rem' }

export const fields = [ 'username', 'email', 'password' ]

const validate = values => {
  const errors = {}
  if (!values.username) errors.username = 'Required'
  if (!values.email) errors.email = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSignup: PropTypes.func.isRequired
  }

  render () {
    const {fields: { username, email, password } } = this.props
    return (
      <form className='SignupForm' onSubmit={this.props.onSignup}>
        <TextField
          hintText='username'
          floatingLabelText='Username'
          {...username}
          errorText={username.touched && username.error ? username.error : null}
          style={fieldStyle}
        />
        <TextField
          hintText='email'
          floatingLabelText='Email'
          {...email}
          errorText={email.touched && email.error ? email.error : null}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          {...password}
          errorText={password.touched && password.error ? password.error : null}
          style={fieldStyle}
          type='password'
        />
        <div className='SignupForm-Submit'>
          <RaisedButton
            label='Sign Up'
            primary
            type='submit'
            style={buttonStyle}
          />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'Signup',
  fields,
  validate
})(SignupForm)
