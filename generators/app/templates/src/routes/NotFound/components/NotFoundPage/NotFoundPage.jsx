import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';

export const Root = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter
}));

function NotFoundPage() {
  return (
    <Root>
      <Typography variant="h2">Whoops! 404!</Typography>
      <Typography>This page was not found.</Typography>
    </Root>
  )
}

export default NotFoundPage
