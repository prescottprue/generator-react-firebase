import * as Sentry from '@sentry/browser'
import StackdriverErrorReporter from 'stackdriver-errors-js'
import config from 'config'
import { version } from '../../package.json'

let errorHandler // eslint-disable-line import/no-mutable-exports

/**
 * Initialize Stackdriver Error Reporter only if api key exists
 */
function initStackdriverErrorReporter() {
  try {
    errorHandler = new StackdriverErrorReporter()
    errorHandler.start({
      key: config.firebase.apiKey,
      projectId: config.firebase.projectId,
      service: 'react-firestore-site',
      version
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      'Error setting up stackdriver client side error reporting',
      err
    )
  }
}

/**
 * Initialize Sentry (reports to sentry.io)
 */
function initSentry() {
  if (config.sentry.enabled) {
    Sentry.init({
      dsn: config.sentry.dsn,
      environment: config.environment,
      release: version
    })
  }
}

/**
 * Initialize client side error reporting. Error handling is only
 * initialized if in production environment.
 */
export function init() {
  if (!window.location.hostname.includes('localhost') && !window.Cypress) {
    initStackdriverErrorReporter()
    initSentry()
  } else {
    errorHandler = console.error // eslint-disable-line no-console
  }
}

/**
 * Set user's uid within error reporting context (can be one or
 * many error handling utilities)
 * @param {Object} auth - Authentication data
 * @param {String} auth.uid - User's id
 */
export function setErrorUser(auth) {
  if (auth?.uid) {
    // Set user within Stackdriver
    if (errorHandler?.setUser) {
      errorHandler.setUser(auth.uid)
    }
    // Set user within Sentry
    Sentry.configureScope((scope) => {
      scope.setUser({
        id: auth.uid,
        email: auth.email || 'none'
      })
    })
  }
}

export default errorHandler
