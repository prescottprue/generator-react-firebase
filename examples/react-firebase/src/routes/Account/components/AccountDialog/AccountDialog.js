import React, {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Dropzone from 'react-dropzone'
import AvatarEditor from 'react-avatar-editor'
import './AccountDialog.scss'

export default class AccountDialog extends Component {

  state = { imageFile: null }

  static propTypes = {
    modalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    onSave: PropTypes.func
  }

  onFileDrop = (files) => {
    this.setState({ imageFile: files[0] })
  }

  save = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state.imageFile)
    }
    this.props.toggleModal()
  }

  render () {
    const { toggleModal, modalOpen } = this.props
    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={toggleModal}
      />,
      <FlatButton
        label='Save'
        primary
        keyboardFocused
        onTouchTap={this.save}
      />
    ]
    return (
      <Dialog
        title='User Avatar'
        actions={actions}
        modal={false}
        open={modalOpen}
        onRequestClose={toggleModal}
        bodyClassName='AccountDialog-Settings'
        titleClassName='AccountDialog-Settings-Title'
        contentStyle={{'width': '30%'}}
        >
        <div className='AccountDialog-Content'>
          {this.state.imageFile
            ? (
            <AvatarEditor
              image={this.state.imageFile.preview}
              width={350}
              height={350}
              border={10}
              scale={1} />
            )
            : (
            <Dropzone onDrop={this.onFileDrop} multiple={false}>
              <div className='Account-Avatar-New-DropText'>
                Drag or Click <br /> to Upload <br /> Image
              </div>
            </Dropzone>
            )
          }
        </div>
      </Dialog>
    )
  }
}
