import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
// import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>

<% if (functionsV1) { %>async function <%= camelName %>Event(userRecord, context) {
  // const { creationTime, lastSignInTime } = userRecord<% if (airbnbLinting) { %>;<% } %>
  console.log('Hello world', userRecord, context)
}<% } else { %>function <%= camelName %>Event(event) {
  // const user = event.data<% if (airbnbLinting) { %>;<% } %> // The Firebase user
  console.log('Hello world', event)<% if (airbnbLinting) { %>;<% } %>
}<% } %>

/**
 * Cloud Function triggered by Auth <%= eventType %> Event
 *
 * Trigger: `PubSub - onPublish`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 * @public
 */
export default functions.auth
  .user()
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
