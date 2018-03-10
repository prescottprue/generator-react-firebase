import * as admin from 'firebase-admin'
import * as functions from 'functions'
import { to } from '../utils/async'

/**
 * Function to index displayName. Triggered by user profile updates. Writes
 * data to users_public collection.
 * @param  {functions.Event} event - Firestore event from function being
 * triggered when user profile's change
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document('/users/{userId}')
  .onWrite(indexDisplayName)

async function indexDisplayName (event) {
  const { userId } = event.params || {}
  const publicProfileRef = admin.firestore()
    .collection('users_public')
    .doc(userId)
  // Display Name being deleted
  if (!event.data.exists()) {
    console.log(
      `displayName removed from profile with userId: ${userId}, removing from index...`
    )
    const [nameRemoveErr] = await to(publicProfileRef.delete())
    // Handle errors removing displayName index
    if (nameRemoveErr) {
      console.error(
        'Error running delete promises:',
        nameRemoveErr.message || nameRemoveErr
      )
      throw nameRemoveErr
    }
    console.log(
      `Successfully removed displayName from index for userId: ${userId}`
    )
    return null
  }
  const data = event.data.val()
  // Update displayName within index
  const [nameUpdateErr] = await to(
    publicProfileRef.update({
      displayName: data.child('displayName').val()
    })
  )
  // Handle errors updating displayName index
  if (nameUpdateErr) {
    console.error(
      `Error running updating displayName index for profile with userId: ${userId}`,
      nameUpdateErr.message || nameUpdateErr
    )
    throw nameUpdateErr
  }
  return data
}
