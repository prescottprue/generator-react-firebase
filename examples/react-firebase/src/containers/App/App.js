import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ThemeSettings from 'theme'

const theme = createMuiTheme(ThemeSettings)

function App({ routes }) {
  return (
    <Router history={browserHistory}>{routes}</Router>
  )
}

App.propTypes = {
  routes: PropTypes.object.isRequired
}

export default App
