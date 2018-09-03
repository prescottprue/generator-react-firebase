import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @param {functions.pubsub.Message} context - Functions context
 * @return {Promise}
 */
async function <%= camelName %>Event(message) {
  const messageBody = message.data ? Buffer.from(message.data, 'base64').toString() : null;
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }
  return response
}

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database <%= eventType.replace('on', '') %> Event
 * @type {functions.CloudFunction}
 */
export default functions.pubsub
  .topic('topic-name')
  .onPublish(<%= camelName %>Event)
