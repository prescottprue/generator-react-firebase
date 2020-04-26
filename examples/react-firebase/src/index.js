import React from 'react'
import ReactDOM from 'react-dom'
import { initScripts } from './utils'
import { version } from '../package.json'
import App from './containers/App'
import createRoutes from './routes'
import './index.css'

// import * as serviceWorker from './serviceWorker'

// Window Variables
// ------------------------------------
window.version = version
initScripts()

// Store Initialization
// ------------------------------------

const routes = createRoutes()

ReactDOM.render(<App routes={routes} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
