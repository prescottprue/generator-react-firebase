import firebasemock from 'firebase-mock'

describe('<%= camelName %> Firestore Cloud Function', () => {
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

  it('adds display name if it did not exist before', async () => {
    const fakeEvent = {
      data: new firebasemock.DeltaDocumentSnapshot(
        mockapp,
        null,
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
    // Invoke function with fake event
    const res = await myFunctions.indexUser(fakeEvent)
    expect(res).to.exist
  })
})
