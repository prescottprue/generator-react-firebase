import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import { version } from '../../package.json'
import * as config from '../config' // eslint-disable-line import/no-unresolved

/**
 * From https://firebase.google.com/docs/reference/js/firebase.analytics.html?authuser=0#event-name-string
 */
const GOOGLE_EVENT_TYPES_BY_EVENT_NAME = {
  login: 'login',
  signup: 'sign_up',
  page: 'screen_view',
  search: 'search',
  exception: 'exception'
}

/**
 * Set User info to analytics context
 * @param {Object} auth - User auth object
 * @param {String} auth.uid - Current user's UID
 */
export function setAnalyticsUser(auth) {
  // Only set user if UID exists
  if (auth && auth.uid) {
    // Only set user if measurementId exists
    if (config.firebase.measurementId) {
      firebase.analytics().setUserId(auth.uid)
      firebase.analytics().setUserProperties({
        name: auth.displayName,
        email: auth.email,
        avatar: auth.photoURL,
        version
      })
    }
  }
}

/**
 * Trigger analytics event within Firebase Analytics
 * @param {Object} eventData - Data associated with the event.
 */
export function triggerAnalyticsEvent(eventName, eventData) {
  const eventDataWithVersion = { ...eventData, version }
  if (!window.Cypress) {
    const standardizedEventName =
      GOOGLE_EVENT_TYPES_BY_EVENT_NAME[eventName] || eventName
    firebase.analytics().logEvent(standardizedEventName, eventDataWithVersion)
  } else {
    /* eslint-disable no-console */
    console.debug('Analytics Event:', {
      name: eventName,
      data: eventDataWithVersion
    })
    /* eslint-enable no-console */
  }
}
