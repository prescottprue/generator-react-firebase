import React, { PropTypes } from 'react'
<% if (answers.includeRedux) { %>import { Field, reduxForm } from 'redux-form'<% } %>
import TextField from '../../../../components/TextField'
import classes from './AccountForm.scss'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'

<% if (answers.includeRedux) { %>import { connect } from 'react-redux'
import { helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <div className={classes['Account']}>
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
          <ProviderDataForm
            providerData={account.providerData}
          />
      }
    </div>
  </div>
)<% } %><% if (!answers.includeRedux) { %>export const AccountForm = ({ account }) => (
  <div className={classes['Account']}>
    <h4>Account</h4>
    <div>
      <input placeholder='username' defaultValue={account.username} />
    </div>
    <div>
      <input placeholder='email' defaultValue={account.email} />
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
)<% } %>

AccountForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}
<% if (!answers.includeRedux) { %>export default AccountForm<% } %>
<% if (answers.includeRedux) { %>const AccountReduxForm = reduxForm({
  form: 'Account'
})(AccountForm)

export default connect(({firebase}) => (
  {
    initialValues: pathToJS(firebase, 'profile'),
    account: pathToJS(firebase, 'profile')
  }
))(AccountReduxForm)<% } %>
