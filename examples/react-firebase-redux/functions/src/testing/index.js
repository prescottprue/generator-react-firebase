import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name testing
 * Cloud Function triggered by Real Time Database Create Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/requests/testing/{pushId}')
  .onCreate(testingEvent)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function testingEvent(snap, context) {
  // const { params, auth, timestamp } = context
  // const { before, after } = change
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
