import * as functions from 'firebase-functions'

<% if (eventType === 'onCall') { %>/**
 * Handle <%= name %> request
 * @param {object} data - Data passed into httpsCallable by client
 * @param {object} context - Cloud function context
 * @param {object} context.auth - Cloud function context
 * @param {object} context.auth.uid - UID of user that made the request
 * @param {object} context.auth.name - Name of user that made the request
 * @returns {Promise} Resolves after handling request
 */
export async function <%= name %>Request(data, context) {
  // Return data back to client to end function execution
  return { message: 'Hello World' }
}<% } else { %>/**
  * Handle request from calling /<%= name %> endpoint
  * @param {object} req - Express HTTP Request
  * @param {object} res - Express HTTP Response
  * @returns {Promise} Resolves after handling request
  */
 export async function <%= name %>Request(req, res) {
   // Write response to request to end function execution
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
   res.end('Hello from <%= name %>')
 }<% } %>

/**
 * @name <%= name %>
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)
