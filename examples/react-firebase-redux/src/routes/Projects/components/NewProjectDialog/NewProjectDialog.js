import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'
import { required } from 'utils/form'
import { NEW_PROJECT_FORM_NAME } from 'constants'

import classes from './NewProjectDialog.scss'

export const NewProjectDialog = ({ open, onRequestClose, submit, handleSubmit }) => (
  <Dialog
    title='New Project'
    open={open}
    onRequestClose={onRequestClose}
    contentClassName={classes.container}
    actions={[
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={onRequestClose}
      />,
      <FlatButton
        label='Create'
        primary
        onTouchTap={submit}
      />
    ]}
  >
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <Field
        name='name'
        component={TextField}
        label='Project Name'
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

export default reduxForm({
  form: NEW_PROJECT_FORM_NAME
})(NewProjectDialog)
