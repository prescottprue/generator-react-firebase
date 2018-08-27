describe('<%= camelName %> PubSub Cloud Function', () => {
  let myFunctions
  let configStub
  let adminInitStub
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
      // Stub any other config values needed by your functions here
    })
    myFunctions = require(`../../index`)
    /* eslint-enable global-require */
  })

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore()
    adminInitStub.restore()
  })

  it('responds with hello message when sent an empty request', done => {
    const req = {}
    // Parameters of request can also be stubbed
    // const req = { query: { text: 'input' } }
    // A fake response object, with a stubbed end function which asserts that
    // it is called with a hello message
    const res = {
      end: (msg) => {
        expect(msg).to.equal('Hello from <%= name %>!')
        done()
      }
    }
    // Invoke https function with fake request + response objects
    myFunctions.<%= camelName %>(req, res)
  })
})
