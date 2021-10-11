import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { validateEmail } from 'utils/form'
import ProviderDataForm from '../ProviderDataForm'

export const Root = styled('form')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%'
}));

export const Content = styled('div')(() => ({
  width: '100%',
  marginBottom: '2rem'
}));

function AccountForm({ account, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false,
    defaultValues: account
  })

  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <TextField
          label="Display Name"
          margin="normal"
          fullWidth
          inputProps={{
            ...register('displayName')
          }}
        />
        <TextField
          type="email"
          placeholder="email"
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
          label="Avatar Url"
          margin="normal"
          inputProps={{
            ...register('avatarUrl')
          }}
          fullWidth
        />
      </Content>
      {!!account && !!account.providerData && (
        <div>
          <Typography variant="h6">Linked Accounts</Typography>
          <ProviderDataForm providerData={account.providerData} />
        </div>
      )}
      <Button
        color="primary"
        type="submit"
        variant="contained"
        disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Saving' : 'Save'}
      </Button>
    </Root>
  )
}

AccountForm.propTypes = {
  account: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default AccountForm
