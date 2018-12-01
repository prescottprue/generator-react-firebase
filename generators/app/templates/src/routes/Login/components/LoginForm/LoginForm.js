import React from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'<% } %>
<% if (!includeRedux) { %>import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'<% } else { %>import Button from '@material-ui/core/Button'<% } %><% if (includeRedux) { %>
import { required, validateEmail } from 'utils/form'<% } %>

<% if (includeRedux) { %>const LoginForm = ({ pristine, submitting, handleSubmit, classes }) => (
  <form className={classes.root} onSubmit={handleSubmit}>
    <Field
      name="email"
      component={TextField}
      autoComplete="email"
      label="Email"
      validate={[required, validateEmail]}
    />
    <Field
      name="password"
      component={TextField}
      autoComplete="current-password"
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
        {submitting ? 'Loading' : 'Login'}
      </Button>
    </div>
  </form>
)

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default LoginForm<% } %><% if (!includeRedux) { %>export const LoginForm = ({ handleSubmit, error }) => (
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default LoginForm<% } %>
