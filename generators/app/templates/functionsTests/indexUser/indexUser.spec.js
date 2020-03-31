<% if (!includeFirestore && functionsTestTool == 'mocha') { %>import * as firebaseTesting from '@firebase/testing'
import indexUserOriginal from './index'

const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const context = {
  params: { userId: USER_UID },
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const publicProfileRef = adminApp.database().ref(USER_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT
    })
  })

  after(async () => {
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebaseTesting.apps().map((app) => app.delete()))
  })

  it('adds info to users_public on create event', async () => {
    const userData = { displayName: 'another' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).to.equal(userData)
  })

  it('updates existing user in RTDB on update event', async () => {
    const initialUserData = { displayName: 'originalName' }
    const userData = { displayName: 'another' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been updated
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).to.equal(userData)
  })

  it('removes user from users_public of RTDB on delete event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).to.be.undefined
  })
})<% } %><% if (includeFirestore && functionsTestTool == 'mocha') { %>import * as firebaseTesting from '@firebase/testing'
import indexUserOriginal from './index'

const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userFirestoreRef = adminApp.firestore().doc(USER_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT
    })
  })

  it('adds user to Firestore on create event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).to.equal(userData)
  })

  it('updates existing user in Firestore on update event', async () => {
    const initialUserData = { username: 'data' }
    const userData = { some: 'data' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).to.equal(userData)
  })

  it('removes user from Firestore on delete event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.exists).to.be.false
    expect(newUserRes.data()).to.be.undefined
  })
})<% } %><% if (!includeFirestore && functionsTestTool == 'jest') { %>import * as firebaseTesting from '@firebase/testing'
import indexUserOriginal from './index'

const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const publicProfileRef = adminApp.database().ref(USER_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT
    })
    // Cleanup all apps (keeps active listeners from preventing JS from exiting)
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  test('adds info to users_public on create event', async () => {
    const userData = { displayName: 'another' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).toEqual(userData)
  })

  test('updates existing user in RTDB on update event', async () => {
    const initialUserData = { displayName: 'originalName' }
    const userData = { displayName: 'another' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been updated
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).toEqual(userData)
  })

  test('removes user from users_public of RTDB on delete event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await publicProfileRef.once('value')
    expect(newUserRes.val()).toEqual(undefined)
  })
})<% } %><% if (includeFirestore && functionsTestTool == 'jest') { %>import * as firebaseTesting from '@firebase/testing'
import indexUserOriginal from './index'

const USER_UID = '123ABC'
const USERS_COLLECTION = 'users'
const USER_PATH = `${USERS_COLLECTION}/${USER_UID}`
const context = {
  params: { userId: USER_UID }
}

const adminApp = firebaseTesting.initializeAdminApp({
  projectId: process.env.GCLOUD_PROJECT,
  databaseName: process.env.GCLOUD_PROJECT
})

const indexUser = functionsTest.wrap(indexUserOriginal)
const userFirestoreRef = adminApp.firestore().doc(USER_PATH)

describe('indexUser RTDB Cloud Function (RTDB:onWrite)', () => {
  beforeEach(async () => {
    // Clean database before each test
    await firebaseTesting.clearFirestoreData({
      projectId: process.env.GCLOUD_PROJECT,
    })
  })

  test('adds user to Firestore on create event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).toEqual(userData)
  })

  test('updates existing user in Firestore on update event', async () => {
    const initialUserData = { username: 'data' }
    const userData = { some: 'data' }
    // Create update snapshot on users collection document with user's id
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      initialUserData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.data()).toEqual(userData)
  })

  test('removes user from Firestore on delete event', async () => {
    const userData = { some: 'data' }
    // Build a RTDB create event object on users path
    const beforeSnap = functionsTest.database.makeDataSnapshot(
      userData,
      USER_PATH
    )
    const afterSnap = functionsTest.database.makeDataSnapshot(null, USER_PATH)
    const changeEvent = { before: beforeSnap, after: afterSnap }
    // Calling wrapped function with fake snap and context
    await indexUser(changeEvent, context)
    // Load data to confirm user has been deleted
    const newUserRes = await userFirestoreRef.get()
    expect(newUserRes.exists).toEqual(false)
    expect(newUserRes.data()).toEqual(undefined)
  })
})<% } %>
