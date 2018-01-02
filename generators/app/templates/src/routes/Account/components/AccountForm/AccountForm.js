import React from 'react'
import PropTypes from 'prop-types'
<% if (includeRedux) { %>import { Field, reduxForm } from 'redux-form'
<% if (!materialv1) { %>import RaisedButton from 'material-ui/RaisedButton'<% } %><% if (materialv1) { %>import Button from 'material-ui/Button'<% } %>
import { TextField } from 'redux-form-material-ui'
import { ACCOUNT_FORM_NAME } from 'constants'<% } %><% if (!includeRedux) { %>import TextField from 'material-ui/TextField'<% } %>
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'

<% if (includeRedux) { %>export const AccountForm = ({ account, handleSubmit, submitting, pristine }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name="displayName"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Display Name"<% } %><% if (materialv1) { %>label="Display Name"<% } %>
    />
    <Field
      name="email"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Email"<% } %><% if (materialv1) { %>label="Email"<% } %>
    />
    <Field
      name="avatarUrl"
      component={TextField}
      <% if (!materialv1) { %>floatingLabelText="Avatar Url"<% } %><% if (materialv1) { %>label="Avatar Url"<% } %>
    />
    {
      !!account && !!account.providerData &&
        <div>
          <h4>Linked Accounts</h4>
          <ProviderDataForm
            providerData={account.providerData}
          />
        </div>
    }
    <% if (!materialv1) { %><RaisedButton
      primary
      label={submitting ? 'Saving' : 'Save'}
      type="submit"
      disabled={pristine || submitting}
    /><% } %><% if (materialv1) { %><Button color="primary" type="submit" disabled={pristine || submitting}>
      {submitting ? 'Saving' : 'Save'}
    </Button><% } %>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default AccountForm<% } %><% if (!includeRedux) { %>export const AccountForm = ({ account, handleSubmit }) => (
  <div className={classes.container}>
    <h4>Account</h4>
    <div>
      <TextField
        floatingLabelText="Username"
      />
    </div>
    <div>
      <TextField
        hintText="someone@email.com"
        floatingLabelText="Email"
      />
    </div>
    <div>
      <h4>Linked Accounts</h4>
      {
        account && account.providerData &&
          <ProviderDataForm
            providerData={account.providerData}
          />
      }
    </div>
  </div>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func
}
export default AccountForm
<% } %>
