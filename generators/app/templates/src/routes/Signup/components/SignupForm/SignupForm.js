import React from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'<% } %>
<% if (!materialv1) { %>import RaisedButton from 'material-ui/RaisedButton'<% } %><% if (materialv1) { %>import Button from '@material-ui/core/Button'<% } %>
<% if (!includeRedux && !materialv1) { %>import TextField from 'material-ui/TextField'<% } if (!includeRedux && materialv1) { %>import TextField from '@material-ui/core/TextField'<% } if (includeRedux) { %>import { required, validateEmail } from 'utils/form'<% } %>
import classes from './SignupForm.scss'

<% if (includeRedux) { %>const SignupForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name="username"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Username"<% } %><% if (materialv1) { %>label="Username"<% } %>
      validate={required}
    />
    <Field
      name="email"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Email"<% } %><% if (materialv1) { %>label="Email"<% } %>
      validate={[required, validateEmail]}
    />
    <Field
      name="password"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Password"<% } %><% if (materialv1) { %>label="Password"<% } %>
      type="password"
      validate={required}
    />
    <div className={classes.submit}>
      <% if (!materialv1) { %><RaisedButton
        label="Signup"
        primary
        type="submit"
        disabled={pristine || submitting}
      /><% } %><% if (materialv1) { %><Button
        color="primary"
        type="submit"
        raised
        disabled={pristine || submitting}>
        {submitting ? 'Loading' : 'Sign Up'}
      </Button><% } %>
    </div>
  </form>
)

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form (calls onSubmit)
}

export default SignupForm<% } %><% if (!includeRedux) { %>export const SignupForm = ({ handleSubmit }) => {
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
