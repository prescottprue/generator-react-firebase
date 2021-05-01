<% if (!includeFirestore && functionsTestTool == 'mocha') { %>import * as firebaseTesting from '@firebase/rules-unit-testing'
import functionsTestLib from 'firebase-functions-test'<% if (typescriptCloudFunctions) { %>
import { expect } from 'chai'<% } %>
import indexUserOriginal from './index'

const functionsTest = functionsTestLib()
const projectId = 'unit-test-project'
const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PUBLIC_PATH = `users_public/${USER_UID}`
const DISPLAYNAME_PATH = `${USERS_COLLECTION}/${USER_UID}/displayName`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId,
  databaseName: projectId
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userPublicRef = adminApp.database().ref(USER_PUBLIC_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  after(async () => {
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  it('adds user to Firestore on create event', async () => {
    const newDisplayName = 'newname'
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      newDisplayName,
      DISPLAYNAME_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).to.have.property('displayName', newDisplayName)
  })

  it('updates existing user in Firestore on update event', async () => {
    const newDisplayName = 'newname'
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      'initial',
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      newDisplayName,
      DISPLAYNAME_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).to.have.property('displayName', newDisplayName)
  })

  it('removes user from Firestore on delete event', async () => {
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      'initial',
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(null, DISPLAYNAME_PATH)
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).to.be.null
  })
})<% } %><% if (includeFirestore && functionsTestTool == 'mocha') { %>import * as firebaseTesting from '@firebase/rules-unit-testing'
import functionsTestLib from 'firebase-functions-test'<% if (typescriptCloudFunctions) { %>
import { expect } from 'chai'<% } %>
import indexUserOriginal from './index'

const functionsTest = functionsTestLib()
const projectId = 'unit-test-project'
const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const USER_PUBLIC_PATH = `users_public/${USER_UID}`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId,
  databaseName: projectId
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userFirestoreRef = adminApp.firestore().doc(USER_PUBLIC_PATH)

describe('indexUser Firestore Cloud Function (onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({ projectId })
  })

  after(async () => {
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  it('adds user to Firestore on create event', async () => {
    const userData = { displayName: 'some' }
    // Build a Firestore create event object on users path
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).to.have.property(
      'displayName',
      userData.displayName
    )
  })

  it('updates existing user in Firestore on update event', async () => {
    const initialUserData = { displayName: 'initial' }
    const userData = { displayName: 'afterchange' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).to.have.property(
      'displayName',
      userData.displayName
    )
  })

  it('removes user from Firestore on delete event', async () => {
    const userData = { some: 'data' }
    // Build a Firestore create event object on users path
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.exists).to.be.false
    expect(newUserRes.data()).to.be.undefined
  })
})<% } %><% if (!includeFirestore && functionsTestTool == 'jest') { %>import * as firebaseTesting from '@firebase/rules-unit-testing'
import functionsTestLib from 'firebase-functions-test'
import indexUserOriginal from './index'

const functionsTest = functionsTestLib()
const projectId = process.env.GCLOUD_PROJECT || 'unit-test-project'
const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PUBLIC_PATH = `users_public/${USER_UID}`
const DISPLAYNAME_PATH = `${USERS_COLLECTION}/${USER_UID}/displayName`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId,
  databaseName: projectId
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userPublicRef = adminApp.database().ref(USER_PUBLIC_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  afterAll(async () => {
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  test('adds user to Firestore on create event', async () => {
    const newDisplayName = 'newname'
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      newDisplayName,
      DISPLAYNAME_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).toHaveProperty(
      'displayName',
      newDisplayName
    )
  })

  test('updates existing user in Firestore on update event', async () => {
    const newDisplayName = 'newname'
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      'initial',
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      newDisplayName,
      DISPLAYNAME_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).toHaveProperty(
      'displayName',
      newDisplayName
    )
  })

  test('removes user from Firestore on delete event', async () => {
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      'initial',
      DISPLAYNAME_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      null,
      DISPLAYNAME_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userPublicRef.once('value')
    expect(newUserRes.val()).toEqual(null)
  })
})<% } %><% if (includeFirestore && functionsTestTool == 'jest') { %>import * as firebaseTesting from '@firebase/rules-unit-testing'
import functionsTestLib from 'firebase-functions-test'
import indexUserOriginal from './index'

const functionsTest = functionsTestLib()
const projectId = process.env.GCLOUD_PROJECT || 'unit-test-project'
const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const USER_PUBLIC_PATH = `users_public/${USER_UID}`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId,
  databaseName: projectId
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userFirestoreRef = adminApp.firestore().doc(USER_PUBLIC_PATH)

describe('indexUser Firestore Cloud Function (onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({ projectId })
  })

  afterAll(async () => {
    functionsTest.cleanup()
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  test('adds user to Firestore on create event', async () => {
    const userData = { displayName: 'data' }
    // Build a Firstore create event object on user's path
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).toHaveProperty(
      'displayName',
      userData.displayName
    )
  })

  test('updates existing user in Firestore on update event', async () => {
    const initialUserData = { displayName: 'initial' }
    const userData = { displayName: 'afterchange' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      null<% if (typescriptCloudFunctions) { %> as any<% } %>,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).toHaveProperty(
      'displayName',
      userData.displayName
    )
  })

  test('removes user from Firestore on delete event', async () => {
    const userData = { displayName: 'afterchange' }
    // Build a Firstore delete event object on user's path
    const beforeSnap = functionsTest.firestore.makeDocumentSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.firestore.makeDocumentSnapshot(
      null as any,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.exists).toEqual(false)
    expect(newUserRes.data()).toEqual(undefined)
  })
})<% } %>
