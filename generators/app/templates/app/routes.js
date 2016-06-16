import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import {
    App,
    Home,
    About,
    Account,
    Login,
    Signup,
    NotFound,
    Cars
  } from './containers'
<% if (answers.includeRedux) { %>export default (history) => (
  <Router history={ history }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='login' component={ Login }/>
      <Route path='signup' component={ Signup }/>
      <Route path='about' component={ About } />
      <Route path='account' component={ Account } />
      <Route path='cars' component={ Cars } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>
)<% } %><% if (!answers.includeRedux) { %>export default () => (
  <Router history={ browserHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='login' component={ Login }/>
      <Route path='signup' component={ Signup }/>
      <Route path='about' component={ About } />
      <Route path='account' component={ Account } />
      <Route path='cars' component={ Cars } />
      <Route path='*' component={ NotFound } />
    </Route>
  </Router>
)<% } %>
