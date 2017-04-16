import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
<% if (!includeRedux) { %>import TextField from 'material-ui/TextField'<% } %><% if (includeRedux) { %>import { Field, reduxForm, submit } from 'redux-form'
import TextField from 'components/TextField'
import { required } from 'utils/form'
import { NEW_PROJECT_FORM_NAME } from 'constants'<% } %>

import classes from './NewProjectDialog.scss'

<% if (includeRedux) { %>@reduxForm({
  form: NEW_PROJECT_FORM_NAME
})<% } %>
export default class NewProjectDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired<% if (includeRedux) { %>,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired<% } %><% if (!includeRedux) { %>,
    onCreateClick: PropTypes.func.isRequired,<% } %>
  }
<% if (includeRedux) { %>
  handleSubmitClick = (e) => {
    this.props.dispatch(submit(NEW_PROJECT_FORM_NAME))
  }
<% } %><% if (!includeRedux) { %>
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
<% } %>
  render () {
    const { open, onRequestClose<% if (includeRedux) { %>, handleSubmit<% } %> } = this.props<% if (!includeRedux) { %>
    const { error } = this.state<% } %>

    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onTouchTap={onRequestClose}
      />,
      <FlatButton
        label='Create'
        primary
        <% if (!includeRedux) { %>onTouchTap={this.handleSubmit}<% } %><% if (includeRedux) { %>onTouchTap={this.handleSubmitClick}<% } %>
      />
    ]

    return (
      <Dialog
        title='New Project'
        modal={false}
        actions={actions}
        open={open}
        onRequestClose={onRequestClose}
        contentClassName={classes.container}>
        <% if (includeRedux) { %><form onSubmit={handleSubmit} className={classes.inputs}>
          <Field
            name='name'
            component={TextField}
            label='Project Name'
            validate={[required]}
          />
        </form><% } %><% if (!includeRedux) { %><div className={classes.inputs}>
          <TextField
            hintText='exampleProject'
            floatingLabelText='Project Name'
            ref='projectNameField'
            onChange={this.handleInputChange}
            errorText={error || null}
          />
        </div><% } %>
      </Dialog>
    )
  }
}
