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
    // Only set user if segmentId exists
    if (window.analytics && config.segmentId) {
      window.analytics.identify(auth.uid, {
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
 * and Segment
 * @param {Object} eventData - Data associated with the event.
 */
export function triggerAnalyticsEvent(eventName, eventData) {
  const eventDataWithVersion = { ...eventData, version }
  if (config.segmentId && !window.Cypress) {
    window.analytics.track(eventName, eventDataWithVersion)
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

/**
 * Initialize Analytics libraries if within production environment
 * except Firebase Analytics which are initialized in containers/App.js
 */
export function init() {
  // Only initialize if segmentId exists
  if (config.segmentId) {
    /* eslint-disable */
    !function(){
      var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load(config.segmentId);
      analytics.page({ version });
    }}();
    /* eslint-enable */
  }
}
