import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'<% if (includeRedux && includeFirestore) { %>
import { reduxFirestore } from 'redux-firestore'<% } %>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'<% if (includeRedux && includeFirestore) { %>
import 'firebase/firestore'<% } %><% if (includeMessaging) { %>
import 'firebase/messaging'
import { initializeMessaging } from 'utils/firebaseMessaging'<% } %><% if (includeAnalytics) { %>
import { setAnalyticsUser } from 'utils/analytics'<% } %>
import makeRootReducer from './reducers'
import {
  firebase as fbConfig,
  reduxFirebase as rrfConfig,
  env
} from '../config'

export default (initialState = {}) => {
  // ======================================================
  // Redux + Firebase Config (react-redux-firebase & redux-firestore)
  // ======================================================
  const defaultRRFConfig = {
    userProfile: 'users', // root that user profiles are written to
    updateProfileOnLogin: false, // enable/disable updating of profile on login
    presence: 'presence', // list currently online users under "presence" path in RTDB
    sessions: null, // Skip storing of sessions
    enableLogging: false<% if((includeRedux && includeFirestore) || includeMessaging || includeAnalytics) { %>,<% } %> // enable/disable Firebase Database Logging<% if (includeRedux && includeFirestore) { %>
    useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
    useFirestoreForStorageMeta: true<% } %><% if(includeRedux && includeFirestore && (includeMessaging || includeAnalytics)) { %>,<% } %><% if (includeRedux && includeFirestore) { %> // Metadata associated with storage file uploads goes to Firestore<% } %>
    <% if (includeMessaging && !includeAnalytics) { %>onAuthStateChanged: (auth, firebase, dispatch) => {
      if (auth) {
        // Initalize messaging with dispatch
        initializeMessaging(dispatch)
      }
    }<% } %><% if (includeMessaging && includeAnalytics) { %>onAuthStateChanged: (auth, firebase, dispatch) => {
      if (auth) {
        // Set auth within analytics
        setAnalyticsUser(auth)
        // Initalize messaging with dispatch
        initializeMessaging(dispatch)
      }
    }<% } %><% if (!includeMessaging && includeAnalytics) { %>onAuthStateChanged: (auth, firebase, dispatch) => {
      if (auth) {
        // Set auth within analytics
        setAnalyticsUser(auth)
      }
    }<% } %><% if (!includeMessaging && !includeAnalytics) { %>// profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile<% } %>
  }

  // Combine default config with overrides if they exist (set within .firebaserc)
  const combinedConfig = rrfConfig
    ? { ...defaultRRFConfig, ...rrfConfig }
    : defaultRRFConfig

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  if (env === 'local') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Firebase Initialization
  // ======================================================
  firebase.initializeApp(fbConfig)<% if (includeRedux && includeFirestore) { %>
  firebase.firestore().settings({ timestampsInSnapshots: true })<% } %>

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),<% if (includeRedux && includeFirestore) { %>
      reduxFirestore(firebase),<% } %>
      reactReduxFirebase(firebase, combinedConfig),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
