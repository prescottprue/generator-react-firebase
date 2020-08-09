import * as functions from 'firebase-functions'
<% if (eventType === 'onPublish') { %>
/**
 * Parse message body from message into JSON handling errors
 * @param {object} message - Message object from pubsub containing json
 * parameter with body of message
 * @returns {object}
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
 * Handle <%= camelName %> pub sub event
 * 
 * @param {functions.pubsub.Message} message - Pubsub message object
 * @returns {Promise}
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
  .onPublish(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %><% } else { %>
/**
 * Handle <%= camelName %> pub sub event
 * @param {functions.pubsub.Context} context - Function context
 * @returns {Promise}
 */
async function <%= camelName %>Event(context) {
  console.log('Pub Sub message: ', { context })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}

const schedule = 'every 5 minutes'<% if (airbnbLinting) { %>;<% } %>

/**
 * Cloud Function triggered on a specified CRON schedule
 *
 * Trigger: `PubSub - onRun`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.pubsub.schedule(schedule).onRun(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %><% } %>
