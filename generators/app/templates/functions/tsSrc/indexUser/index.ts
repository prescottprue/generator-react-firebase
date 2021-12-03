<% if (!includeFirestore) { %>import { getDatabase, Snapshot } from 'firebase-admin/database'<% } %><% if (includeFirestore) { %>import { getFirestore, DocumentSnapshot } from 'firebase-admin/firestore'<% } %>
import * as functions from 'firebase-functions'<% if (!includeFirestore) { %>

/**
 * Index user's by placing their displayName into the users_public collection
 * @param change - Database event from function being
 * @param change.before - Snapshot of data before change
 * @param change.after - Snapshot of data after change
 * @param context - Function context which includes
 * data about the event. More info in docs:
 * https://firebase.google.com/docs/reference/functions/functions.EventContext
 * @returns Resolves with user's profile
 */
async function indexUser(
  change: functions.Change<Snapshot>,
  context: functions.EventContext
): Promise<null> {
  const { userId } = context.params || {}
  const publicProfileRef = getDatabase().ref(`users_public/${userId}`)

  // Display Name being deleted
  if (!change.after.val()) {
    console.log(
      `displayName removed from profile with userId: ${userId}, removing from index...`
    )
    try {
      await publicProfileRef.remove()
      console.log(`Successfully removed displayName from index for userId: ${userId}`)
      return null
    } catch(err) {
      console.error(
        `Error removing users_public value for userId: ${userId}`,
        err
      )
      throw err
    }
  }

  console.log(
    `Display Name for userId: ${userId} changed, updating user index...`
  )

  // Update displayName within public profile
  try {
    await publicProfileRef.update({
      displayName: change.after.val()
    })
  } catch(err) {
    console.error(
      `Error running updating displayName index for profile with userId: ${userId}`,
      err
    )
    throw err
  }

  console.log(`Successfully indexed user with userId: ${userId}`)

  return null
}

/**
 * Function to index user data into a public collection for easy access.
 * Triggered by updates to profile within "users/${userId}" path. Writes data
 * to users_public path.
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}/displayName')
  .onWrite(indexUser)<% } %><% if (includeFirestore) { %>

/**
 * Index user's by placing their displayName into the users_public collection
 * @param change - Database event from function being
 * @param change.before - Snapshot of data before change
 * @param change.after - Snapshot of data after change
 * @param context - Function context which includes
 * data about the event. More info in docs:
 * https://firebase.google.com/docs/reference/functions/functions.EventContext
 * @returns Resolves with user's profile
 */
async function indexUser(
  change: functions.Change<DocumentSnapshot>,
  context: functions.EventContext
): Promise<null> {
  const { userId } = context.params || {}
  const publicProfileRef = getFirestore().doc(`users_public/${userId}`)

  // User Profile being deleted
  if (!change.after.exists) {
    console.log(
      `Profile being removed for user with id: ${userId}, removing from index...`
    )
    try {
      await publicProfileRef.delete()
      console.log(`Successfully removed user with id: ${userId} from index.`)
      return null
    } catch (err) {
      console.error(
        `Error removing public profile of user with id: ${userId}`,
        err
      )
      throw err
    }
  }

  const previousData = change.before.data()
  const newData = change.after.data() || {}

  // Check to see if displayName has changed
  if (previousData?.displayName === newData.displayName) {
    console.log(
      `displayName parameter did not change for user with id: ${userId}, no need to update index. Exiting...`
    )
    return null
  }

  // Update displayName within public profile
  try {
    await publicProfileRef.set(
      {
        displayName: newData.displayName
      },
      { merge: true }
    )
  } catch (err) {
    // Handle errors updating displayName index
    console.error(
      `Error running updating displayName index for profile with userId: ${userId}`,
      err
    )
    throw err
  }

  return null
}

/**
 * Function to index displayName. Triggered by updates to profiles within the
 * users collection. Writes data to "users_public" collection.
 * @type {functions.CloudFunction}
 */
export default functions.firestore
  .document('/users/{userId}')
  .onWrite(indexUser)<% } %>
