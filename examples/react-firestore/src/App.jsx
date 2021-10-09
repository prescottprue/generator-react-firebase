import React from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import FirebaseComponents from 'components/FirebaseComponents'
// import SetupMessaging from 'components/SetupMessaging'
// import SetupFirestore from 'components/SetupFirestore'
// import SetupAnalytics from 'components/SetupAnalytics'
import createRoutes from './routes'



function App() {
  const routes = createRoutes()

  return (
    <ThemeProvider>
      <FirebaseAppProvider
        firebaseConfig={config.firebase}
        suspense>
        <FirebaseComponents>
          <NotificationsProvider>
            <Router>{routes}</Router>
          </NotificationsProvider>
        </FirebaseComponents>
      </FirebaseAppProvider>
    </ThemeProvider>
  )
}

export default App
