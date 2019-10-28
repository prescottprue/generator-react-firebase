import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFirebaseApp } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styles from './SignupForm.styles'

const useStyles = makeStyles(styles)

function SignupForm({ handleSubmit }) {
  const classes = useStyles()
  const firebaseApp = useFirebaseApp()
  const [username, changeUsernameValue] = useState(null)
  const [email, changeEmailValue] = useState(null)
  const [password, changePasswordValue] = useState(null)
  const [submitting, changeSubmittingValue] = useState(false)

  function signup() {
    changeSubmittingValue(true)
    return firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        changeSubmittingValue(false)
      })
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <div>
        <TextField
          floatingLabelText="Username"
          value={username}
          onChange={e => changeUsernameValue(e.target.value)}
        />
      </div>
      <div>
        <TextField
          hintText="someone@email.com"
          floatingLabelText="Email"
          value={email}
          onChange={e => changeEmailValue(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => changePasswordValue(e.target.value)}
        />
      </div>
      <Button color="primary" type="submit" onClick={signup}>
        {submitting ? 'Saving' : 'Signup'}
      </Button>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default SignupForm
