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
    return
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
}

/**
 * Get messaging token from Firebase messaging
 */
function getMessagingToken() {
  return firebase
    .messaging()
    .getToken()
    .catch(err => {
      console.error('Unable to retrieve refreshed token ', err) // eslint-disable-line no-console
      return Promise.reject(err)
    })
}

/**
 * Get Cloud Messaging Token and write it to the currently logged
 * in user's profile
 */
function getTokenAndWriteToProfile() {
  return getMessagingToken().then(updateUserProfileWithToken)
}

/**
 * Request permission from the user to display display
 * browser notifications
 */
export function requestPermission() {
  return firebase
    .messaging()
    .requestPermission()
    .then(getTokenAndWriteToProfile)
    .catch(err => {
      console.error('Unable to get permission to notify: ', err) // eslint-disable-line no-console
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
  messaging.onMessage(payload => {
    const DEFAULT_MESSAGE = 'Message!'
    // Dispatch showSuccess action
    messageActions.showSuccess(
      get(payload, 'notification.body', DEFAULT_MESSAGE)
    )(dispatch)
  })

  // Request permission to setup browser notifications
  requestPermission()
}
