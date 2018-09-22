import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from '@material-ui/core/Button'

export const TestingForm = ({
  handleSubmit,
  submitting,
  pristine,
  classes
}) => (
  <form className={classes.root} onSubmit={handleSubmit}>
    <Field component={TextField} name="someInput" label="Some Input" />
    <Button
      type="submit"
      color="primary"
      variant="contained"
      className={classes.submit}
      disabled={pristine || submitting}>
      Save
    </Button>
  </form>
)

TestingForm.propTypes = {
  classes: PropTypes.object, // from enhancer (withStyles)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm)
}

export default TestingForm
