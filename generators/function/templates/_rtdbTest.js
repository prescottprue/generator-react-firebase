<% if (functionsV1 && eventType === 'onWrite') { %>import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('<%= camelName %> RTDB Cloud Function (<%= eventType %>)', () => {
  let adminInitStub
  let <%= camelName %>

  before(() => {
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Syntax may change when this issue is addressed
    // [#2](https://github.com/firebase/firebase-functions-test/issues/2)
    <%= camelName %> = functionsTest.wrap(
      require(`${__dirname}/../../index`).<%= camelName %>
    )
    /* eslint-enable global-require */
  })

  after(() => {
    adminInitStub.restore()
    functionsTest.cleanup()
  })

  it('handles event', async () => {
    const databaseStub = sinon.stub()
    const refStub = sinon.stub()
    const removeStub = sinon.stub()

    refStub.withArgs(refParam).returns({ remove: removeStub })
    removeStub.returns(Promise.resolve({ ref: 'new_ref' }))
    databaseStub.returns({ ref: refStub })
    sinon.stub(admin, 'database').get(() => databaseStub)
    const snap = {
      val: () => null
    }
    const fakeContext = {
      params: { filePath: 'testing', userId: 1 }
    }

    const res = await <%= camelName %>({ after: snap }, fakeContext)
    expect(res).to.be.null
  })
})<% } else if (functionsV1 && eventType !== 'onWrite') { %>import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('<%= camelName %> RTDB Cloud Function (<%= eventType %>)', () => {
  let adminInitStub
  let <%= camelName %>

  before(() => {
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Syntax may change when this issue is addressed
    // [#2](https://github.com/firebase/firebase-functions-test/issues/2)
    <%= camelName %> = functionsTest.wrap(
      require(`${__dirname}/../../index`).<%= camelName %>
    )
    /* eslint-enable global-require */
  })

  after(() => {
    adminInitStub.restore()
    functionsTest.cleanup()
  })

  it('handles event', async () => {
    const databaseStub = sinon.stub()
    const refStub = sinon.stub()
    const removeStub = sinon.stub()

    refStub.withArgs(refParam).returns({ remove: removeStub })
    removeStub.returns(Promise.resolve({ ref: 'new_ref' }))
    databaseStub.returns({ ref: refStub })
    sinon.stub(admin, 'database').get(() => databaseStub)
    const snap = {
      val: () => null
    }
    const fakeContext = {
      params: { filePath: 'testing', userId: 1 }
    }

    const res = await <%= camelName %>(snap , fakeContext)
    expect(res).to.be.null
  })
})<% } else { %>describe('<%= camelName %> RTDB Cloud Function (RTDB:<%= eventType %>)', () => {
  let myFunctions
  let configStub
  let adminInitStub
  let <%= camelName %>
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
    const result = await myFunctions.<%= camelName %>(fakeEvent)
    expect(result).to.exist
  })
})<% } %>
