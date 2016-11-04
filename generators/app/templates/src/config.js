export const firebase = {
  apiKey: '<%= firebaseKey %>',
  authDomain: '<%= firebaseName %>.firebaseapp.com',
  databaseURL: 'https://<%= firebaseName %>.firebaseio.com',
  storageBucket: '<%= firebaseName %>.appspot.com'
}
// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export default { firebase, reduxFirebase }
