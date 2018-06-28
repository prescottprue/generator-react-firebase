import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
// import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>

<% if (functionsV1) { %>async function <%= camelName %>Event(userMetaData, context) {
  // const { creationTime, lastSignInTime } = userMetadata<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>function <%= camelName %>Event(event) {
  // const user = event.data<% if (airbnbLinting) { %>;<% } %> // The Firebase user
  // const { email, displayName } = user<% if (airbnbLinting) { %>;<% } %>
}<% } %><% if (airbnbLinting) { %>;<% } %>

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Auth Event
 * @type {functions.CloudFunction}
 */
export default functions.auth.user().<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
