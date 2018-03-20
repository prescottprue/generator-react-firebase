import ReactGA from 'react-ga'
import { version } from '../../package.json'
import { analyticsTrackingId, env } from 'config' // eslint-disable-line import/no-unresolved

/**
 * Initialize Google Analytics if analytics id exists and environment is
 * production
 */
export const initGA = () => {
  if (analyticsTrackingId && env === 'production') {
    ReactGA.initialize(analyticsTrackingId)
    ReactGA.set({
      appName: env || 'Production',
      appVersion: version
    })
  }
}

/**
 * Trigger analytics event within google analytics through react-ga
 * @param  {Object} eventData - Data associated with the event.
 */
export function triggerAnalyticsEvent(eventData) {
  if (analyticsTrackingId && env === 'production') {
    ReactGA.event(eventData)
  } else {
    console.debug('Analytics Event:', eventData) // eslint-disable-line no-console
  }
}

export function setGAUser(auth) {
  if (auth && auth.uid) {
    ReactGA.set({ userId: auth.uid })
  }
}

export function trackRouteUpdate() {
  if (analyticsTrackingId) {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}

export default { initGA, trackRouteUpdate }
