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
  if (process.env.NODE_ENV !== 'production') {
    // Set up emulators
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(firestore, 'localhost', 8080)
    console.debug('Auth, and RTDB emulators enabled') // eslint-disable-line no-console
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