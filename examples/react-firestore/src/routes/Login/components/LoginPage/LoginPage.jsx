import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'reactfire'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH, LIST_PATH } from 'constants/paths'
import useNotifications from 'modules/notification/useNotifications'
import LoginForm from '../LoginForm'
import {
  Root,
  Panel,
  LoginProviderSection,
  OrLabel,
  SignUpSection,
  SignUpLabel
} from './LoginPage.styled'

function LoginPage() {
  const auth = useAuth()
  const { showError } = useNotifications()

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

  async function emailLogin(formValues) {
    try {
      await signInWithEmailAndPassword(
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
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexGrow: 1,
          padding: '1.25rem',
          width: '400px',
          minHeight: '300px'
        }}
      >
        <Paper>
          <LoginForm onSubmit={emailLogin} />
        </Paper>
      </Box>
      <OrLabel>or</OrLabel>
      <LoginProviderSection>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </LoginProviderSection>
      <SignUpSection>
        <SignUpLabel>Need an account?</SignUpLabel>
        <Link sx={{ fontSize: '1.2rem' }} to={SIGNUP_PATH}>
          Sign Up
        </Link>
      </SignUpSection>
    </Root>
  )
}

export default LoginPage
