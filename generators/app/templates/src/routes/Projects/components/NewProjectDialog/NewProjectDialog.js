import React from 'react'
import PropTypes from 'prop-types'<% if (!materialv1) { %>
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'<% } %><% if (materialv1) { %>
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'<% } %>
<% if (!includeRedux && !materialv1) { %>import TextField from 'material-ui/TextField'<% } %><% if (!includeRedux && materialv1) { %>import TextField from '@material-ui/core/TextField'<% } %><% if (includeRedux) { %>import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { required } from 'utils/form'<% } %>

import classes from './NewProjectDialog.scss'

<% if (includeRedux) { %>export const NewProjectDialog = ({
  open,
  onRequestClose,
  submit,
  handleSubmit
}) => (
  <Dialog<% if (materialv1) { %> open={open} onClose={onRequestClose}><% } %><% if (!materialv1) { %>
    open={open}
    title="New Project"
    onRequestClose={onRequestClose}
    contentClassName={classes.container}
    actions={[
      <FlatButton label="Cancel" secondary onTouchTap={onRequestClose} />,
      <FlatButton label="Create" primary onTouchTap={submit} />
    ]}><% } %>
    <% if (materialv1) { %><DialogTitle id="simple-dialog-title">New Project</DialogTitle>
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <DialogContent>
        <Field
          name="name"
          component={TextField}
          label="Project Name"
          validate={[required]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Create
        </Button>
      </DialogActions>
    </form>
  </Dialog><% } %><% if (!materialv1) { %><form onSubmit={handleSubmit} className={classes.inputs}>
      <Field
        name="name"
        component={TextField}
        floatingLabelText="Project Name"
        validate={[required]}
      />
    </form>
  </Dialog><% } %>
)

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired // added by redux-form
}

export default NewProjectDialog<% } %><% if (!includeRedux) { %>export default class NewProjectDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onCreateClick: PropTypes.func.isRequired
  }

  handleInputChange = (e) => {
    e.preventDefault()
    this.setState({
      name: e.target.value,
      error: null
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.name) {
      return this.setState({
        error: 'Name is required'
      })
    }
    if (this.props && this.props.onCreateClick) {
      this.props.onCreateClick(this.state.name)
      this.props.onRequestClose()
    }
  }

  render () {
    const { open, onRequestClose } = this.props
    const { error } = this.state

    return (
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
            onTouchTap={this.handleSubmit}
          />
        ]}
      >
        <div className={classes.inputs}>
          <TextField
            hintText='exampleProject'
            floatingLabelText='Project Name'
            ref='projectNameField'
            onChange={this.handleInputChange}
            errorText={error || null}
          />
        </div>
      </Dialog>
    )
  }
}<% } %>
