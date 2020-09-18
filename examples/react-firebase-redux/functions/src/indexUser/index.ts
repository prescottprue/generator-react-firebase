import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

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
  change: functions.Change<admin.database.Snapshot>,
  context: functions.EventContext
): Promise<null> {
  const { userId } = context.params || {}
  const publicProfileRef = admin.database().ref(`users_public/${userId}`)

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
  .onWrite(indexUser)
