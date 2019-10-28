import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'
import styles from './LoginForm.styles'

const useStyles = makeStyles(styles)

function LoginForm({ handleSubmit, error }) {
  const classes = useStyles()
  const [username, changeUsernameValue] = useState(null)
  const [email, changeEmailValue] = useState(null)
  const [password, changePasswordValue] = useState(null)
  const [submitting, changeSubmittingValue] = useState(false)

  function signup() {
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
