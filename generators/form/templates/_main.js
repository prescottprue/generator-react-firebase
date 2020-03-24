import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'<% if (addStyle && styleType === 'localized') { %>
import styles from './<%= name %>.styles'

const useStyles = makeStyles(styles)<% } %>

function <%= name %>({ onSubmit }) {
  <% if (addStyle && styleType === 'localized') { %>const classes = useStyles()
  <% } %>const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  })

  return (
    <form<% if (addStyle) { %> className={classes.root}<% } %> onSubmit={handleSubmit(onSubmit)}>
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
      <% if (!materialv1) { %><RaisedButton
        type="submit"
        primary
        label="Save"
        disabled={isSubmitting || !isValid}
      /><% } %><% if (materialv1) { %><Button
        type="submit"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button><% } %>
    </form>
  )
}

<%= name %>.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default <%= name %>
