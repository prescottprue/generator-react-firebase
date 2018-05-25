import React from 'react'
import PropTypes from 'prop-types'
<% if (includeRedux) { %>import { Field } from 'redux-form'
<% if (!materialv1) { %>import RaisedButton from 'material-ui/RaisedButton'<% } %><% if (materialv1) { %>import Button from '@material-ui/core/Button'<% } %>
import { TextField } from 'redux-form-material-ui'<% } %><% if (!includeRedux && !materialv1) { %>import TextField from 'material-ui/TextField'<% } %><% if (!includeRedux && materialv1) { %>import TextField from '@material-ui/core/TextField'<% } %>
import ProviderDataForm from '../ProviderDataForm'
import classes from './AccountForm.scss'

<% if (includeRedux) { %>export const AccountForm = ({
  account,
  handleSubmit,
  submitting,
  pristine
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <% if (!materialv1) { %><div className={classes.fields}>
      <Field
        name="displayName"
        component={TextField}
        floatingLabelText="Display Name"
      />
      <Field name="email" component={TextField} floatingLabelText="Email" />
      <Field
        name="avatarUrl"
        component={TextField}
        floatingLabelText="Avatar Url"
      />
    </div><% } %><% if (materialv1) { %><div className={classes.fields}>
      <Field
        fullWidth
        name="displayName"
        component={TextField}
        label="Display Name"
      />
      <Field name="email" label="Email" component={TextField} fullWidth />
      <Field
        name="avatarUrl"
        label="Avatar Url"
        component={TextField}
        fullWidth
      />
    </div><% } %>
    {!!account &&
      !!account.providerData && (
        <div>
          <h4>Linked Accounts</h4>
          <ProviderDataForm providerData={account.providerData} />
        </div>
      )}
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
