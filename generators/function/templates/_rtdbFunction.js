import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>
import { to } from 'utils/async'<% if (airbnbLinting) { %>;<% } %>

/**
 * <% if (!functionsV1) { %>@param  {functions.Event} event - Function event<% } %><% if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>@param  {functions.Change} change - Function change interface containing state objects
 * @param {functions.database.DataSnapshot} change.before - State prior to the event.
 * @param {Function} change.before.val - Value before change event
 * @param {functions.database.DataSnapshot} change.after - State after the event.
 * @param {Function} change.after.val - Value after change event<% } else {%>@param  {functions.database.DataSnapshot} snap - Data snapshot of the event
 * @param {Function} snap.val - Value after event<% } %><% if (functionsV1) { %>
 * @param {functions.EventContext} context - Function event context
 * @param {Object} context.auth - Authentication information for the user that triggered the function<% } %>
 * @return {Promise}
 */
<% if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>async function <%= camelName %>Event(change, context) {
  // const { params, auth, timestamp } = context
  const { before, after } = change
  console.log('<%= camelName %> <%= eventType %> event:', { before: before.val(), after: after.val() })
  // Create RTDB for response
  const ref = admin.database().ref(`responses/<%= camelName %>`).push()<% if (airbnbLinting) { %>;<% } %>
  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>
  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>async function <%= camelName %>Event(snap, context) {
  const { params: { pushId } } = context
  console.log('<%= camelName %> <%= eventType %> event:', snap.val())
  // Create RTDB for response
  const ref = admin.database().ref(`responses/<%= camelName %>/${pushId}`)<% if (airbnbLinting) { %>;<% } %>
  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>
  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(`Error writing response: ${writeErr.message || ''}`, writeErr)<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>async function <%= camelName %>Event(event) {
  const { params: { pushId }, data } = event
  console.log('<%= camelName %> <%= eventType %> event:', event.val())
  // Create RTDB for response
  const ref = admin.database().ref(`responses/<%= camelName %>/${pushId}`)<% if (airbnbLinting) { %>;<% } %>
  // Write data to RTDB
  const [writeErr] = await to(ref.set({ hello: 'world' }))<% if (airbnbLinting) { %>;<% } %>
  // Handle errors writing data to RTDB
  if (writeErr) {
    console.error(
      `Error writing response: ${writeErr.message || ''}`,
      writeErr
    )<% if (airbnbLinting) { %>;<% } %>
    throw writeErr<% if (airbnbLinting) { %>;<% } %>
  }
  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } %><% if (airbnbLinting) { %>;<% } %>

/**
 * <% if (eventType === 'onCreate') { %>Event handler that fires every time new data is created in Firebase Realtime Database.
 * <% } else if (eventType === 'onWrite') { %>Event handler that fires every time a Firebase Realtime Database write of any kind (creation, update, or delete) occurs.
 * <% } else if (eventType === 'onUpdate') { %>Event handler that fires every time data is updated in Firebase Realtime Database.
 * <% } else if (eventType === 'onDelete') { %>Event handler that fires every time data is deleted from Firebase Realtime Database.
 * <% } %>@name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref(<% if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>'/requests/<%= camelName %>/{pushId}'<% } else {%>'/<%= camelName %>'<% } %>)
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
