import React from 'react'
import Theme from 'theme'

import classes from './HomeView.scss'
const authWrapperUrl = 'https://github.com/mjrussell/redux-auth-wrapper'

export const Home = () => (
  <div className={classes.container} style={{ color: Theme.palette.primary2Color }}>
    <h2>Home</h2>
    <p>Projects route is protected using <a href={authWrapperUrl}>redux-auth-wrapper</a></p>
  </div>
)

export default Home
