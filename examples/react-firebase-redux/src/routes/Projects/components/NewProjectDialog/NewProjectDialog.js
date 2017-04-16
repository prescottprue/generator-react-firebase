import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm, submit } from 'redux-form'
import TextField from 'components/TextField'
import { required } from 'utils/form'
import { NEW_PROJECT_FORM_NAME } from 'constants'

import classes from './NewProjectDialog.scss'

@reduxForm({
  form: NEW_PROJECT_FORM_NAME
})
export default class NewProjectDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleSubmitClick = (e) => {
    this.props.dispatch(submit(NEW_PROJECT_FORM_NAME))
  }

  render () {
    const { open, onRequestClose, handleSubmit } = this.props

    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={onRequestClose}
      />,
      <FlatButton
        label='Create'
        primary
        onTouchTap={this.handleSubmitClick}
      />
    ]

    return (
      <Dialog
        title='New Project'
        modal={false}
        actions={actions}
        open={open}
        onRequestClose={onRequestClose}
        contentClassName={classes.container}>
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
  }
}
