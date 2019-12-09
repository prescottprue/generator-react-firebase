import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { validateEmail } from 'utils/form'
import styles from './SignupForm.styles'

const useStyles = makeStyles(styles)

function SignupForm({ onSubmit }) {
  const classes = useStyles()

  function handleSubmit(values, { setSubmitting }) {
    onSubmit(values).then(() => {
      setSubmitting(false)
    })
  }

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      {({ touched, isSubmitting }) => (
        <Form className={classes.root}>
          <Field
            type="username"
            name="username"
            component={TextField}
            margin="normal"
            fullWidth
          />
          <Field
            type="email"
            name="email"
            validate={validateEmail}
            component={TextField}
            margin="normal"
            fullWidth
          />
          <Field
            type="password"
            name="password"
            component={TextField}
            margin="normal"
            fullWidth
          />
          <div className={classes.submit}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={Object.keys(touched).length === 0 || isSubmitting}>
              {isSubmitting ? 'Loading' : 'Signup'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignupForm
