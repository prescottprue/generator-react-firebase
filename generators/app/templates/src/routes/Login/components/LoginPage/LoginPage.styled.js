import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'flex-start',
  height: '100%',
  width: '100%',
  fontWeight: 400,
  paddingTop: '1.5rem'
}));

export const Panel = styled(Paper)(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  flexGrow: 1,
  padding: '1.25rem',
  minWidth: '250px',
  minHeight: '270px'
}));

export const LoginProviderSection = styled('div')(() => ({
  marginTop: '1rem'
}));

export const OrLabel = styled('span')(() => ({
  marginTop: '1rem',
  marginBottom: '.5rem'
}));

export const SignUpSection = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  justifyContent: 'center',
  marginTop: '2rem'
}));

export const SignUpLabel = styled('span')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bold'
}));