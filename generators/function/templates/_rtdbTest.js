describe('<%= camelName %> RTDB Cloud Function', () => {
  let myFunctions
  let configStub
  let adminInitStub
  let indexUser
  let functions
  let admin

  before(() => {
    /* eslint-disable global-require */
    admin = require('firebase-admin')
    // Stub Firebase's admin.initializeApp
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Stub Firebase's functions.config()
    functions = require('firebase-functions')
    configStub = sinon.stub(functions, 'config').returns({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
        projectId: 'not-a-project.appspot',
        messagingSenderId: '823357791673'
      }
      // You can stub any other config values needed by your functions here
    })
    myFunctions = require(`../../index`)
    /* eslint-enable global-require */
  })

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore()
    adminInitStub.restore()
  })

  it('invokes successfully', async () => {
    const fakeEvent = {
      data: new functions.database.DeltaSnapshot(
        adminInitStub,
        adminInitStub,
        null,
        { some: 'thing' }, // data object
        'requests/fileToDb/123ABC'
      )
    }
    // Invoke with fake event object
    const result = await myFunctions.indexUser(fakeEvent)
    expect(result).to.exist
  describe('Indexes User', () => {
    it('by placing data within users_public', () => {
      const fakeEvent = {
        // The DeltaSnapshot constructor is used by the Functions SDK to transform a raw event from
        // your database into an object with utility functions such as .val().
        // Its signature is: DeltaSnapshot(app: firebase.app.App, adminApp: firebase.app.App,
        // data: any, delta: any, path?: string);
        // We can pass null for the first 2 parameters. The data parameter represents the state of
        // the database item before the event, while the delta parameter represents the change that
        // occured to cause the event to fire. The last parameter is the database path, which we are
        // not making use of in this test. So we will omit it.
        data: new functions.database.DeltaSnapshot(
          adminInitStub,
          adminInitStub,
          null,
          { filePath: 'testing' },
          'requests/fileToDb/123ABC'
        )
      }
      // Invoke webhook with our fake request and response objects. This will cause the
      // assertions in the response object to be evaluated.
      myFunctions.indexUser(fakeEvent)
    })
  })
})
