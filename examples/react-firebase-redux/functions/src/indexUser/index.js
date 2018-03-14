import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { to } from '../utils/async'

/**
 * Function to index user data into a public collection for easy access.
 * Triggered by user profile updates. Writesdata to users_public collection.
 * @param  {functions.Event} event - Database event from function being
 * triggered when user profile's change
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}/displayName')
  .onWrite(indexUser)

/**
 * Index user's by placing their displayName into the users_public collection
 * @param  {functions.Event} event - Database event from function being
 * triggered when user profile's change
 * @return {Promise} Resolves with user's profile
 */
async function indexUser(event) {
  const { userId } = event.params || {}
  const publicProfileRef = admin.database().ref(`users_public/${userId}`)

  // Display Name being deleted
  if (!event.data.exists()) {
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

  const data = event.data.val()

  // Update displayName within index
  const [nameUpdateErr] = await to(
    publicProfileRef.update({
      displayName: data.displayName
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

