import React from 'react'
import PropTypes from 'prop-types'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'<% } %>
<% if (!materialv1 && !includeRedux) { %>import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'<% } if (materialv1 && !includeRedux) { %>import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'<% } if (materialv1) { %>import Button from '@material-ui/core/Button'<% } %><% if (includeRedux) { %>
import { required, validateEmail } from 'utils/form'<% } %>
import classes from './LoginForm.scss'

<% if (includeRedux) { %>export const LoginForm = ({ pristine, submitting, handleSubmit }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
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
        label={submitting ? 'Loading' : 'Login'}
        primary
        type="submit"
        disabled={pristine || submitting}
      /><% } %><% if (materialv1) { %><Button
        color="primary"
        type="submit"
        variant="contained"
        disabled={pristine || submitting}>
        {submitting ? 'Loading' : 'Login'}
      </Button><% } %>
    </div>
  </form>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form (calls onSubmit)
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
