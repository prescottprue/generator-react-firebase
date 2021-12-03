import { useEffect } from 'react'
import config from 'config'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { useFirebaseApp, useAnalytics, useUser, AuthProvider, DatabaseProvider } from 'reactfire'
import { version } from '../../../package.json'

function FirebaseComponents({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const database = getDatabase(app)


  // Enable Real Time Database emulator if environment variable is set
  if (config.emulators) {
    const { authHost, databaseHost } = config.emulators
    // Set up emulators
    if (config.emulators.authHost) {
      connectAuthEmulator(auth, `http://${config.emulators.authHost}`)
      console.debug('Auth emulator connection enabled') // eslint-disable-line no-console
  }
    if (config.emulators.databaseHost) {
      const [, port] = config.emulators.databaseHost.split(':')
      connectDatabaseEmulator(database, 'localhost', port)
      console.debug('RTDB emulator connection enabled') // eslint-disable-line no-console
    }
  }

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        {children}
      </DatabaseProvider>
    </AuthProvider>
  )
}

export default FirebaseComponents
