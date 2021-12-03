import { useEffect } from 'react'
import config from 'config'<% if (!includeRedux) { %>
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { useFirebaseApp, useAnalytics, useUser, AuthProvider, <% if (includeFirestore) { %>FirestoreProvider<% } else { %>DatabaseProvider<% } %> } from 'reactfire'<% } %><% if (includeRedux) { %>
import firebase from 'firebase/app'
import 'firebase/messaging'<% } %><% if (includeErrorHandling) { %>
import { setErrorUser } from 'utils/errorHandler'<% } %>
import { version } from '../../../package.json'

function FirebaseComponents({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)<% if (!includeFirestore) { %>
  const database = getDatabase(app)<% } %><% if (includeFirestore) { %>
  const firestore = getFirestore(app)<% } %>


  // Enable Real Time Database emulator if environment variable is set
  if (config.emulators) {
    const { authHost, <% if (includeFirestore) { %>firestoreHost<% } else { %>databaseHost<% } %> } = config.emulators
    // Set up emulators
    if (config.emulators.authHost) {
      connectAuthEmulator(auth, `http://${config.emulators.authHost}`)
      console.debug('Auth emulator connection enabled') // eslint-disable-line no-console
  }<% if (includeFirestore) { %>
    if (config.emulators.firestoreHost) {
      const [, port] = config.emulators.firestoreHost.split(':')
      connectFirestoreEmulator(firestore, 'localhost', port)
      console.debug('Firestore emulator connection enabled') // eslint-disable-line no-console
  }<% } %><% if (!includeFirestore) { %>
    if (config.emulators.databaseHost) {
      const [, port] = config.emulators.databaseHost.split(':')
      connectDatabaseEmulator(database, 'localhost', port)
      console.debug('RTDB emulator connection enabled') // eslint-disable-line no-console
    }<% } %>
  }

  return (
    <AuthProvider sdk={auth}><% if (!includeFirestore) { %>
      <DatabaseProvider sdk={database}>
        {children}
      </DatabaseProvider><% } %><% if (includeFirestore) { %>
      <FirestoreProvider sdk={firestore}>
        {children}
      </FirestoreProvider><% } %>
    </AuthProvider>
  )
}

export default FirebaseComponents
