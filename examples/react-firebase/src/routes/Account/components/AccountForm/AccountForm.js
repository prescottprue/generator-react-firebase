import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'
import classes from './AccountForm.scss'

export const AccountForm = ({ account, handleSubmit }) => (
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

