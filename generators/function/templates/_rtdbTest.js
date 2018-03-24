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
  })
})
