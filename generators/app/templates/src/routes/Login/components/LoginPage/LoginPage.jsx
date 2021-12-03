import React from 'react'
import { Link } from 'react-router-dom'<% if (includeRedux) { %>
import { useFirebase } from 'react-redux-firebase'<% } %><% if (!includeRedux) { %>
import { useAuth } from 'reactfire'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'<% } %>
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH<% if (!includeRedux) { %>, LIST_PATH<% } %> } from 'constants/paths'<% if (includeRedux) { %>
import { useNotifications } from 'modules/notification'<% } %><% if (!includeRedux) { %>
import useNotifications from 'modules/notification/useNotifications'<% } %>
import LoginForm from '../LoginForm'
import {
  Root,
  Panel,
  LoginProviderSection,
  OrLabel,
  SignUpSection
} from './LoginPage.styled'

function LoginPage() {<% if (includeRedux) { %>
  const firebase = useFirebase()
  const { showError } = useNotifications()

  function onSubmitFail(formErrs, dispatch, err) {
    return showError(formErrs ? 'Form Invalid' : err.message || 'Error')
  }

  function googleLogin() {
    return firebase
      .login({ provider: 'google', type: 'popup' })
      .catch((err) => showError(err.message))
  }

  function emailLogin(creds) {
    return firebase.login(creds).catch((err) => showError(err.message))
  }<% } %><% if (!includeRedux) { %>
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
  }<% } %>

  return (
    <Root>
      <Panel>
        <LoginForm onSubmit={emailLogin} <% if (includeRedux) { %>onSubmitFail={onSubmitFail} <% } %>/>
      </Panel>
      <OrLabel>or</OrLabel>
      <LoginProviderSection>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" />
      </LoginProviderSection>
      <SignUpSection>
        <Typography>Need an account?</Typography>
        <Button component={Link} to={SIGNUP_PATH}>
          Sign Up
        </Button>
      </SignUpSection>
    </Root>
  )
}

export default LoginPage
