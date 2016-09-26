import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import './ProjectSettingsDialog.scss'
import RaisedButton from 'material-ui/RaisedButton'

export default class ProjectSettingsDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    project: PropTypes.object,
    vimEnabled: PropTypes.bool,
    onVimToggle: PropTypes.func,
    onRequestClose: PropTypes.func.isRequired
  }

  state = { vimEnabled: this.props.vimEnabled || false }

  handleAutoCompleteSubmit = () => {
    // TODO: Add collaborator
  }

  handleAutoCompleteChange = () => {
    // TODO: handle change
  }

  handleVimToggle = () => {
    if (this.props.onVimToggle) this.props.onVimToggle(this.state.vimEnabled)
    this.setState({
      vimEnabled: !this.state.vimEnabled
    })
  }

  showDelete = () => {
    this.setState({ showDelete: true })
  }

  render () {
    const { project, onRequestClose } = this.props
    const actions = [
      <FlatButton
        label='Close'
        secondary
        onClick={onRequestClose}
        onTouchTap={onRequestClose}
      />
    ]
    const owner = (project && project.owner && project.owner.username) ? project.owner.username : project.owner
    return (
      <Dialog
        {...this.props}
        title='Settings'
        actions={actions}
        modal={false}
        bodyClassName='ProjectSettingsDialog-Settings'
        titleClassName='ProjectSettingsDialog-Settings-Title'
        contentClassName='ProjectSettingsDialog'>
        <TextField
          hintText='Project name'
          floatingLabelText='Project name'
          defaultValue={project.name}
        />
        <TextField
          hintText='Owner'
          floatingLabelText='Owner'
          defaultValue={owner}
          disabled
        />
        <TextField
          hintText='Site url'
          floatingLabelText='Site url'
          disabled
        />
        <div>
          {
            this.state.showDelete
            ? (
              <TextField
                hintText='myProject'
                floatingLabelText='project name'
                style={{ color: 'grey' }}
              />
            )
            : null
          }
          <RaisedButton
            label='Delete'
            primary
            onTouchTap={this.showDelete}
          />
        </div>
      </Dialog>
    )
  }
}
