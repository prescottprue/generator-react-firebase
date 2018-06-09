import StackdriverErrorReporter from 'stackdriver-errors-js'
import { firebase, googleApis } from '../config'
import { version, env } from '../../package.json'

let errorHandler

/**
 * Initialize client side error reporting to Stackdriver. Error handling
 * is only initialized if in production environment and api key exists.
 */
export function init() {
  if (googleApis && googleApis.apiKey && env === 'production') {
    window.addEventListener('DOMContentLoaded', () => {
      errorHandler = new StackdriverErrorReporter()
      errorHandler.start({
        key: googleApis.apiKey,
        projectId: firebase.projectId,
        service: 'react-firebase-redux-site',
        version
      })
    })
  } else {
    errorHandler = console.error // eslint-disable-line no-console
  }
  return errorHandler
}

/**
 * Set user's uid within Stackdriver error reporting context
 * @param {Object} auth - Authentication data
 * @param {String} auth.uid - User's id
 */
export function setErrorUser(auth) {
  if (errorHandler && errorHandler.setUser && auth && auth.uid) {
    errorHandler.setUser(auth.uid)
  }
}

export default errorHandler
