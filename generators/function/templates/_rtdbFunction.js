import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database <%= eventType.replace('on', '') %> Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/requests/<%= camelName %>/{pushId}')
  .<%= eventType %>(<%= camelName %>Event)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function <%= camelName %>Event(event) {
  const eventData = event.data.val()
  const params = event.params
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push(eventData))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
