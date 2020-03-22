import * as Sentry from '@sentry/browser'
import { firebase, sentryDsn, env as environment } from '../config'
import { version } from '../../package.json'

let errorHandler // eslint-disable-line import/no-mutable-exports

/**
 * Initialize Stackdriver Error Reporter only if api key exists
 */
function initStackdriverErrorReporter() {
  if (typeof window.StackdriverErrorReporter === 'function') {
    window.addEventListener('DOMContentLoaded', () => {
      const errorHandler = new window.StackdriverErrorReporter()
      errorHandler.start({
        key: firebase.apiKey,
        projectId: firebase.projectId,
        service: 'redux-firestore-site',
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
  if (environment !== 'dev') {
    Sentry.init({
      dsn: sentryDsn,
      environment,
      release: version
    })
  }
}

/**
 * Initialize client side error reporting. Error handling is only
 * initialized if in production environment.
 */
export function init() {
  if (environment !== 'dev') {
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
  if (auth && auth.uid && environment !== 'dev') {
    // Set user within Stackdriver
    if (errorHandler && errorHandler.setUser) {
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
