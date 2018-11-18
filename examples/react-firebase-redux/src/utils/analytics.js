import ReactGA from 'react-ga'
import { analyticsTrackingId, env as environment } from 'config'
import { version } from '../../package.json'

/**
 * Initialize Google Analytics if analytics id exists and environment is
 * production
 */
function initGA() {
  if (analyticsTrackingId) {
    ReactGA.initialize(analyticsTrackingId)
    ReactGA.set({
      appName: environment || 'Production',
      appVersion: version
    })
  }
}

/**
 * Trigger analytics event within google analytics through react-ga
 * @param  {Object} eventData - Data associated with the event.
 */
export function triggerAnalyticsEvent(eventData) {
  if (analyticsTrackingId) {
    ReactGA.event(eventData)
  } else {
    console.debug('Analytics Event:', eventData) // eslint-disable-line no-console
  }
}

/**
 * Set user auth data within Google Analytics
 * @param {Object} auth - Authentication data
 * @param {String} auth.uid - User's id
 */
function setGAUser(auth) {
  if (auth && auth.uid) {
    ReactGA.set({ userId: auth.uid })
  }
}

/**
 * Set user auth data within Analytics context (can be
 * multiple analytics providers)
 * @param {Object} auth - Authentication data
 * @param {String} auth.uid - User's id
 */
export function setAnalyticsUser(auth) {
  if (environment === 'production') {
    setGAUser()
  }
}

/**
 * Track route update within Google Analytics
 */
export function trackRouteUpdate() {
  if (analyticsTrackingId) {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}

/**
 * Initialize All Analytics libraries if within production environment
 */
export function init() {
  if (environment === 'production') {
    initGA()
  }
}

export default { initGA, triggerAnalyticsEvent, trackRouteUpdate }
