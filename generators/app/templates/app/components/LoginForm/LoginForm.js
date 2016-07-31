import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Checkbox from 'material-ui/lib/checkbox'
import { reduxForm } from 'redux-form'

import './LoginForm.scss'
const fieldStyle = { width: '80%' }
const buttonStyle = { width: '100%' }

export const fields = [ 'username', 'password' ]

const validate = values => {
  const errors = {}
  if (!values.username) errors.username = 'Required'
  if (!values.password) errors.password = 'Required'
  return errors
}

class LoginForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onLogin: PropTypes.func.isRequired
  }

  render () {
    const {fields: {username, password}, isLoading} = this.props
    return (
      <form className='LoginForm' onSubmit={this.props.onLogin}>
        <TextField
          hintText='some@email.com'
          floatingLabelText='Username/Email'
          {...username}
          errorText={username.touched && username.error ? username.error : null}
          style={fieldStyle}
        />
        <TextField
          hintText='password'
          floatingLabelText='Password'
          type='password'
          {...password}
          errorText={password.touched && password.error ? password.error : null}
          style={fieldStyle}
        />
        <div className='LoginForm-Submit'>
          <RaisedButton
            label='Login'
            primary
            type='submit'
            disabled={isLoading}
            style={buttonStyle}
          />
        </div>
        <div className='LoginForm-Options'>
          <div className='LoginForm-Remember'>
            <Checkbox
              name='remember'
              value='remember'
              label='Remember'
              labelStyle={{ fontSize: '.8rem' }}
            />
          </div>
          <Link className='LoginForm-Recover-Link' to='/recover'>
            Forgot Password?
          </Link>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
})(LoginForm)
