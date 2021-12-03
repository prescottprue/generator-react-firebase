import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import ThemeSettings from '../../theme'
import ThemeContext from './ThemeContext'

export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, changeIsDarkMode] = useState(false)

  useEffect(() => {
    changeIsDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  const theme = React.useMemo(
    () =>
      createTheme({
        ...ThemeSettings,
        palette: {
          ...ThemeSettings.palette,
          mode: isDarkMode ? 'dark' : 'light'
        }
      }),
    [isDarkMode]
  )

  const contextValue = {
    isDarkMode,
    toggleDarkMode: useCallback(() => changeIsDarkMode(!isDarkMode), [
      changeIsDarkMode,
      isDarkMode
    ])
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
        <CssBaseline />
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.element
}
