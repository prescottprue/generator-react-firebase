import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
<% if (usingTypescript && eventType === 'onCall') { %>
interface <%= camelName %>Data {
  [k: string]: any
}
interface <%= camelName %>Response {
  message: string
}
<% } %>
<% if (eventType === 'onCall') { %>/**
 * Handle <%= name %> onCall HTTP request
 *
 * @param {object} data - Data passed into httpsCallable by client
 * @param {functions.https.CallableContext} context - Function event context
 * @param {object} context.auth - Cloud function context
 * @param {object} context.auth.uid - UID of user that made the request
 * @returns {Promise} Resolves after handling request
 */
export async function <%= name %>Request(<% if (!usingTypescript) { %>data, context)<% } %><% if (usingTypescript) { %>
  data: <%= camelName %>Data,
  context: functions.https.CallableContext
): Promise<<%= camelName %>Response><% } %> {
  console.log('request received', { data, context })<% if (airbnbLinting) { %>;<% } %>
  // Return data back to client to end function execution
  return { message: 'Hello World' }<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>/**
 * Handle request from calling /<%= name %> endpoint
 *
 * @param {functions.https.Request} req - Express HTTP Request
 * @param {object} res - Express HTTP Response
 * @returns {Promise} Resolves after handling request
 */
export async function <%= name %>Request(<% if (!usingTypescript) { %>req, res)<% } %><% if (usingTypescript) { %>
  req: functions.https.Request,
  res: functions.Response<any>
): Promise<void><% } %> {
  console.log('request received', { body: req.body })<% if (airbnbLinting) { %>;<% } %>
  // Write response to request to end function execution
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })<% if (airbnbLinting) { %>;<% } %>
  res.end('Hello from <%= name %>')<% if (airbnbLinting) { %>;<% } %>
}<% } %>

/**
 * Cloud Function triggered by HTTP request
 *
 * Trigger: `HTTPS - <%= eventType %>`
 *
 * @name <%= name %>
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)<% if (airbnbLinting) { %>;<% } %>
