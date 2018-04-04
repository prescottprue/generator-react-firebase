import * as functions from 'firebase-functions'
import path from 'path'
import os from 'os'
import fs from 'fs'

const gcs = require('@google-cloud/storage')()

/**
 * @name <%= camelName %>
 * Cloud Function triggered by Cloud Storage Event
 * @type {functions.CloudFunction}
 */
export default functions.storage
  .object()
  .<%= eventType %>(<%= camelName %>Event)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
<% if (functionsV1) { %>async function <%= camelName %>Event(object, context) {
  const {
    bucket: bucketName,
    name: filePath,
    contentType,
  } = object

  const bucket = gcs.bucket(bucketName)
  const fileName = path.basename(filePath)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  // Download the file
  await bucket.file(filePath).download({ destination: tempFilePath })
  // Delete the local files to free up disk space
  return fs.unlinkSync()
}<% } else { %>async function <%= camelName %>Event(event) {
  const {
    bucket: bucketName,
    name: filePath,
    // contentType,
    resourceState,
    metageneration
  } = event.data

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.')
    return null
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.')
    return null
  }

  const bucket = gcs.bucket(bucketName)
  const fileName = path.basename(filePath)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  // Download the file
  await bucket.file(filePath).download({ destination: tempFilePath })
  // Delete the local files to free up disk space
  return fs.unlinkSync()
}<% } %>
