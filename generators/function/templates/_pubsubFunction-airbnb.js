import * as functions from 'firebase-functions';
<% if (eventType === 'onPublish') { %>
/**
 * Parse message body from message into JSON handling errors
 * @param {Object} message - Message object from pubsub containing json
 * parameter with body of message
 * @return {Object}
 */
function parseMessageBody(message) {
  try {
    return message.json;
  } catch (e) {
    console.error('PubSub message was not JSON and an error was thrown: ', e);
    return null;
  }
}

/**
 * @param {functions.pubsub.Message} message - Pubsub message object
 * @return {Promise}
 */
async function <%= camelName %>Event(message) {
  // Parse message body from message into JSON
  const messageBody = parseMessageBody(message);

  // Handle message not having a body
  if (!messageBody) {
    const noBodyMsg = 'The message does not have a body';
    console.error(noBodyMsg);
    throw new Error(noBodyMsg);
  }

  // Get attributes from message
  const { attributes } = message || {};

  console.log('Pub Sub message: ', { messageBody, attributes });

  // End function execution by returning
  return null;
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
  .onPublish(<%= camelName %>Event);<% } else { %>
/**
 * @param {functions.pubsub.Context} context - Function context
 * @return {Promise}
 */
async function <%= camelName %>Event(context) {
  console.log('Pub Sub message: ', { context });

  // End function execution by returning
  return null;
}


const schedule = 'every 5 minutes';

/**
 * Cloud Function triggered on a specified CRON schedule
 *
 * Trigger: `PubSub - onRun`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.pubsub.schedule(schedule).onRun(<%= camelName %>Event);<% } %>
