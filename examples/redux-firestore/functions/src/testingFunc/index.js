import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

const eventName = 'testingFunc'

/**
 * 
 * @param  {functions.database.DataSnapshot} snap - Data snapshot of the event
 * @param {Function} snap.val - Value after event
 * @param {functions.EventContext} context - Function event context
 * @param {Object} context.auth - Authentication information for the user that triggered the function
 * @return {Promise}
 */
async function testingFuncEvent(snap, context) {
  const { params: { pushId } } = context

  console.log('testingFunc onCreate event:', snap.val())

  // Create RTDB for response
  const ref = admin.database().ref(`responses/${eventName}/${pushId}`)

  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }))

  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }

  // End function execution by returning
  return null
}

/**
 * Cloud Function that is called every time new data is created in Firebase Realtime Database.
 *
 * Trigger: `RTDB - onCreate - '/requests/testingFunc/{pushId}'`
 * @name testingFunc
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref(`/requests/${eventName}/{pushId}`)
  .onCreate(testingFuncEvent)
