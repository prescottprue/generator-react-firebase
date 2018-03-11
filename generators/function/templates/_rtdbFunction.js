import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}')
  .onUpdate(<%= camelName %>Event)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function <%= camelName %>Event(event) {
  const eventData = event.data.val()
  const params = event.params
  const ref = admin.database().ref('responses')
  await ref.push(eventData)
  return data
}
