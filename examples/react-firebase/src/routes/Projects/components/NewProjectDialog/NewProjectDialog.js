import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import styles from './NewProjectDialog.styles'

const useStyles = makeStyles(styles)



function NewProjectDialog({ open, onRequestClose, onCreateClick }) {
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
}

export default NewProjectDialog
