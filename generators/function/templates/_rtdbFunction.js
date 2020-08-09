import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>

/**
 * Handle Real Time Database <%= eventType %> event
 *
 * <% if (eventType === 'onWrite' || eventType === 'onUpdate') { %>@param  {functions.Change} change - Function change interface containing state objects
 * @param {functions.database.DataSnapshot} change.before - State prior to the event.
 * @param {functions.database.DataSnapshot} change.after - State after the event.<% } else if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>@param {functions.database.DataSnapshot} snap - Data snapshot of the event<% } %>
 * @param {functions.EventContext} context - Function event context
 * @param {object} context.auth - Authentication information for the user that triggered the function
 * @returns {Promise} Resolves after handling event
 */
<% if (eventType === 'onWrite' || eventType === 'onUpdate') { %>async function <%= camelName %>Event(change, context) {
  const { params, auth, timestamp } = context<% if (airbnbLinting) { %>;<% } %>
  const { before, after } = change<% if (airbnbLinting) { %>;<% } %>

  console.log('<%= camelName %> <%= eventType %> event:', {
    before: before.val(),
    after: after.val(),
    uid: auth?.uid,
    params,
    timestamp<% if (airbnbLinting) { %>,<% } %>
  })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } else if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>async function <%= camelName %>Event(snap, context) {
  const { params, auth, timestamp } = context<% if (airbnbLinting) { %>;<% } %>

  console.log('<%= camelName %> <%= eventType %> event:', {
    val: snap.val(),
    uid: auth?.uid,
    params,
    timestamp<% if (airbnbLinting) { %>,<% } %>
  })<% if (airbnbLinting) { %>;<% } %>

  // End function execution by returning
  return null<% if (airbnbLinting) { %>;<% } %>
}<% } %>

/**
 * <% if (eventType === 'onCreate') { %>Cloud Function that is called every time new data is created in Firebase Realtime Database.
 *<% } else if (eventType === 'onWrite') { %>Cloud Function that is called every time a Firebase Realtime Database write of any kind (creation, update, or delete) occurs.
 *<% } else if (eventType === 'onUpdate') { %>Cloud Function that is called every time data is updated in Firebase Realtime Database.
 *<% } else if (eventType === 'onDelete') { %>Cloud Function that is called every time data is deleted from Firebase Realtime Database.<% } %>
 *
 * Trigger: `RTDB - <%= eventType %> - <% if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>'/<%= camelName %>/{pushId}'<% } else {%>'/<%= camelName %>/{pushId}'<% } %>`
 *
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 */
export default functions.database<% if (camelName.length >= 10) { %>
  <% } %>.ref(<% if (eventType !== 'onWrite' && eventType !== 'onUpdate') { %>'/<%= camelName %>/{pushId}'<% } else {%>'/<%= camelName %>/{pushId}'<% } %>)<% if (camelName.length >= 10) { %>
  <% } %>.<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
