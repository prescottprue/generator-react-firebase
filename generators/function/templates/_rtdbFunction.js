import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>
import { to } from 'utils/async'<% if (airbnbLinting) { %>;<% } %>

/**
 * @param  <% if (functionsV1) { %>{functions.Event} event - Function event<% } else { %>{functions.Change} event - Function event<% } %><% if (functionsV1) { %>
 * @param {functions.Context} context - Functions context<% } %>
 * @return {Promise}
 */
<% if (functionsV1 && eventType === 'onWrite') { %>async function <%= camelName %>Event(change, context) {
  // const { params, auth, timestamp } = context
  // const { before, after } = change
  const ref = admin.database().ref('responses')<% if (airbnbLinting) { %>;<% } %>
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  return response<% if (airbnbLinting) { %>;<% } %>
}<% } else if (functionsV1 && eventType !== 'onWrite') { %>async function <%= camelName %>Event(snap, context) {
  // const { params, auth, timestamp } = context
  // const eventData = snap.val()
  const ref = admin.database().ref('responses')<% if (airbnbLinting) { %>;<% } %>
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  return response<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>async function <%= camelName %>Event(event) {
  // const { params, data } = event
  // const eventData = data.val()
  const ref = admin.database().ref('responses')<% if (airbnbLinting) { %>;<% } %>
  const [writeErr, response] = await to(ref.push(eventData))<% if (airbnbLinting) { %>;<% } %>
  if (writeErr) {
    console.error(
      `Error writing response: ${writeErr.message || ''}`,
      writeErr
    )<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  return response<% if (airbnbLinting) { %>;<% } %>
}<% } %><% if (airbnbLinting) { %>;<% } %>

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Real Time Database <%= eventType.replace('on', '') %> Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/requests/<%= camelName %>/{pushId}')
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
