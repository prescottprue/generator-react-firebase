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
      // You can stub any other config values needed by your functions here, for example:
      // foo: 'bar'
    })
    // Now we require index.js and save the exports inside a namespace called myFunctions
    // if we use ../ without dirname here, it can not be run with --prefix from parent folder
    myFunctions = require(`${__dirname}/../../index`)
    mockdatabase.autoFlush()
    mockauth.autoFlush()
    mockfirestore.autoFlush()
    /* eslint-enable global-require */
  })

  afterEach(() => {
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
    try {
      await myFunctions.indexUser(fakeEvent)
    } catch (err) {
      expect(err).to.exist
      expect(
        err.message.indexOf('The project not-a-project.appspot does not exist')
      ).to.not.equal(-1)
    }
  })

  it('returns null if display name is not changed', async () => {
    const fakeEvent = {
      // The DeltaSnapshot constructor is used by the Functions SDK to transform a raw event from
      // your database into an object with utility functions such as .val().
      // Its signature is: DeltaSnapshot(app: firebase.app.App, adminApp: firebase.app.App,
      // data: any, delta: any, path?: string);
      // We can pass null for the first 2 parameters. The data parameter represents the state of
      // the database item before the event, while the delta parameter represents the change that
      // occured to cause the event to fire. The last parameter is the database path, which we are
      // not making use of in this test. So we will omit it.
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
    // Invoke webhook with our fake request and response objects. This will cause the
    // assertions in the response object to be evaluated.
    const res = await myFunctions.indexUser(fakeEvent)
    expect(res).to.be.null
  })
})
