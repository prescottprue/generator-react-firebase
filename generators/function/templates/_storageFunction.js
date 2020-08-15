import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
// import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>

/**
 * Handle storage <%= eventType %> event
 * @param {functions.storage.Object} object - Object associated with storage event
 * @param {functions.EventContext} context - Function event context
 * @returns {Promise} After handling <%= camelName %> event
 */
async function <%= camelName %>Event(object, context) {
  const { name, contentType } = object<% if (airbnbLinting) { %>;<% } %>
  console.log('Storage <%= eventType %> event:', { name, contentType, context })  
  // Download the file as a buffer
  // const bucket = admin.storage().bucket()<% if (airbnbLinting) { %>;<% } %>
  // const [fileBuffer] = await bucket.file(name).download()<% if (airbnbLinting) { %>;<% } %>
}

/**
 * Cloud Function triggered by Cloud Storage <%= eventType %> Event
 *
 * Trigger: `Storage - <%= eventType %>`
 * @name <%= camelName %>
 * @type {functions.CloudFunction}
 * @public
 */
export default functions.storage
  .object()
  .<%= eventType %>(<%= camelName %>Event)<% if (airbnbLinting) { %>;<% } %>
