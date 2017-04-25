import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
<% if (!includeRedux) { %>import TextField from 'material-ui/TextField'<% } %><% if (includeRedux) { %>import { Field, reduxForm } from 'redux-form'
import TextField from 'components/TextField'
import { required } from 'utils/form'
import { NEW_PROJECT_FORM_NAME } from 'constants'<% } %>

import classes from './NewProjectDialog.scss'

<% if (includeRedux) { %>export const NewProjectDialog = ({ open, onRequestClose, submit, handleSubmit }) => (
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
        onTouchTap={submit}
      />
    ]}
  >
    <form onSubmit={handleSubmit} className={classes.inputs}>
      <Field
        name='name'
        component={TextField}
        label='Project Name'
        validate={[required]}
      />
    </form>
  </Dialog>
)

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submit: PropTypes.func.isRequired // added by redux-form
}

export default reduxForm({
  form: NEW_PROJECT_FORM_NAME
})(NewProjectDialog)<% } %><% if (!includeRedux) { %>export default class NewProjectDialog extends Component {
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
