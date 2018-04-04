import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { to } from '../utils/async'

/**
 * Function to index user data into a public collection for easy access.
 * Triggered by updates to profile within "users/${userId}" path. Writes data
 * to users_public path.
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}/displayName')
  .onWrite(indexUser)

/**
 * Index user's by placing their displayName into the users_public collection
 * @param  {functions.Change} change - Database event from function being
 * @param  {admin.DataSnapshot} change.before - Snapshot of data before change
 * @param  {admin.DataSnapshot} change.after - Snapshot of data after change
 * @param  {functions.EventContext} context - Function context which includes
 * data about the event. More info in docs:
 * https://firebase.google.com/docs/reference/functions/functions.EventContext
 * @return {Promise} Resolves with user's profile
 */
async function indexUser(change, context) {
  const { userId } = context.params || {}
  const publicProfileRef = admin.database().ref(`users_public/${userId}`)

  // Display Name being deleted
  if (!change.after.val()) {
    console.log(
      `displayName removed from profile with userId: ${userId}, removing from index...`
    )
    const [nameRemoveErr] = await to(publicProfileRef.remove())
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

  console.log(
    `Display Name for userId: ${userId} changed, updating user index...`
  )

  // Update displayName within index
  const [nameUpdateErr] = await to(
    publicProfileRef.update({
      displayName: change.after.val()
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

  console.log(`Successfully indexed user with userId: ${userId}`)

  return null
}
