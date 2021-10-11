import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
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
import {
  Root,
  Panel,
  LoginProviderSection,
  OrLabel,
  LoginSection,
} from './SignupPage.styled'

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
    <Root>
      <Panel>
        <SignupForm onSubmit={emailSignup} />
      </Panel>
      <OrLabel>or</OrLabel>
      <LoginProviderSection>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </LoginProviderSection>
      <LoginSection>
        <Typography>Already have an account?</Typography>
        <Link to={LOGIN_PATH}>
          Login
        </Link>
      </LoginSection>
    </Root>
  )
}

export default SignupPage
