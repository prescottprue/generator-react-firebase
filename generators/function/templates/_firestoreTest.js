<% if (functionsV1 && eventType !== 'onWrite' && eventType !== 'onUpdate') { %>import * as admin from 'firebase-admin'

describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  let adminInitStub
  let <%= camelName %>

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp')
    /* eslint-disable global-require */
    <%= camelName %> = functionsTest.wrap(
      require(`${__dirname}/../../index`).<%= camelName %>
    )
    /* eslint-enable global-require */
  })

  after(() => {
    // Restoring stubs to the original methods
    functionsTest.cleanup()
    adminInitStub.restore()
  })

  it('handles event', async () => {
    // const fakeEvent = functionsTest.firestore.makeDocumentSnapshot({foo: 'bar'}, 'document/path');
    const fakeEvent = functionsTest.firestore.exampleDocumentSnapshot()
    const fakeContext = { params: {} }
    const res = await <%= camelName %>(fakeEvent, fakeContext)
    expect(res).to.be.null
  })
})<% } else if (functionsV1 && (eventType === 'onWrite' || eventType === 'onUpdate')) { %>describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  let <%= camelName %>

  before(() => {
    /* eslint-disable global-require */
    <%= camelName %> = functionsTest.wrap(
      require(`${__dirname}/../../index`).<%= camelName %>
    )
    /* eslint-enable global-require */
  })

  after(() => {
    // Restoring stubs to the original methods
    functionsTest.cleanup()
  })

  it('returns null if display name is not changed', async () => {
    // const fakeEvent = functionsTest.firestore.makeDocumentSnapshot({foo: 'bar'}, 'document/path');
    const fakeEvent = functionsTest.firestore.exampleDocumentSnapshotChange();
    const fakeContext = { params: {} }
    const res = await <%= camelName %>(fakeEvent, fakeContext)
    expect(res).to.be.null
  })
})<% } else { %>import firebasemock from 'firebase-mock'

describe('<%= camelName %> Firestore Cloud Function (<%= eventType %>)', () => {
  let myFunctions
  let configStub
  let adminInitStub
  let functions
  let mockauth
  let mockdatabase
  let mockfirestore

  before(() => {
    let mocksdk = firebasemock.MockFirebaseSdk(
      function() {
        return mockdatabase
      },
      function() {
        return mockauth
      },
      function() {
        return mockfirestore
      }
    )

    let mockapp = mocksdk.initializeApp()
    process.env.GCLOUD_PROJECT = 'FakeProjectId'
    mockdatabase = new firebasemock.MockFirebase()
    mockauth = new firebasemock.MockFirebase()
    mockfirestore = new firebasemock.MockFirestore()
    adminInitStub = sinon.stub(mocksdk, 'initializeApp')

    // Stub functions.config()
    /* eslint-disable global-require */
    functions = require('firebase-functions')
    configStub = sinon.stub(functions, 'config').returns({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
        projectId: 'not-a-project.appspot',
        messagingSenderId: '823357791673'
      }
    })

    myFunctions = require(`${__dirname}/../../index`)
    /* eslint-enable global-require */

    // Set mocks to autoflush (makes restore/flush not nessesary)
    mockdatabase.autoFlush()
    mockauth.autoFlush()
    mockfirestore.autoFlush()
  })

  after(() => {
    // Restoring stubs to the original methods
    configStub.restore()
    adminInitStub.restore()
  })

  it('returns null if display name is not changed', async () => {
    const fakeEvent = {
      data: new firebasemock.DeltaDocumentSnapshot(
        mockapp,
        {
          displayName: 'bob',
          createdTime: new Date() + 50
        },
        {
          displayName: 'bob',
          createdTime: new Date()
        },
        'users/123'
      ),
      params: {
        userId: '123ABC'
      }
    }
    const res = await myFunctions.<%= camelName %>(fakeEvent)
    expect(res).to.be.null
  })
})<% } %>
