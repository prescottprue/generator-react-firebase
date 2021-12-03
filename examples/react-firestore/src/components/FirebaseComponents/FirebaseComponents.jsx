import { useEffect } from 'react'
import config from 'config'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { useFirebaseApp, useAnalytics, useUser, AuthProvider, FirestoreProvider } from 'reactfire'
import { setErrorUser } from 'utils/errorHandler'
import { version } from '../../../package.json'

function FirebaseComponents({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const firestore = getFirestore(app)


  // Enable Real Time Database emulator if environment variable is set
  if (config.emulators) {
    const { authHost, firestoreHost } = config.emulators
    // Set up emulators
    if (config.emulators.authHost) {
      connectAuthEmulator(auth, `http://${config.emulators.authHost}`)
      console.debug('Auth emulator connection enabled') // eslint-disable-line no-console
  }
    if (config.emulators.firestoreHost) {
      const [, port] = config.emulators.firestoreHost.split(':')
      connectFirestoreEmulator(firestore, 'localhost', port)
      console.debug('Firestore emulator connection enabled') // eslint-disable-line no-console
  }
  }

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        {children}
      </FirestoreProvider>
    </AuthProvider>
  )
}

export default FirebaseComponents
