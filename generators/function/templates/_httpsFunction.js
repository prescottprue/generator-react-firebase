import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>

<% if (eventType === 'onCall') { %>/**
 * Handle <%= name %> onCall HTTP request
 *
 * @param {object} data - Data passed into httpsCallable by client
 * @param {functions.EventContext} context - Function event context
 * @param {object} context.auth - Cloud function context
 * @param {object} context.auth.uid - UID of user that made the request
 * @returns {Promise} Resolves after handling request
 */
export async function <%= name %>Request(data, context) {
  const { auth, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  console.log('request received', { data, timestamp })<% if (airbnbLinting) { %>;<% } %>
  // Return data back to client to end function execution
  return { message: 'Hello World' }<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>/**
  * Handle request from calling /<%= name %> endpoint
  *
  * @param {object} req - Express HTTP Request
  * @param {object} res - Express HTTP Response
  * @returns {Promise} Resolves after handling request
  */
 export async function <%= name %>Request(req, res) {
   // Write response to request to end function execution
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })<% if (airbnbLinting) { %>;<% } %>
   res.end('Hello from <%= name %>')<% if (airbnbLinting) { %>;<% } %>
 }<% } %>

/**
 * @name <%= name %>
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)<% if (airbnbLinting) { %>;<% } %>
