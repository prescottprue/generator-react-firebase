import React from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import SetupMessaging from 'components/SetupMessaging'
import SetupFirestore from 'components/SetupFirestore'
import SetupAnalytics from 'components/SetupAnalytics'
import createRoutes from './routes'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
  appId: process.env.REACT_APP_FIREBASE_appId
}

// Enable Real Time Database emulator if environment variable is set
if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
  firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`
  console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`) // eslint-disable-line no-console
}

function App() {
  const routes = createRoutes()
  return (
    <ThemeProvider>
      <FirebaseAppProvider
        firebaseConfig={firebaseConfig}
        suspense
        initPerformance>
        <NotificationsProvider>
          <>
            <Router>{routes}</Router>
            <SuspenseWithPerf traceId="setup-firestore">
              <SetupFirestore />
            </SuspenseWithPerf>
            <SuspenseWithPerf traceId="setup-messaging">
              <SetupMessaging />
            </SuspenseWithPerf>
            <SuspenseWithPerf traceId="setup-analytics">
              <SetupAnalytics />
            </SuspenseWithPerf>
          </>
        </NotificationsProvider>
      </FirebaseAppProvider>
    </ThemeProvider>
  )
}

export default App
