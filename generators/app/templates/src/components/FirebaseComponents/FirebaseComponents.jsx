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
  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    connectAuthEmulator(auth, 'http://localhost:9099')<% if (includeFirestore) { %>
    connectFirestoreEmulator(firestore, 'localhost', 8080)<% } %><% if (!includeFirestore) { %>
    connectDatabaseEmulator(database, 'localhost', 9000)<% } %>
    console.debug('Auth, and <% if (!includeFirestore) { %>Firestore<% } else { %>RTDB<% } %> emulators enabled') // eslint-disable-line no-console
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
