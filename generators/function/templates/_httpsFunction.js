import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>

/**
* @param req - Express HTTP Request
* @param res - Express HTTP Response
*/
function <%= name %>Request(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })<% if (airbnbLinting) { %>;<% } %>
  res.end('Hello from <%= name %>')<% if (airbnbLinting) { %>;<% } %>
}

/**
 * @name <%= name %>
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)<% if (airbnbLinting) { %>;<% } %>
