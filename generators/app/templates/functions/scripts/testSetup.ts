/* eslint-disable no-unused-vars */
import * as admin from 'firebase-admin'<% if (functionsTestTool === 'mocha') { %>
import chai from 'chai'
import sinon from 'sinon'

process.env.NODE_ENV = 'test'<% } %>
const projectId = 'unit-test-project'
const {
  FIREBASE_DATABASE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST = 'localhost:8080'
} = process.env

// Prevents warning from firebase-admin saying that project is being inferred from GCLOUD_PROJECT
process.env.FIREBASE_CONFIG = JSON.stringify({
  databaseURL: `https://${projectId}.firebaseio.com`, // Can not be emulator
  storageBucket: `${projectId}.appspot.com`,
  projectId,
});

;(global as any).projectId = projectId
<% if (functionsTestTool === 'mocha') { %>;(global as any).chai = chai
;(global as any).sinon = sinon
;(global as any).expect = chai.expect
;(global as any).assert = chai.assert
<% } %>
// Initialize admin SDK with emulator settings for RTDB (needed to
// prevent error from initializeApp not being called since it is in index.js)
admin.initializeApp({
  projectId,
  databaseURL: `http://${FIREBASE_DATABASE_EMULATOR_HOST}?ns=${projectId}`,
  credential: admin.credential.applicationDefault()
})

// Initialize Firestore with emulator settings from environment
const [servicePath, portStr] = FIRESTORE_EMULATOR_HOST.split(':')
admin.firestore().settings({
  servicePath,
  port: parseInt(portStr, 10)
})
