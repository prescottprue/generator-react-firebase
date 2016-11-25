import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
<% if (!answers.includeRedux) { %>import TextField from 'material-ui/TextField'<% } %><% if (answers.includeRedux) { %>import { Field, reduxForm, submit } from 'redux-form'
import TextField from 'components/TextField'<% } %>

import classes from './NewProjectDialog.scss'
<% if (answers.includeRedux) { %>
const formName = 'newProject'
const validate = values => {
  const errors = {}
  if (!values.name) errors.name = 'Required'
  return errors
}
@reduxForm({
  form: formName,
  validate
})<% } %>
export default class NewProjectDialog extends Component {
  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired<% if (answers.includeRedux) { %>,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired<% } %><% if (!answers.includeRedux) { %>,
    onCreateClick: PropTypes.func.isRequired,<% } %>
  }

  state = {
    open: this.props.open || false
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.open) {
      this.setState({
        open: true
      })
      setTimeout(() => {
        if (this.refs && this.refs.projectNameField) {
          this.refs.projectNameField.focus()
        }
      }, 500)
    }
  }
<% if (!answers.includeRedux) { %>
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
      this.close()
    }
  }
<% } %>
  close = () => {
    this.setState({
      open: false
    })
    if (this.props.onRequestClose) {
      this.props.onRequestClose()
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault()
    this.props.dispatch(submit(formName))
  }

  render () {
    const { open, error } = this.state<% if (answers.includeRedux) { %>
    const { handleSubmit } = this.props<% } %>

    const actions = [
      <FlatButton
        label='Cancel'
        secondary
        onClick={this.close}
      />,
      <FlatButton
        label='Create'
        primary
        <% if (!answers.includeRedux) { %>onClick={this.handleSubmit}<% } %><% if (answers.includeRedux) { %>onClick={this.handleSubmitClick}<% } %>
      />
    ]

    return (
      <Dialog
        title='New Project'
        modal={false}
        actions={actions}
        open={open}
        onRequestClose={this.close}
        contentClassName={classes['container']}>
        <div className={classes['inputs']}>
          <% if (answers.includeRedux) { %><form onSubmit={handleSubmit}>
            <Field
              name='name'
              component={TextField}
              error={error || null}
              label='Project Name'
            />
          </form><% } %><% if (!answers.includeRedux) { %><TextField
            hintText='exampleProject'
            floatingLabelText='Project Name'
            ref='projectNameField'
            onChange={this.handleInputChange}
            errorText={error || null}
          /><% } %>
        </div>
      </Dialog>
    )
  }
}
