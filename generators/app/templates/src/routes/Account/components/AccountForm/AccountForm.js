import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
<% if (includeRedux) { %>import Button from '@material-ui/core/Button'
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'<% } %><% if (!includeRedux) { %>import TextField from '@material-ui/core/TextField'<% } %>
import ProviderDataForm from '../ProviderDataForm'
import styles from './AccountForm.styles'

const useStyles = makeStyles(styles)

<% if (includeRedux) { %>function AccountForm({ account, handleSubmit, submitting, pristine }) {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <h4>Account</h4>
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
          <h4>Linked Accounts</h4>
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
}

export default AccountForm<% } %><% if (!includeRedux) { %>function AccountForm({ account, handleSubmit }) {
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
<% } %>
