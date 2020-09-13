import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %><% if (usingTypescript) { %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %><% } %>

/**
 * @param <% if (!usingTypescript) { %>{firebase.auth.UserRecord} <% } %>user - User associated with auth event
 * @param <% if (!usingTypescript) { %>{functions.EventContext} <% } %>context - Function event context
 * @returns <% if (!usingTypescript) { %>{Promise} <% } %>Resolves after handling even
 */
function <%= camelName %>Event(<% if (!usingTypescript) { %>user, context)<% } %><% if (usingTypescript) { %>
  user: admin.auth.UserRecord,
  context: functions.EventContext
): Promise<null><% } %> {
  const { timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  console.log('Auth <%= eventType %> event', { user, timestamp })<% if (airbnbLinting) { %>;<% } %>
  return null
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
