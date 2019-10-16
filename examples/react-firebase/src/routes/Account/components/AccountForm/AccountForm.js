import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import ProviderDataForm from '../ProviderDataForm'
import styles from './AccountForm.styles'

const useStyles = makeStyles(styles)

function AccountForm({ account, handleSubmit }) {
  return (
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
}

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func
}
export default AccountForm

