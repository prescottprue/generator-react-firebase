import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: '7rem',
  height: '100%'
}));

function LoadingSpinner({ size }) {
  return (
    <Root>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress mode="indeterminate" size={size || 80} />
      </Box>
    </Root>
  )
}

LoadingSpinner.propTypes = {
  size: PropTypes.number
}

export default LoadingSpinner
