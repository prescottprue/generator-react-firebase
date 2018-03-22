import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Auth Event
 * @type {functions.CloudFunction}
 */
export default functions.auth.user().onCreate(<%= camelName %>Event)

async function <%= camelName %>Event(event) {
  // const user = event.data; // The Firebase user
  // const { email, displayName } = user
}
