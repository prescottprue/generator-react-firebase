import * as Sentry from '@sentry/browser'
import { version } from '../../package.json'

let errorHandler // eslint-disable-line import/no-mutable-exports

/**
 * Initialize Stackdriver Error Reporter only if api key exists
 */
function initStackdriverErrorReporter() {
  if (typeof window.StackdriverErrorReporter === 'function') {
    window.addEventListener('DOMContentLoaded', () => {
      errorHandler = new window.StackdriverErrorReporter()
      errorHandler.start({
        key: process.env.REACT_APP_FIREBASE_API_KEY,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        service: 'react-firestore-site',
        version
      })
    })
  }
  return errorHandler
}

/**
 * Initialize Sentry (reports to sentry.io)
 */
function initSentry() {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.REACT_APP_ENVIRONMENT || 'production',
      release: version
    })
  }
}

/**
 * Initialize client side error reporting. Error handling is only
 * initialized if in production environment.
 */
export function init() {
  if (!window.location.hostname.includes('localhost')) {
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
