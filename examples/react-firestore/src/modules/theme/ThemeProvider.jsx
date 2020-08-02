import React, { useState, useCallback } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeSettings from '../../theme'

export const ThemeContext = React.createContext({
  toggleDarkMode: () => {},
})

export default function ThemeProvider({ children }) {
  const [isDarkMode, changeIsDarkMode] = useState(false)

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...ThemeSettings,
        palette: {
          ...ThemeSettings.palette,
          type: isDarkMode ? 'dark' : 'light'
        },
      }),
    [isDarkMode],
  );

  const contextValue = {
    isDarkMode,
    toggleDarkMode: useCallback(
      () => changeIsDarkMode(!isDarkMode),
      [changeIsDarkMode, isDarkMode]
    ),
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
