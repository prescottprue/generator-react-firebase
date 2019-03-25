import * as functions from 'firebase-functions'

<% if (eventType === 'onCall') { %>/**
 * @param {Object} data - Data passed into httpsCallable by client
 * @param {Object} context - Cloud function context
 * @param {Object} context.auth - Cloud function context
 * @param {Object} context.auth.uid - UID of user that made the request
 * @param {Object} context.auth.name - Name of user that made the request
 */
export async function <%= name %>Request(data, context) {
  // Return data back to client to end function execution
  return { message: 'Hello World' }
}<% } else { %>/**
  * @param req - Express HTTP Request
  * @param res - Express HTTP Response
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
