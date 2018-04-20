import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import Button from 'material-ui/Button'
import classes from './<%= name %>.scss'

export const <%= name %> = ({
  handleSubmit,
  submitting,
  pristine
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field component={TextField} name="someInput" label="Some Input" />
    <Button
      disabled={submitting || pristine}
      color="primary"
      type="submit"
      className={classes.submit}>
      Save
    </Button>
  </form>
)

<%= name %>.propTypes = {
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm)
}

export default <%= name %>
