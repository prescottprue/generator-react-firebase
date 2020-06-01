import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SetupAnalytics from '../components/SetupAnalytics'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'

export default function createRoutes() {
  return (
    <CoreLayout>
      <Switch>
        <Route exact path={Home.path} component={() => <Home.component />} />
        {
          /* Build Route components from routeSettings */
          [
            AccountRoute,
            ProjectsRoute,
            SignupRoute,
            LoginRoute
            /* Add More Routes Here */
          ].map((settings) => (
            <Route key={`Route-${settings.path}`} {...settings} />
          ))
        }
        <Route component={NotFoundRoute.component} />
        <SetupAnalytics />
      </Switch>
    </CoreLayout>
  )
}
