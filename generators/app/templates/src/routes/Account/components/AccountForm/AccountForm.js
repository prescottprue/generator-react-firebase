import React, { PropTypes } from 'react'
<% if (includeRedux) { %>import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'components/TextField'
import { ACCOUNT_FORM_NAME } from 'constants'<% } %><% if (!includeRedux) { %>import TextField from 'material-ui/TextField'<% } %>
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'
import classes from './AccountForm.scss'

<% if (includeRedux) { %>export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <Field
      name='displayName'
      component={TextField}
      label='Display Name'
    />
    <Field
      name='email'
      component={TextField}
      label='Email'
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
    <RaisedButton
      primary
      label='Save'
      type='submit'
      className={classes.submit}
    />
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: ACCOUNT_FORM_NAME
})(AccountForm)<% } %><% if (!includeRedux) { %>export const AccountForm = ({ account, handleSubmit }) => (
  <div className={classes.container}>
    <h4>Account</h4>
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
