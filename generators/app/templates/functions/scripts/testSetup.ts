/* eslint-disable no-unused-vars */
import functionsTestSetup from 'firebase-functions-test'
import * as admin from 'firebase-admin'<% if (functionsTestTool === 'mocha') { %>
import chai from 'chai'
import sinon from 'sinon'

process.env.NODE_ENV = 'test'<% } %>
const projectId = 'unit-test-project'
const {
  FIREBASE_DATABASE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_HOST = 'localhost:8080'
} = process.env

interface FunctionsTestingResources {
  admin: admin.app.App
  functionsTesting: any
  cleanup: () => Promise<void>
}
/**
 * Create utils useful for firebase-functions tests
 * @returns Utils object containing admin, cleanup, functionsTesting, and wrapper
 */
export function registerFunctionsTesting(): FunctionsTestingResources {
  // Setup firebase-functions-tests to online mode (communicates with emulators)
  const functionsTesting = functionsTestSetup({
    databaseURL: `https://${projectId}.firebaseio.com`, // Can not be emulator
    storageBucket: `${projectId}.appspot.com`,
    projectId,
  });
  // Admin application instance pointed to emulators (removed in cleanup)
  const adminApp = firebaseTesting.initializeAdminApp({
    projectId,
    databaseName: projectId,
  });
  /**
   * Cleanup functionsTesting and adminApp instances
   */
  async function cleanup() {
    functionsTesting.cleanup();
    // Cleanup current app (all remaining apps are also cleared in global afterAll)
    await adminApp.delete();
  }
  return {
    admin: adminApp,
    functionsTesting,
    cleanup,
  };
}

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

/**
 * NOTE: This is global since the setup of the firebase-admin SDK is also global.
 * Global setup is needed since cloud functions are imported from the index of
 * the function folder instead of from the top level (where initializeApp is called)
 */
/* eslint-disable-next-line jest/require-top-level-describe */
afterAll(async () => {
  // Cleanup all apps from firebase-admin (keeps active listeners from preventing JS from exiting)
  await Promise.all(admin.apps.map((app) => app.delete()));
});
