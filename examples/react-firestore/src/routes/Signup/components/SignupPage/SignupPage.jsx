import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@mui/material/Paper'
import { useAuth } from 'reactfire'
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { makeStyles } from '@mui/material/styles'
import { LOGIN_PATH, LIST_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'

function SignupPage() {
  const { showError } = useNotifications()
  const auth = useAuth()

  async function googleLogin() {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      // NOTE: window.location used since history.push/replace does not always work
      window.location = LIST_PATH
    } catch (err) {
      showError(err.message)
    }
  }

  async function emailSignup(formValues) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
      // NOTE: window.location used since history.push/replace does not always work
      window.location = LIST_PATH
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <div>
      <Paper>
        <SignupForm onSubmit={emailSignup} />
      </Paper>
      <div>or</div>
      <div>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </div>
      <div>
        <span>Already have an account?</span>
        <Link to={LOGIN_PATH}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default SignupPage
