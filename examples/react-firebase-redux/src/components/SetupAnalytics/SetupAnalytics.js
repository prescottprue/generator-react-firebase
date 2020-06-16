import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { version } from '../../../package.json'

function SetupAnalytics() {
  const location = useLocation()
  const analytics = firebase.analytics()
  const user = firebase.auth().currentUser

  // By passing `user.uid` to the second argument of `useEffect`,
  // we only set user id when it exists
  useEffect(() => {
    // NOTE: optional chaining causes "Cannot read property 'references' of undefined" error in eslint
    if (user?.uid) {
      analytics.setUserId(user.uid)
      analytics.setUserProperties({
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        version
      })
    }
  }, [user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  // By passing `location.pathname` to the second argument of `useEffect`,
  // we only log on first render and when the `pathname` changes
  useEffect(() => {
    // Trigger event in Firebase analytics
    if (!window.Cypress && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
      analytics.logEvent('page-view', { path_name: location.pathname })
    }
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default SetupAnalytics
