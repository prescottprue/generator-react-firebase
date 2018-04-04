import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Auth Event
 * @type {functions.CloudFunction}
 */
export default functions.auth.user().<%= eventType %>(<%= camelName %>Event)

<% if (functionsV1) { %>async function <%= camelName %>Event(userMetaData, context) {
  // const { creationTime, lastSignInTime } = userMetadata;
}<% } else { %>function <%= camelName %>Event(event) {
  // const user = event.data; // The Firebase user
  // const { email, displayName } = user
}<% } %>
