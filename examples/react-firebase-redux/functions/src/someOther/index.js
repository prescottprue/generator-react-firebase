import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

const eventName = 'someOther'

/**
 * @param  {functions.Change} change - Function change interface containing state objects
 * @param {functions.database.DataSnapshot} change.before - State prior to the event.
 * @param {Function} change.before.val - Value before change event
 * @param {functions.database.DataSnapshot} change.after - State after the event.
 * @param {Function} change.after.val - Value after change event
 * @param {functions.EventContext} context - Function event context
 * @param {Object} context.auth - Authentication information for the user that triggered the function
 * @return {Promise}
 */
async function someOtherEvent(change, context) {
  // const { params, auth, timestamp } = context
  const { before, after } = change

  console.log('someOther onWrite event:', { before: before.val(), after: after.val() })

  // Create RTDB for response
  const ref = admin.database().ref(`responses/${eventName}`).push()

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
 * Cloud Function that is called every time a Firebase Realtime Database write of any kind (creation, update, or delete) occurs.
 *
 * Trigger: `RTDB - onWrite - '/someOther/{pushId}'`
 * @name someOther
 * @type {functions.CloudFunction}
 * @public
 */
export default functions.database
  .ref(`/${eventName}/{pushId}`)
  .onWrite(someOtherEvent)
