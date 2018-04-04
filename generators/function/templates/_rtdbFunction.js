import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database <%= eventType.replace('on', '') %> Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/requests/<%= camelName %>/{pushId}')
  .<%= eventType %>(<%= camelName %>Event)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
<% if (functionsV1 && eventType === 'onWrite') { %>async function <%= camelName %>Event(change, context) {
  // const { params, auth, timestamp } = context
  // const { before, after } = change
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }
  return response
}<% } else if (functionsV1 && eventType !== 'onWrite') { %>async function <%= camelName %>Event(snap, context) {
  // const { params, auth, timestamp } = context
  // const eventData = snap.val()
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)
    throw writeErr
  }
  return response
}<% } else { %>async function <%= camelName %>Event(event) {
  // const { params, data } = event
  // const eventData = data.val()
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push(eventData))
  if (writeErr) {
    console.error(
      `Error writing response: ${writeErr.message || ''}`,
      writeErr
    )
    throw writeErr
  }
  return response
}<% } %>
