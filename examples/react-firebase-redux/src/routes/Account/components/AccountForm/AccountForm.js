import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { validateEmail } from 'utils/form'
import ProviderDataForm from '../ProviderDataForm'

export const Root = styled('form')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%'
}));

export const Content = styled('form')(() => ({
  width: '100%',
  marginBottom: '2rem'
}));

function AccountForm({ account, onSubmit }) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false,
    defaultValues: account
  })

  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <TextField
          name="displayName"
          label="Display Name"
          margin="normal"
          inputRef={register}
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          placeholder="email"
          margin="normal"
          fullWidth
          inputRef={register({
            required: true,
            validate: validateEmail
          })}
          error={!!errors.email}
          helperText={errors.email && 'Email must be valid'}
        />
        <TextField
          name="avatarUrl"
          label="Avatar Url"
          margin="normal"
          inputRef={register}
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
