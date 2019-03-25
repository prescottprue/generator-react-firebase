<% if (eventType === 'onCall') { %>import { to } from 'utils/async';

describe('<%= camelName %> HTTPS Callable Cloud Function', () => {
  let <%= name %>;
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
    <%= name %> = require(`./index`).<%= name %>Request;
    /* eslint-enable global-require */
  });

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore();
    adminInitStub.restore();
  });

  it('responds with hello message when sent an empty request', async () => {
    const data = {};
    const context = {};
    // Invoke request handler with fake data + context objects
    const [err, response] = await to(<%= name %>(data, context));
    // Confirm no error is thrown
    expect(err).to.not.exist
    // Confirm response contains message
    expect(response).to.have.property('message', 'Hello World');
  });
});<% } %><% if (eventType !== 'onCall') { %>describe('<%= camelName %> HTTPS Cloud Function', () => {
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
    myFunctions = require(`../../index`);
    /* eslint-enable global-require */
  });

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore();
    adminInitStub.restore();
  });

  it('responds with hello message when sent an empty request', (done) => {
    const req = {};
    // A fake response object, with a stubbed end function which asserts that
    // it is called with a hello message
    const res = {
      end: (msg) => {
        expect(msg).to.equal('Hello from <%= name %>');
        done();
      },
    };
    // Invoke https function with fake request + response objects
    myFunctions.<%= name %> (req, res);
  });
});<% } %>
