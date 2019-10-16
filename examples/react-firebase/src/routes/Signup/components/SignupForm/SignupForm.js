import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styles from './SignupForm.styles'

const useStyles = makeStyles(styles)

function SignupForm({ handleSubmit }) {
  const classes = useStyles()

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <TextField label='Username' />
      </div>
      <div>
        <TextField
          hintText='someone@email.com'
          label='Email'
        />
      </div>
      <div>
        <TextField
          label='Password'
          type="password"
        />
      </div>
      <div className={classes.submit}>
        <RaisedButton
          label='Signup'
          primary
          type='submit'
          style={buttonStyle}
        />
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default SignupForm
