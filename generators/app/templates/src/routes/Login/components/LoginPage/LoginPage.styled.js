import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const Root = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'flex-start',
  height: '100%',
  width: '100%',
  fontWeight: 400,
  paddingTop: '1.5rem'
}))

export const Panel = styled(Paper)(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  padding: '1.25rem',
  minWidth: '250px',
  minHeight: '220px'
}))

export const LoginProviderSection = styled('div')(() => ({
  marginTop: '1rem'
}))

export const OrLabel = styled('span')(() => ({
  marginTop: '1rem',
  marginBottom: '.5rem'
}))

export const SignUpSection = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  marginTop: '2rem'
}))
