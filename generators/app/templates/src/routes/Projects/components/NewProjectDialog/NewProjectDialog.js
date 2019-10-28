import React<% if (!includeRedux) { %>, { useState }<% } %> from 'react'
import PropTypes from 'prop-types'<% if (!includeRedux) { %>
import { useFirebaseApp } from 'reactfire'<% } %><% if (includeRedux) { %>
import { makeStyles } from '@material-ui/core/styles'<% } %>
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
<% if (!includeRedux) { %>import TextField from '@material-ui/core/TextField'<% } %><% if (includeRedux) { %>import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import { required } from 'utils/form'<% } %><% if (includeRedux) { %>
import styles from './NewProjectDialog.styles'

const useStyles = makeStyles(styles)

function NewProjectDialog({ handleSubmit, open, onRequestClose }) {
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
  const [name, changeInputValue] = useState(null)
  const [error, changeErrorValue] = useState(null)
  const firebaseApp = useFirebaseApp()

  function handleInputChange(e) {
    changeInputValue(e.target.value)
    changeErrorValue(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    changeInputValue(e.target.value)
    if (!name) {
      changeErrorValue('Name is required')
    } else {
      return firebaseApp
        .firestore()
        .collection()
        .add({ name })
        .then(() => {
          onRequestClose()
        })
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
        <Button type="submit" color="primary" onClick={handleSubmit}>
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
