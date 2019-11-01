import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFirebaseApp, useUser } from 'reactfire'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ProviderDataForm from '../ProviderDataForm'
import styles from './AccountForm.styles'

const useStyles = makeStyles(styles)

function AccountForm({ account }) {
  const classes = useStyles()
  const firebaseApp = useFirebaseApp()
  const auth = useUser()
  const [username, changeUsernameValue] = useState(null)
  const [email, changeEmailValue] = useState(null)
  const [submitting, changeSubmittingValue] = useState(false)

  function updateAccount() {
    changeSubmittingValue(true)
    return firebaseApp
      .collection('users')
      .doc(auth.uid)
      .update({ username, email })
      .then(() => {
        changeSubmittingValue(false)
      })
  }

  return (
    <div className={classes.container}>
      <h4>Account</h4>
      <div>
        <TextField
          floatingLabelText="Username"
          value={username}
          onChange={e => changeUsernameValue(e.target.value)}
        />
      </div>
      <div>
        <TextField
          hintText="someone@email.com"
          floatingLabelText="Email"
          value={email}
          onChange={e => changeEmailValue(e.target.value)}
        />
      </div>
      {!!account && !!account.providerData && (
        <div>
          <Typography variant="h6">Linked Accounts</Typography>
          <ProviderDataForm providerData={account.providerData} />
        </div>
      )}
      <Button color="primary" type="submit" onClick={updateAccount}>
        {submitting ? 'Saving' : 'Save'}
      </Button>
    </div>
  )
}

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default AccountForm
