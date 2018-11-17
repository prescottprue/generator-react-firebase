import React from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'<% } %>
import Button from '@material-ui/core/Button'
<% if (!includeRedux) { %>import TextField from '@material-ui/core/TextField'<% } if (includeRedux) { %>import { required, validateEmail } from 'utils/form'<% } %>

<% if (includeRedux) { %>const SignupForm = ({ pristine, submitting, handleSubmit, classes }) => (
  <form className={classes.root} onSubmit={handleSubmit}>
    <Field
      name="username"
      component={TextField}
      label="Username"
      validate={required}
    />
    <Field
      name="email"
      component={TextField}
      label="Email"
      validate={[required, validateEmail]}
    />
    <Field
      name="password"
      component={TextField}
      label="Password"
      type="password"
      validate={required}
    />
    <div className={classes.submit}>
      <Button
        color="primary"
        type="submit"
        variant="contained"
        disabled={pristine || submitting}>
        {submitting ? 'Loading' : 'Sign Up'}
      </Button>
    </div>
  </form>
)

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default SignupForm<% } %><% if (!includeRedux) { %>export const SignupForm = ({ handleSubmit }) => (
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

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default SignupForm<% } %>
