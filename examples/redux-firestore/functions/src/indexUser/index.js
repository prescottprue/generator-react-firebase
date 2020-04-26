import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { to } from '../utils/async'

/**
 * Index user's by placing their displayName into the users_public collection
 * @param {functions.Change} change - Database event from function being
 * @param {admin.firestore.DataSnapshot} change.before - Snapshot of data before change
 * @param {admin.firestore.DataSnapshot} change.after - Snapshot of data after change
 * @param {functions.EventContext} context - Function context which includes
 * data about the event. More info in docs:
 * https://firebase.google.com/docs/reference/functions/functions.EventContext
 * @returns {Promise} Resolves with user's profile
 */
async function indexUser(change, context) {
  const { userId } = context.params || {}
  const publicProfileRef = admin
    .firestore()
    .collection('users_public')
    .doc(userId)

  // User Profile being deleted
  if (!change.after.exists) {
    console.log(
      `Profile being removed for user with id: ${userId}, removing from index...`
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
    console.log(`Successfully removed user with id: ${userId} from index.`)
    return null
  }

  const previousData = change.before.data()
  const newData = change.after.data()

  // Check to see if displayName has changed
  if (previousData && previousData.displayName === newData.displayName) {
    console.log(
      `displayName parameter did not change for user with id: ${userId}, no need to update index. Exiting...`
    )
    return null
  }

  // Update displayName within index
  const [nameUpdateErr] = await to(
    publicProfileRef.set(
      {
        displayName: newData.displayName
      },
      { merge: true }
    )
  )

  // Handle errors updating displayName index
  if (nameUpdateErr) {
    console.error(
      `Error running updating displayName index for profile with userId: ${userId}`,
      nameUpdateErr.message || nameUpdateErr
    )
    throw nameUpdateErr
  }

  return newData
}

/**
 * Function to index displayName. Triggered by updates to profiles within the
 * users collection. Writes data to "users_public" collection.
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document('/users/{userId}')
  .onWrite(indexUser)
