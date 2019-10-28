// ======================================================
// Default Redux + Firebase Config used for all environments 
// (for react-redux-firebase & redux-firestore)
// Note: Differs from src/config.js which is environment specific config
// ======================================================
export const defaultRRFConfig = {
  userProfile: 'users', // root that user profiles are written to
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  presence: 'presence', // list currently online users under "presence" path in RTDB
  sessions: null, // Skip storing of sessions
  enableLogging: false<% if((includeRedux && includeFirestore) || includeMessaging || includeAnalytics) { %>,<% } %> // enable/disable Firebase Database Logging<% if (includeRedux && includeFirestore) { %>
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true<% } %><% if(includeRedux && includeFirestore && (includeMessaging || includeAnalytics)) { %>,<% } %><% if (includeRedux && includeFirestore) { %> // Metadata associated with storage file uploads goes to Firestore<% } %>
  <% if (includeMessaging || includeAnalytics || includeSentry || includeErrorHandling) { %>onAuthStateChanged: (auth, firebaseInstance, dispatch) => {
    if (auth) {<% if (includeSentry || includeErrorHandling) { %>
      // Set auth within error handler
      setErrorUser(auth)<% } %><% if (includeMessaging) { %>
      // Initalize messaging with dispatch
      initializeMessaging(dispatch)<% } %><% if (includeAnalytics) { %>
      // Set auth within analytics
      setAnalyticsUser(auth)<% } %>
    }
  }<% } %><% if (!includeMessaging && !includeAnalytics && !includeSentry && !includeErrorHandling) { %>// profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile<% } %>
}
