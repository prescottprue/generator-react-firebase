import React from 'react'
import PropTypes from 'prop-types'
<% if (includeRedux) { %>import { Field, reduxForm } from 'redux-form'<% } %>
import RaisedButton from 'material-ui/RaisedButton'
<% if (includeRedux) { %>import { TextField } from 'redux-form-material-ui'
import { required, validateEmail } from 'utils/form'
import { SIGNUP_FORM_NAME } from 'constants'<% } %>
import classes from './SignupForm.scss'

<% if (includeRedux) { %>const SignupForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='username'
      component={TextField}
      floatingLabelText='Username'
      validate={required}
    />
    <Field
      name='email'
      component={TextField}
      floatingLabelText='Email'
      validate={[required, validateEmail]}
    />
    <Field
      name='password'
      component={TextField}
      floatingLabelText='Password'
      type='password'
      validate={required}
    />
    <div className={classes.submit}>
      <RaisedButton
        label='Signup'
        primary
        type='submit'
        disabled={pristine || submitting}
      />
    </div>
  </form>
)

SignupForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
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
