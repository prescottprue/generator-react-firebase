import { get } from 'lodash'
import firebase from 'firebase/app'
import messageActions from 'modules/notification'
import { publicVapidKey } from '../config'
import 'firebase/messaging'

/**
 * Write FCM messagingToken to user profile
 * @param {String} messagingToken - Token to be written to user profile
 */
function updateUserProfileWithToken(messagingToken) {
  const currentUserUid =
    firebase.auth().currentUser && firebase.auth().currentUser.uid
  if (!currentUserUid) {
    return Promise.resolve()
  }
  return firebase
    .firestore()
    .collection('users')
    .doc(currentUserUid)
    .update({
      messaging: {
        mostRecentToken: messagingToken,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }
    })
    .catch((err) => {
      /* eslint-disable no-console */
      console.error(
        'Error updating user profile with messaging token:',
        err.message
      )
      /* eslint-enable no-console */
      return Promise.reject(err)
    })
}

/**
 * Get Cloud Messaging Token from Firebase messaging
 * and write it to the currently logged in user's profile
 */
function getTokenAndWriteToProfile() {
  return firebase
    .messaging()
    .getToken()
    .then(updateUserProfileWithToken)
    .catch((err) => {
      console.error('Unable to get token and write to profile', err) // eslint-disable-line no-console
      return Promise.reject(err)
    })
}

/**
 * Setup Firebase Cloud Messaging. This  requests permission from the
 * user to show browser notifications. If the user approves or if they have
 * approved in the passed, then a Cloud Messaging Token is written to the
 * user's profile.
 * @param {Function} dispatch - redux action dispatching function
 */
export function initializeMessaging(dispatch) {
  const messaging = firebase.messaging()
  if (!publicVapidKey) {
    /* eslint-disable no-console */
    console.warn(
      'Skipping messaging initialization, publicVapidKey not set in src/config.js'
    )
    /* eslint-enable no-console */
    return
  }

  messaging.usePublicVapidKey(publicVapidKey)

  // Handle Instance ID token updates
  messaging.onTokenRefresh(() => {
    getTokenAndWriteToProfile()
  })

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage((payload) => {
    const DEFAULT_MESSAGE = 'Message!'
    // Dispatch showSuccess action
    messageActions.showSuccess(
      get(payload, 'notification.body', DEFAULT_MESSAGE)
    )(dispatch)
  })

  // Request permission to setup browser notifications
  firebase
    .messaging()
    .requestPermission()
    .then(getTokenAndWriteToProfile)
    .catch((err) => {
      console.error('Unable to get permission to notify: ', err) // eslint-disable-line no-console
      return Promise.reject(err)
    })
}
