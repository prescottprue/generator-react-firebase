import React from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import SetupMessaging from 'components/SetupMessaging'
import createRoutes from './routes'

// Enable Real Time Database emulator if environment variable is set
if (config.firebase.databaseURL.includes('localhost')) {
  console.debug(`RTDB emulator enabled: ${config.firebase.databaseURL}`) // eslint-disable-line no-console
}

function App() {
  const routes = createRoutes()
  return (
    <ThemeProvider>
      <FirebaseAppProvider
        firebaseConfig={config.firebase}
        suspense
        initPerformance>
        <NotificationsProvider>
          <>
            <Router>{routes}</Router>
            <SuspenseWithPerf traceId="setup-messaging">
              <SetupMessaging />
            </SuspenseWithPerf>
          </>
        </NotificationsProvider>
      </FirebaseAppProvider>
    </ThemeProvider>
  )
}

export default App
