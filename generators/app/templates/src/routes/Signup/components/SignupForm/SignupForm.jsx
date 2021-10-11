import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { validateEmail } from 'utils/form'

const Root = styled('form')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'flex-start',
  flexGrow: 1,
  height: '100%',
  width: '100%',
  margin: '.2rem',
  fontSize: '1.4rem'
}));

const SubmitSection = styled('form')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  flexGrow: 1,
  textAlign: 'center',
  padding: '1.25rem',
  minWidth: '192px',
  marginTop: '1.5rem'
}));

function SignupForm({ onSubmit }) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  })

  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <TextField
        placeholder="username"
        autoComplete="username"
        margin="normal"
        fullWidth
        inputProps={{
          ...register('username')
        }}
      />
      <TextField
        type="email"
        placeholder="email"
        autoComplete="email"
        margin="normal"
        fullWidth
        inputProps={{
          ...register('email', {
            required: true,
            validate: validateEmail
          })
        }}
        error={!!errors.email}
        helperText={errors.email && 'Email must be valid'}
      />
      <TextField
        type="password"
        placeholder="password"
        autoComplete="current-password"
        margin="normal"
        fullWidth
        inputProps={{
          ...register('password', {
            required: true
          })
        }}
        error={!!errors.password}
        helperText={errors.password && 'Password is required'}
      />
      <SubmitSection className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Loading' : 'Signup'}
        </Button>
      </SubmitSection>
    </Root>
  )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignupForm
