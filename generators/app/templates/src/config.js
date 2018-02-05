/**
 * NOTE: This file is ignored from git tracking. In a CI environment it is
 * generated by firebase-ci or build/create-config.js based on config in
 * .firebaserc (see .travis.yml). This is done so that environment specific
 * settings can be applied.
 */

export const env = 'development'

// Config for firebase
export const firebase = {
  apiKey: '<%= firebaseKey %>',
  authDomain: '<%= firebaseName %>.firebaseapp.com',
  databaseURL: 'https://<%= firebaseName %>.firebaseio.com',
  projectId: "<%= firebaseName %>",
  storageBucket: '<%= firebaseName %>.appspot.com'
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging<% if (includeRedux && includeFirestore) { %>
  useFirestoreForProfile: <% if (includeRedux && includeFirestore) { %>true<% } %><% if (includeRedux && !includeFirestore) { %>false<% } %>, // Save profile to Firestore instead of Real Time Database<% } %>
  // updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export default { env, firebase, reduxFirebase }
