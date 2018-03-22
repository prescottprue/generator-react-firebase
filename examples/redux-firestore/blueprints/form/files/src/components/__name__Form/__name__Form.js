import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from 'material-ui/Button'
import classes from './<%= pascalEntityName %>Form.scss'

export const <%= pascalEntityName %>Form = ({
  handleSubmit,
  submitting,
  pristine
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name="displayName"
      component={TextField}
      label="Display Name"
    />
    <Button
      disabled={submitting || pristine}
      color="primary"
      type="submit"
      className={classes.submit}>
      Save
    </Button>
  </form>
)

<%= pascalEntityName %>Form.propTypes = {
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm)
}

export default <%= pascalEntityName %>Form
