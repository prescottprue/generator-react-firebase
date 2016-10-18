import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './ProjectSettingsDialog.scss'

export default class ProjectSettingsDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    project: PropTypes.object,
    vimEnabled: PropTypes.bool,
    onVimToggle: PropTypes.func,
    onRequestClose: PropTypes.func.isRequired
  }

  state = { showDelete: false }

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

    const owner = (project && project.owner && project.owner.displayName)
      ? project.owner.displayName
      : project.owner

    return (
      <Dialog
        {...this.props}
        title='Settings'
        actions={actions}
        modal={false}
        bodyClassName={classes['settings']}
        titleClassName={classes['title']}
        contentClassName={classes['container']}>
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
