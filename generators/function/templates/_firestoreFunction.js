import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>
import { to } from 'utils/async'<% if (airbnbLinting) { %>;<% } %>

const eventName = '<%= camelName %>'<% if (airbnbLinting) { %>;<% } %>

/**
 * <% if (!functionsV1) { %>@param {functions.Event} event - Function event
 * @param {functions.firestore.DataSnapshot} event.data - Data snapshot of the event<% } %><% if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>@param  {functions.Change} change - Function change interface containing state objects
 * @param {functions.firestore.DataSnapshot} change.before - State prior to the event.
 * @param {Function} change.before.data - Value before change event
 * @param {functions.firestore.DataSnapshot} change.after - State after the event.
 * @param {Function} change.after.data - Value after change event<% } else if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>
 * @param {functions.firestore.DataSnapshot} snap - Data snapshot of the event
 * @param {Function} snap.data - Value of document<% } %><% if (functionsV1) { %>
 * @param {functions.EventContext} context - Function event context
 * @param {Object} context.auth - Authentication information for the user that triggered the function<% } %>
 * @return {Promise}
 */
<% if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>async function <%= camelName %>Event(snap, context) {
  // const { params, auth, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  console.log('<%= camelName %> <%= eventType %> event:', snap.data())<% if (airbnbLinting) { %>;<% } %>

  // Create Firestore Collection Reference for the response
  const collectionRef = admin.firestore().collection(`${eventName}_responses`)<% if (airbnbLinting) { %>;<% } %>

  // Write data to Firestore
  const [writeErr] = await to(collectionRef.add({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>

  // Handle errors writing data to Firestore
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>async function <%= camelName %>Event(change, context) {
  // const { params, auth, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  const { before, after } = change<% if (airbnbLinting) { %>;<% } %>

  console.log('<%= camelName %> <%= eventType %> event:', { before: before.data(), after: after.data() })<% if (airbnbLinting) { %>;<% } %>

  // Create Firestore Collection Reference for the response
  const collectionRef = admin.firestore().collection(`${eventName}_responses`)<% if (airbnbLinting) { %>;<% } %>

  // Write data to Firestore
  const [writeErr] = await to(collectionRef.add({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>

  // Handle errors writing data to Firestore
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>async function <%= camelName %>Event(event) {
  const { params: { docId }, data } = event<% if (airbnbLinting) { %>;<% } %>

  console.log(`<%= camelName %> <%= eventType %> event for id: "${docId}"`, data.data())<% if (airbnbLinting) { %>;<% } %>

  // Create Firestore Collection Reference for the response
  const collectionRef = admin.firestore().collection(`${eventName}_responses`)<% if (airbnbLinting) { %>;<% } %>

  // Write data to Firestore
  const [writeErr] = await to(collectionRef.add({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>

  // Handle errors writing data to Firestore
  if (writeErr) {
    console.error(
      `Error writing response for id: "${docId}": ${writeErr.message || ''}`,
      writeErr
    )<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } %>

/**
 * Cloud Function triggered by Firestore Event
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document(`${eventName}/{docId}`)
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
