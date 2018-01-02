import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'

import classes from './NewProjectDialog.scss'

export const NewProjectDialog = ({
  open,
  onRequestClose,
  submit,
  handleSubmit
}) => (
  <Dialog
    title="New Project"
    open={open}
    
    contentClassName={classes.container}
    actions={[
      <Button color="accent" onTouchTap={onRequestClose}>
        Cancel
      </Button>,
      <Button color="primary" onTouchTap={submit}>
        Create
      </Button>
    ]}>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <Field
        name="name"
        component={TextField}
        floatingLabelText="Project Name"
        validate={[required]}
      />
    </form>
  </Dialog>
)

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired // added by redux-form
}

export default NewProjectDialog
