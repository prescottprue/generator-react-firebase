import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>

/**
 * Parse message body from message into JSON handling errors
 * @param {Object} message - Message object from pubsub containing json
 * parameter with body of message
 * @return {Object}
 */
function parseMessageBody(message) {
  try {
    return message.json<% if (airbnbLinting) { %>;<% } %>
  } catch (e) {
    console.error('PubSub message was not JSON and an error was thrown: ', e)<% if (airbnbLinting) { %>;<% } %>
    return null<% if (airbnbLinting) { %>;<% } %>
  }
}

/**
 * @param {functions.pubsub.Message} message - Pubsub message object
 * @return {Promise}
 */
async function <%= camelName %>Event(message) {
  // Parse message body from message into JSON
  const messageBody = parseMessageBody(message)<% if (airbnbLinting) { %>;<% } %>

  // Handle message not having a body
  if (!messageBody) {
    const noBodyMsg = 'The message does not have a body'<% if (airbnbLinting) { %>;<% } %>
    console.error(noBodyMsg)<% if (airbnbLinting) { %>;<% } %>
    throw new Error(noBodyMsg)<% if (airbnbLinting) { %>;<% } %>
  }

  // Get attributes from message
  const { attributes } = message || {}<% if (airbnbLinting) { %>;<% } %>

  console.log('Pub Sub message: ', { messageBody, attributes })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}

/**
 * Cloud Function triggered by a PubSub message publish
 *
 * Trigger: `PubSub - onPublish`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.pubsub
  .topic('<%= camelName %>')
  .onPublish(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
