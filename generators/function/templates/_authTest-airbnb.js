describe('<%= camelName %> Storage Cloud Function', () => {
  let myFunctions;
  let configStub;
  let adminInitStub;
  let functions;
  let admin;

  before(() => {
    /* eslint-disable global-require */
    admin = require('firebase-admin');
    // Stub Firebase's admin.initializeApp
    adminInitStub = sinon.stub(admin, 'initializeApp');
    // Stub Firebase's functions.config()
    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns({
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
        projectId: 'not-a-project.appspot',
        messagingSenderId: '823357791673',
      },
      // Stub any other config values needed by your functions here
    });
    myFunctions = require('../../index');
    /* eslint-enable global-require */
  });

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore();
    adminInitStub.restore();
  });

  it('invokes successfully', () => {
    // Invoke auth function with fake request + response objects
    return myFunctions.<%= camelName %>({});
  });
});
