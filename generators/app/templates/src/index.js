import React from 'react'
import ReactDOM from 'react-dom'
import { initScripts } from './utils'<% if (includeRedux) { %>
import createStore from './store/createStore'<% } %>
import { version } from '../package.json'
import { env } from './config'
import App from './containers/App'<% if (!includeRedux) { %>
import createRoutes from './routes'<% } %>
import './index.css'

// import * as serviceWorker from './serviceWorker'

// Window Variables
// ------------------------------------
window.version = version
window.env = env
initScripts()

// Store Initialization
// ------------------------------------
<% if (includeRedux) { %>const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null }
}
const store = createStore(initialState)
const routes = require('./routes/index').default(store)<% } %><% if (!includeRedux) { %>
const routes = createRoutes()<% } %>

<% if (includeRedux) { %>ReactDOM.render(
  <App store={store} routes={routes} />,
  document.getElementById('root')
)<% } %><% if (!includeRedux) { %>ReactDOM.render(<App routes={routes} />, document.getElementById('root'))<% } %>

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
