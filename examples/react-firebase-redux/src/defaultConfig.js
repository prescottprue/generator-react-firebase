// ======================================================
// Default Redux + Firebase Config (react-redux-firebase & redux-firestore)
// Note: Differs from src/config.js which is environment specific config
// ======================================================
export const defaultRRFConfig = {
  userProfile: 'users', // root that user profiles are written to
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  presence: 'presence', // list currently online users under "presence" path in RTDB
  sessions: null, // Skip storing of sessions
  enableLogging: false // enable/disable Firebase Database Logging
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}
