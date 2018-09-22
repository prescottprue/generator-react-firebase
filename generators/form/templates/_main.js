<% if (hasPropTypes) { %>import React from 'react'
import PropTypes from 'prop-types'<% } else { %>import React, { PropTypes } from 'react'<% } %>
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
<% if (!materialv1) { %>import RaisedButton from 'material-ui/RaisedButton'<% } else { %>import Button from '@material-ui/core/Button'<%}%><% if (addStyle && styleType === 'scss') { %>
import classes from './<%= name %>.scss'<%}%>

export const <%= name %> = ({
  handleSubmit,
  submitting,
  pristine<% if (addStyle && styleType !== 'scss') { %>,
  classes<%}%>
}) => (
  <form <% if (addStyle) { %>className={classes.root}<% } else { %>className="<%= name %>"<%}%> onSubmit={handleSubmit}>
    <Field component={TextField} name="someInput" <% if (!materialv1) { %>floatingLabelText="Some Input"<% } %><% if (materialv1) { %>label="Some Input"<% } %> />
    <% if (!materialv1) { %><RaisedButton
      type="submit"
      primary
      label="Save"
      disabled={pristine || submitting}
    /><% } %><% if (materialv1) { %><Button
      type="submit"
      color="primary"
      variant="contained"
      className={classes.submit}
      disabled={pristine || submitting}>
      Save
    </Button><% } %>
  </form>
)

<%= name %>.propTypes = {
  <% if (addStyle && styleType !== 'scss') { %>classes: PropTypes.object, // from enhancer (withStyles)
  <% } %>submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm)
}

export default <%= name %>
