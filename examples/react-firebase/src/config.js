/*
 NOTE: This file is ignored from git tracking. In a CI environment, it is
 generated using build/create-config.js by calling npm run create-config. This
 is done so that environment specific settings can be applied.
 */
// Config for firebase
export const firebase = {
  apiKey: '',
  authDomain: 'react-redux-firebase.firebaseapp.com',
  databaseURL: 'https://react-redux-firebase.firebaseio.com',
  storageBucket: 'react-redux-firebase.appspot.com'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
