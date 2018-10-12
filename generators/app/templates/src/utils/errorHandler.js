import { firebase, <% if (includeSentry) { %>sentryDsn, <% } %>env as environment } from '../config'
import { version } from '../../package.json'

let errorHandler

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
        service: '<%= appName %>-site',
        version
      })
    })
  }
  return errorHandler
}
<% if (includeSentry) { %>
/**
 * Initialize Raven (reports to sentry.io)
 */
function initRaven() {
  if (sentryDsn && Raven) {
    window.Raven.config(sentryDsn, {
      environment,
      release: version
    }).install()
  }
}<% } %>

/**
 * Initialize client side error reporting. Error handling is only
 * initialized if in production environment.
 */
export function init() {
  if (environment === 'production') {
    initStackdriverErrorReporter()<% if (includeSentry) { %>
    initRaven()<% } %>
  } else {
    errorHandler = console.error // eslint-disable-line no-console
  }
  return errorHandler
}

/**
 * Set user's uid within error reporting context (can be one or
 * many error handling utilities)
 * @param {Object} auth - Authentication data
 * @param {String} auth.uid - User's id
 */
export function setErrorUser(auth) {
  if (auth && auth.uid && environment === 'production') {
    // Set user within Stackdriver
    if (errorHandler && errorHandler.setUser) {
      errorHandler.setUser(auth.uid)
    }
    // Set user within Raven (so it will show in Sentry)
    if (window.Raven && window.Raven.setUserContext) {
      window.Raven.setUserContext({
        id: auth.uid,
        email: auth.email || 'none'
      })
    }
  }
}

export default errorHandler
