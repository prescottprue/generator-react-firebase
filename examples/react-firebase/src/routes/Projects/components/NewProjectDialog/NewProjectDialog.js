import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import classes from './NewProjectDialog.scss'

export default class NewProjectDialog extends Component {
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
}
