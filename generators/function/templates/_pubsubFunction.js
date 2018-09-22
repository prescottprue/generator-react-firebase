import * as functions from 'firebase-functions'

/**
 * Parse message body from message into JSON handling errors
 * @param {Object} message - Message object from pubsub containing json
 * parameter with body of message
 * @return {Object}
 */
function parseMessageBody(message) {
  try {
    return message.json
  } catch (e) {
    console.error('PubSub message was not JSON and an error was thrown: ', e)
    return null
  }
}

/**
 * @param {functions.pubsub.Message} context - Functions context
 * @return {Promise}
 */
async function <%= camelName %>Event(message) {
  // Parse message body from message into JSON
  const messageBody = parseMessageBody(message)

  // Handle message not having a body
  if (!messageBody) {
    const noBodyMsg = 'The message does not have a body'
    console.error(noBodyMsg)
    throw new Error(noBodyMsg)
  }

  // Get attributes from message
  const { attributes } = message || {}

  console.log('Pub Sub message: ', { messageBody, attributes })

  return null
}

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database <%= eventType.replace('on', '') %> Event
 * @type {functions.CloudFunction}
 */
export default functions.pubsub.topic('topic-name').onPublish(<%= camelName %>Event)
