import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import LightThemeIcon from '@mui/icons-material/BrightnessHigh'
import DarkThemeIcon from '@mui/icons-material/Brightness4'
import makeStyles from '@mui/styles/makeStyles';
import { ThemeContext } from 'modules/theme'

function NavbarWithoutAuth({ children, brandPath = '/' }) {
  const { toggleDarkMode, isDarkMode } = useContext(ThemeContext)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          color="inherit"
          variant="h6"
          component={Link}
          to={brandPath}
          data-test="brand">
          React-firestore
        </Typography>
        <div style={{ display: 'flex', flexGrow: 1 }} />
        <Tooltip title="Toggle light/dark theme">
          <IconButton onClick={toggleDarkMode} size="large" style={{ color: 'white' }}>
            {isDarkMode ? <LightThemeIcon /> : <DarkThemeIcon />}
          </IconButton>
        </Tooltip>
        {children}
      </Toolbar>
    </AppBar>
  );
}

NavbarWithoutAuth.propTypes = {
  children: PropTypes.element,
  brandPath: PropTypes.string
}

export default NavbarWithoutAuth
