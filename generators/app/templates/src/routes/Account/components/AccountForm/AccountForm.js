import React, { PropTypes } from 'react'

import classes from './AccountForm.scss'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'

<% if (answers.includeRedux) { %>import { Field } from 'redux-form'
import TextField from 'components/TextField'

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <div className={classes.container}>
    <h4>Account</h4>
    <div>
      <Field
        name='username'
        component={TextField}
        label='Username'
      />
    </div>
    <div>
      <Field
        name='email'
        component={TextField}
        label='Email'
      />
    </div>
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData &&
          <ProviderDataForm providerData={account.providerData} />
      }
    </div>
  </div>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}<% } %><% if (!answers.includeRedux) { %>export const AccountForm = ({ account, handleSubmit }) => (
  <div className={classes.container}>
    <h4>Account</h4>
    <div>
      <input placeholder='username' />
    </div>
    <div>
      <input placeholder='email' />
    </div>
    <div>
      <h4>Linked Accounts</h4>
      {
        account.providerData &&
          <ProviderDataForm
            providerData={account.providerData}
          />
      }
    </div>
  </div>
)

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func
}
<% } %>
export default AccountForm
