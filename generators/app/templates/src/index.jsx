import React from 'react'
import ReactDOM from 'react-dom'
import config from 'config'<% if (includeRedux) { %>
import createStore from './store/createStore'<% } %>
import { version } from '../package.json'
import App from './App'<% if (includeErrorHandling) { %>
import { init as initErrorHandling } from './utils/errorHandler'<% } %>
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import * as serviceWorker from './serviceWorker'

// Window Variables
// ------------------------------------
window.version = version
window.config = config<% if (includeErrorHandling) { %>

// Initialize Error Handling
// ------------------------------------
initErrorHandling()<% } %><% if (includeRedux) { %>

// Initialize Redux Store
// ------------------------------------
const initialState = window.___INITIAL_STATE__ || {
  firebase: { authError: null }
}
const store = createStore(initialState)
const routes = require('./routes/index').default(store)<% } %>

<% if (includeRedux) { %>ReactDOM.render(
  <App store={store} routes={routes} />,
  document.getElementById('root')
)<% } %><% if (!includeRedux) { %>ReactDOM.render(<App />, document.getElementById('root'))<% } %>

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
