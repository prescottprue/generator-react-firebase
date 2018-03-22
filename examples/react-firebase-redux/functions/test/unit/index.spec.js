/* eslint-disable global-require, no-template-curly-in-string */

describe('Cloud Functions', () => {
  let myFunctions
  let configStub
  let adminInitStub
  let storageFileToRTDB
  let functions
  let admin

  before(() => {
    // Since index.js makes calls to functions.config and admin.initializeApp at the top of the file,
    // we need to stub both of these functions before requiring index.js. This is because the
    // functions will be executed as a part of the require process.
    // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
    admin = require('firebase-admin')
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Next we stub functions.config(). Normally config values are loaded from Cloud Runtime Config;
    // here we'll just provide some fake values for firebase.databaseURL and firebase.storageBucket
    // so that an error is not thrown during admin.initializeApp's parameter check
    functions = require('firebase-functions')
    configStub = sinon.stub(functions, 'config').returns({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
        projectId: 'not-a-project.appspot',
        messagingSenderId: '823357791673'
      },
      algolia: {
        api_key: 'testing',
        app_id: '123'
      }
      // You can stub any other config values needed by your functions here, for example:
      // foo: 'bar'
    })
    // Now we can require index.js and save the exports inside a namespace called myFunctions.
    // This includes our cloud functions, which can now be accessed at myFunctions.asanaWebhook

    // if we use ../ without dirname here, it can not be run with --prefix from parent folder
    myFunctions = require(`../dist`)
    console.log('my functions', myFunctions)
  })

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore()
    adminInitStub.restore()
  })

  it('exports an object', done => {
    expect(myFunctions).to.be.an('object')
  })
})
