import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFirebaseApp } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styles from './LoginForm.styles'

const useStyles = makeStyles(styles)

function LoginForm({ handleSubmit, error }) {
  const classes = useStyles()
  const firebaseApp = useFirebaseApp()
  const [email, changeEmailValue] = useState(null)
  const [password, changePasswordValue] = useState(null)
  const [submitting, changeSubmittingValue] = useState(false)

  function login() {
    changeSubmittingValue(true)
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        changeSubmittingValue(false)
      })
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
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
      <Button color="primary" type="submit" onClick={login}>
        {submitting ? 'Saving' : 'Login'}
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func
}

export default LoginForm
