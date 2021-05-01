<% if (hasPropTypes) { %>import React from 'react';
import PropTypes from 'prop-types';<% } else { %>import React, { PropTypes } from 'react';<% } %>
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';<% if (addStyle && styleType === 'scss') { %>
import classes from './<%= name %>.scss';<% } %><% if (addStyle && styleType === 'localized') { %>
import styles from './<%= name %>.styles';

const useStyles = makeStyles(styles);<% } %>

function <%= name %>({ onSubmit, <% if (addStyle && styleType !== 'scss') { %> classes<% } %> }) {
  <% if (addStyle && styleType === 'localized') { %>const classes = useStyles();
  <% } %>const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  });

  return (
    <form <% if (addStyle) { %>className={classes.root}<% } else { %>className="<%= name %>"<% } %> onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.name}
        helperText={errors.name && 'Name is required'}
        name="name"
        label="Name"
        inputRef={register({
          required: true
        })}
        margin="normal"
        fullWidth
      />
      <Button
        type="submit"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}

<%= name %>.propTypes = {
  <% if (addStyle && styleType !== 'scss') { %> classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  <% } %>onSubmit: PropTypes.func.isRequired,
};

export default <%= name %>;
