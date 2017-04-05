import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
<% if (includeRedux) { %> // redux-form
import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'
import { required, validateEmail } from 'utils/form'
import { SIGNUP_FORM_NAME } from 'constants/formNames'<% } %>
import classes from './SignupForm.scss'
const buttonStyle = { width: '100%' }

<% if (includeRedux) { %>const SignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Field
        name='username'
        component={TextField}
        label='Username'
        validate={[required]}
      />
      <Field
        name='email'
        component={TextField}
        label='Email'
        validate={[required, email]}
      />
      <Field
        name='password'
        component={TextField}
        label='Password'
        type='password'
        validate={[required]}
      />
      <div className={classes.submit}>
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
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SIGNUP_FORM_NAME
})(SignupForm)<% } %><% if (!includeRedux) { %>export const SignupForm = ({ handleSubmit }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <TextField
          floatingLabelText='Username'
        />
      </div>
      <div>
        <TextField
          hintText='someone@email.com'
          floatingLabelText='Email'
        />
      </div>
      <div>
        <TextField
          floatingLabelText='Password'
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

export default SignupForm<% } %>
