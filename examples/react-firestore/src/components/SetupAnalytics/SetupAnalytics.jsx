import { useEffect } from 'react'
import { useAnalytics, useUser } from 'reactfire'
import { setErrorUser } from 'utils/errorHandler'
import { version } from '../../../package.json'

function SetupAnalytics() {
  const analytics = useAnalytics()
  const user = useUser()

  // Disable analytics data collection when Cypress is being run
  if (window.Cypress) {
    analytics.setAnalyticsCollectionEnabled(false)
  }

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
      setErrorUser(user)
    }
  }, [user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  // By passing `location.pathname` to the second argument of `useEffect`,
  // we only log on first render and when the `pathname` changes
  useEffect(() => {
    // Trigger event in Firebase analytics
    if (!window.Cypress && process.env.REACT_APP_FIREBASE_MEASUREMENT_ID) {
      // NOTE: window.location is used in place of useLocation since this it outside of router context
      analytics.logEvent('page-view', { path_name: window.location.pathname })
    }
  }, [window.location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export default SetupAnalytics
