import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import styles from './<%= name %>.styles'

const useStyles = makeStyles(styles)

function <%= name %>({ onSubmit }) {
  const classes = useStyles()

  function handleSubmit(values, { setSubmitting }) {
    onSubmit(values).then(() => {
      setSubmitting(false)
    })
  }

  return (
    <Formik onSubmit={handleSubmit}>
      {({ touched, isSubmitting }) => (
        <Form className={classes.root}>
          <div className={classes.fields}>
            <Field
              name="displayName"
              label="Display Name"
              margin="normal"
              fullWidth
              component={TextField}
            />
          </div>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={Object.keys(touched).length === 0 || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

<%= name %>.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default <%= name %>
