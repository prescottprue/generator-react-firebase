import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Firestore Event
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document('projects/{projectId}')
  .onUpdate(<%= camelName %>Event)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function <%= camelName %>Event(event) {
  const eventData = event.data.data()
  const firestore = admin.firestore()
  // const ref = firestore.collection()
}
