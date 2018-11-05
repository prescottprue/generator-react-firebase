import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/messaging'
import makeRootReducer from './reducers'
import { initializeMessaging } from 'utils/firebaseMessaging'
import { setAnalyticsUser } from 'utils/analytics'
import { firebase as fbConfig, reduxFirebase as rrfConfig } from '../config'
import { version } from '../../package.json'

export default (initialState = {}) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  // if (__DEV__) {
  //   const devToolsExtension = window.devToolsExtension
  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension())
  //   }
  // }

  const defaultRRFConfig = {
    userProfile: 'users', // root that user profiles are written to
    updateProfileOnLogin: false, // enable/disable updating of profile on login
    presence: 'presence', // list currently online users under "presence" path in RTDB
    sessions: null, // Skip storing of sessions
    enableLogging: false, // enable/disable Firebase Database Logging
    useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
    useFirestoreForStorageMeta: true, // Metadata associated with storage file uploads goes to Firestore
    onAuthStateChanged: (auth, firebase, dispatch) => {
      if (auth) {
        // Set auth within analytics
        setAnalyticsUser(auth)
        // Initalize messaging with dispatch
        initializeMessaging(dispatch)
      }
    }
    // updateProfileOnLogin: false // enable/disable updating of profile on login
    // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
  }

  // Combine default config with overrides if they exist
  const combinedConfig = rrfConfig
    ? { ...defaultRRFConfig, ...rrfConfig }
    : defaultRRFConfig

  // Initialize Firebase
  firebase.initializeApp(fbConfig)
  // Initialize Firestore
  firebase.firestore().settings({ timestampsInSnapshots: true })

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reduxFirestore(firebase),
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
