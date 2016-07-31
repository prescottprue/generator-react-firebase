export const project = {
  name: 'react-firebase-test'
}

export const firebase = {
  userProfile: 'users',
  apiKey: '<%= firebaseKey %>',
  authDomain: '<%= firebaseName %>.firebaseapp.com',
  databaseURL: 'https://<%= firebaseName %>.firebaseio.com',
  storageBucket: '<%= firebaseName %>.appspot.com'
}

export default { firebase }
