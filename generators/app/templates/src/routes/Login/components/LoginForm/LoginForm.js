import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'<% if (includeRedux) { %>
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'<% } %>
<% if (!includeRedux) { %>import RaisedButton from '@material-ui/core/RaisedButton'
import TextField from '@material-ui/core/TextField'<% } else { %>import Button from '@material-ui/core/Button'<% } %><% if (includeRedux) { %>
import { required, validateEmail } from 'utils/form'<% } %>
import styles from './LoginForm.styles'

const useStyles = makeStyles(styles)

<% if (includeRedux) { %>function LoginForm({ pristine, submitting, handleSubmit }) {
  const classes = useStyles()

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Field
        name="email"
        component={TextField}
        autoComplete="email"
        label="Email"
        validate={[required, validateEmail]}
      />
      <Field
        name="password"
        component={TextField}
        autoComplete="current-password"
        label="Password"
        type="password"
        validate={required}
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={pristine || submitting}>
          {submitting ? 'Loading' : 'Login'}
        </Button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  submitting: PropTypes.bool.isRequired, // from enhancer (reduxForm)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default LoginForm<% } %><% if (!includeRedux) { %>function LoginForm({ handleSubmit, error }) {
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

export default LoginForm<% } %>
