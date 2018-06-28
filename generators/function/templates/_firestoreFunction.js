import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
<% if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>async function <%= camelName %>Event(snap, context) {
  // const eventData = snap.val()
  // const firestore = admin.firestore()
  // const ref = firestore.collection()
}<% } else if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>async function <%= camelName %>Event(change, context) {
  // const beforeData = change.before.data(); // data before the write
  // const afterData = change.after.data(); // data after the write
  // const ref = firestore.collection()
}<% } else { %>async function <%= camelName %>Event(event) {
  // const beforeData = event.data.previous.data() // data before the write
  // const afterData = event.data.data() // data after the write
  // const firestore = admin.firestore()
  // const ref = firestore.collection()
}<% } %>

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Firestore Event
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document('projects/{projectId}')
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
