import React, { PropTypes } from 'react'

import classes from './AccountForm.scss'
import ProviderDataForm from '../ProviderDataForm/ProviderDataForm'

export const AccountForm = ({ account, handleSubmit }) => (
  <div className={classes['Account']}>
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
export default AccountForm
