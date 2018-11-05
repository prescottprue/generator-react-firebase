import React from 'react'
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import NotFoundRoute from './NotFound'
import { Switch, Route, Link } from 'react-router-dom'

export default function createRoutes(store) {
  return (
    <CoreLayout>
      <Switch>
        <Route path="/" exact component={Home.component} />
        <Route path={AccountRoute.path} component={AccountRoute.component} />
        <Route path={ProjectsRoute.path} component={ProjectsRoute.component} />
        <Route path={SignupRoute.path} component={SignupRoute.component} />
        <Route path={LoginRoute.path} component={LoginRoute.component} />
        <Route component={NotFoundRoute.component} />
      </Switch>
    </CoreLayout>
  )
}
