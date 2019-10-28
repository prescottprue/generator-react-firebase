import React<% if (!includeRedux) { %>, { useState }<% } %> from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
<% if (!includeRedux) { %>import TextField from '@material-ui/core/TextField'<% } %><% if (includeRedux) { %>import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import { required } from 'utils/form'<% } %>
import styles from './NewProjectDialog.styles'

const useStyles = makeStyles(styles)

<% if (includeRedux) { %>function NewProjectDialog({ handleSubmit, open, onRequestClose }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">New Project</DialogTitle>
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
    </Dialog>
  )
}

NewProjectDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}<% } %>

<% if (!includeRedux) { %>function NewProjectDialog({ open, onRequestClose, onCreateClick }) {
  const classes = useStyles()
  const [name, changeInputValue] = useState(null)
  const [error, changeErrorValue] = useState(null)

  function handleInputChange(e) {
    changeInputValue(e.target.value)
    changeErrorValue(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    changeInputValue(e.target.value)
    changeErrorValue('Name is required')
    if (onCreateClick) {
      onCreateClick(name)
      onRequestClose()
    }
  }

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">New Project</DialogTitle>
      <DialogContent>
        <TextField
          hintText="exampleProject"
          floatingLabelText="Project Name"
          ref="projectNameField"
          onChange={handleInputChange}
          value={name}
          errorText={error || null}
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
    </Dialog>
  )
}

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  onCreateClick: PropTypes.func
}<% } %>

export default NewProjectDialog
