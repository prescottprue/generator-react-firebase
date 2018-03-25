import * as functions from 'firebase-functions'

/**
 * @name <%= name %>
 * Cloud Function triggered by HTTP request
 * @type {functions.CloudFunction}
 */
export default functions.https.<%= eventType %>(<%= name %>Request)

/**
 * @param req - Request
 * @param res - Response
 */
function <%= name %>Request(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(`Hello from <%= name %>`)
}
