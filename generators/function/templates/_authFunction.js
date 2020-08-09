import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
// import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>

/**
 * @param {firebase.auth.UserRecord} user - User associated with auth event
 * @param {functions.EventContext} context - Function event context
 * @returns {Promise} Resolves after handling even
 */
function <%= camelName %>Event(user, context) {
  const { timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  console.log('Auth <%= eventType %> event', { user, timestamp })<% if (airbnbLinting) { %>;<% } %>
}

/**
 * Cloud Function triggered by Auth <%= eventType %> Event
 *
 * Trigger: `Auth - <%= eventType %>`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.auth
  .user()
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
