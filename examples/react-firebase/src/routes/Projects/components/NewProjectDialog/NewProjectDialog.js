import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFirebaseApp } from 'reactfire'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'

function NewProjectDialog({ open, onRequestClose, onCreateClick }) {
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
}

export default NewProjectDialog
