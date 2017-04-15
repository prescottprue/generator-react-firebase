import React from 'react'
import Theme from 'theme'

import classes from './Home.scss'
const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'
const reactRouterUrl = 'https://github.com/ReactTraining/react-router'

export const Home = () => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
    <span>Home Route</span>
    <div>
      <h3>
        Routing
      </h3>
      <span>Redirecting and route protection done using:
        <div>
          <span>
            <a href={reactRouterUrl} target='_blank'>
              react-router
            </a>
          </span>
          <span>and</span>
          <a href={authWrapperUrl} target='_blank'>
            redux-auth-wrapper
          </a>
        </div>
      </span>
    </div>
    <div>
      <h4>
        Logged Out
      </h4>
      <span>User is redirected to <pre>'/login'</pre> if not authenticated and trying to vist:</span>
      <ul>
        <li>Projects</li>
        <li>Account</li>
      </ul>
    </div>
    <div>
      <h4>
        Logged In
      </h4>
      <span>User is redirected to <pre>'/projects'</pre> if authenticated and trying to vist:</span>
      <ul>
        <li>Login</li>
        <li>Signup</li>
      </ul>
    </div>
    <div>
      <div>
        <h3>
          Forms
        </h3>
        <span>Redirecting and route protection done using:</span>
        <div>
          <span>
            <a href={reactRouterUrl} target='_blank'>
                redux-form
              </a>
          </span>
        </div>
      </div>
      <span>The following routes use redux-form:</span>
      <p>Account Page</p>
    </div>
  </div>
)

export default Home
