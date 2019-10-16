import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import styles from './NewProjectDialog.styles'

const useStyles = makeStyles(styles)

export default function NewProjectDialog({ onRequestClose, onCreateClick }) {
  const [name, changeInputValue] = useState(null)
  const [errorState, changeErrorValue] = useState(null)
  function handleInputChange(e) {
    changeInputValue(e.target.value)
    changeErrorValue(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    changeInputValue(e.target.value)
    changeErrorValue('Name is required')
    if (onCreateClick) {
      onCreateClick(this.state.name)
      onRequestClose()
    }
  }

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
          onTouchTap={handleSubmit}
        />
      ]}
    >
      <div className={classes.inputs}>
        <TextField
          hintText='exampleProject'
          floatingLabelText='Project Name'
          ref='projectNameField'
          onChange={handleInputChange}
          value={name}
          errorText={error || null}
        />
      </div>
    </Dialog>
  )
}
