<% if (hasPropTypes) { %>import React from 'react';
import PropTypes from 'prop-types';<% } else { %>import React, { PropTypes } from 'react';<% } %>
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';<% if (!materialv1) { %>
import Button from 'material-ui/Button';<% } else { %>import Button from '@material-ui/core/Button';<%}%><% if (addStyle && styleType === 'scss') { %>
import classes from './<%= name %>.scss';<%}%>

export const <%= name %> = ({
  handleSubmit,
  submitting,
  pristine,<% if (!materialv1) { %>
  classes,<%}%>
}) => (
  <form <% if (addStyle) { %> className={ classes.root }><% } else { %> className="<%= name %>" <%}%> onSubmit={ handleSubmit }>
    <Field component={TextField} name="someInput" label="Some Input" />
      <Button
        disabled={submitting || pristine}
        color="primary"
        type="submit"
        className={classes.submit}>
        Save
    </Button>
  </form >
);

<%= name %>.propTypes = {
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
};

export default <%= name %>;
