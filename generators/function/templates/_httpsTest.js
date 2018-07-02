describe('<%= camelName %> HTTPS Cloud Function', () => {
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

  it('returns hello message when called with empty request', done => {
    // A fake request object, with req.query.text set to 'input'
    const req = {};
     // const req = { query: { text: 'input' } }; // fake parameters of request
    // A fake response object, with a stubbed send function which asserts that it is called
    // with a hello message
    const res = {
      send: (msg) => {
        expect(msg).to.equal('Hello from <%= name %> function!')
        done();
      }
    };
    // Invoke https function with fake request + response objects
    myFunctions.<%= camelName %>(req, res)
  })
})
