import * as functions from 'firebase-functions'<% if (airbnbLinting) { %>;<% } %>
import * as admin from 'firebase-admin'<% if (airbnbLinting) { %>;<% } %>
import path from 'path'<% if (airbnbLinting) { %>;<% } %>
import os from 'os'<% if (airbnbLinting) { %>;<% } %>
import fs from 'fs'<% if (airbnbLinting) { %>;<% } %>

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
<% if (functionsV1) { %>async function <%= camelName %>Event(object, context) {
  const { name: filePath, contentType } = object<% if (airbnbLinting) { %>;<% } %>

  const bucket = admin.storage().bucket()<% if (airbnbLinting) { %>;<% } %>
  const fileName = path.basename(filePath)<% if (airbnbLinting) { %>;<% } %>
  const tempFilePath = path.join(os.tmpdir(), fileName)<% if (airbnbLinting) { %>;<% } %>

  // Download the file
  await bucket.file(filePath).download({ destination: tempFilePath })<% if (airbnbLinting) { %>;<% } %>

  // Delete the local files to free up disk space
  return fs.unlinkSync()<% if (airbnbLinting) { %>;<% } %>
}<% } else { %>async function <%= camelName %>Event(event) {
  const {
    name: filePath,
    resourceState,
    metageneration<% if (airbnbLinting) { %>,<% } %>
    // contentType,
  } = event.data<% if (airbnbLinting) { %>;<% } %>

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.')<% if (airbnbLinting) { %>;<% } %>
    return null<% if (airbnbLinting) { %>;<% } %>
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.')<% if (airbnbLinting) { %>;<% } %>
    return null<% if (airbnbLinting) { %>;<% } %>
  }

  const bucket = admin.storage().bucket()<% if (airbnbLinting) { %>;<% } %>
  const fileName = path.basename(filePath)<% if (airbnbLinting) { %>;<% } %>
  const tempFilePath = path.join(os.tmpdir(), fileName)<% if (airbnbLinting) { %>;<% } %>

  // Download the file
  await bucket.file(filePath).download({ destination: tempFilePath })<% if (airbnbLinting) { %>;<% } %>

  // Delete the local files to free up disk space
  return fs.unlinkSync()<% if (airbnbLinting) { %>;<% } %>
}<% } %>

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
