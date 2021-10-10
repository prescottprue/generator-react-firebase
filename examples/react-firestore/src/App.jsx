import React from 'react'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'config'
import NotificationsProvider from 'modules/notification/NotificationsProvider'
import ThemeProvider from 'modules/theme/ThemeProvider'
import FirebaseComponents from 'components/FirebaseComponents'
import { StyledEngineProvider } from '@mui/material/styles';
// import SetupMessaging from 'components/SetupMessaging'
// import SetupFirestore from 'components/SetupFirestore'
// import SetupAnalytics from 'components/SetupAnalytics'
import createRoutes from './routes'
import theme from './theme'
import { createTheme } from '@mui/material/styles';




function App() {
  const routes = createRoutes()

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>
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
    </StyledEngineProvider>
  );
}

export default App
