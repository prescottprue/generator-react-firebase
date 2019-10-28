import React<% if (!includeRedux) { %>, { useState }<% } %> from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { useFirebaseApp, useUser } from 'reactfire'<% } %>
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'<% } %><% if (!includeRedux) { %>
import TextField from '@material-ui/core/TextField'<% } %>
import ProviderDataForm from '../ProviderDataForm'
import styles from './AccountForm.styles'

const useStyles = makeStyles(styles)

<% if (includeRedux) { %>function AccountForm({ account, handleSubmit, submitting, pristine }) {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.fields}>
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
      </div>
      {!!account && !!account.providerData && (
        <div>
          <Typography variant="h6">Linked Accounts</Typography>
          <ProviderDataForm providerData={account.providerData} />
        </div>
      )}
      <Button color="primary" type="submit" disabled={pristine || submitting}>
        {submitting ? 'Saving' : 'Save'}
      </Button>
    </form>
  )
}

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired // from enhancer (reduxForm)
}<% } %><% if (!includeRedux) { %>function AccountForm({ account }) {
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
}<% } %>

export default AccountForm
