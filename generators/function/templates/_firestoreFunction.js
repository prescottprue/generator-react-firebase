import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>

/**
 * Handle Firestore <%= eventType %> event
 *
 * <% if (eventType === 'onWrite' || eventType === 'onUpdate') { %>@param {functions.Change} change - Function change interface containing state objects
 * @param {admin.firestore.DataSnapshot} change.before - State prior to the event.
 * @param {admin.firestore.DataSnapshot} change.after - State after the event.<% } else if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>@param {admin.firestore.DataSnapshot} snap - Data snapshot of the event<% } %>
 * @param {functions.EventContext} context - Function event context
 * @param {object} context.auth - Authentication information for the user that triggered the function
 * @returns {Promise} Resolves after handle event
 */
<% if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>async function <%= camelName %>Event(snap, context) {
  const { params, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  console.log('<%= camelName %> <%= eventType %> event:', {
    data: snap.data(),
    params,
    timestamp<% if (airbnbLinting) { %>,<% } %>
  })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else if (eventType === 'onWrite' || eventType === 'onUpdate') { %>async function <%= camelName %>Event(change, context) {
  const { params, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  const { before, after } = change<% if (airbnbLinting) { %>;<% } %>

  console.log('<%= camelName %> <%= eventType %> event:', {
    before: before.data(),
    after: after.data(),
    params,
    timestamp<% if (airbnbLinting) { %>,<% } %>
  })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } %>

/**
 * Cloud Function triggered by Firestore <%= eventType %> Event
 *
 * Trigger: `Firestore - <%= eventType %>`
 *
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.firestore<% if (camelName.length >= 5) { %>
  <% } %>.document('<%= camelName %>/{docId}')<% if (camelName.length >= 5) { %>
  <% } %>.<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
