import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'

import { Provider } from 'react-redux'

const App = ({ routes, store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>
)

App.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default App
