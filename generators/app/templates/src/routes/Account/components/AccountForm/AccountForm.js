import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { validateEmail } from 'utils/form'
import ProviderDataForm from '../ProviderDataForm'
import styles from './AccountForm.styles'

const useStyles = makeStyles(styles)

function AccountForm({ account, onSubmit }) {
  const classes = useStyles()

  function handleSubmit(values, { setSubmitting }) {
    onSubmit(values).then(() => {
      setSubmitting(false)
    })
  }

  return (
    <Formik initialValues={account} onSubmit={handleSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className={classes.root}>
          <div className={classes.fields}>
            <Field
              name="displayName"
              label="Display Name"
              margin="normal"
              fullWidth
              component={TextField}
            />
            <Field
              type="email"
              name="email"
              validate={validateEmail}
              margin="normal"
              fullWidth
              component={TextField}
            />
            <Field
              name="avatarUrl"
              label="Avatar Url"
              fullWidth
              component={TextField}
            />
          </div>
          {!!account && !!account.providerData && (
            <div>
              <Typography variant="h6">Linked Accounts</Typography>
              <ProviderDataForm providerData={account.providerData} />
            </div>
          )}
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={Object.keys(touched).length === 0 || isSubmitting}>
            {isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

AccountForm.propTypes = {
  account: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default AccountForm
