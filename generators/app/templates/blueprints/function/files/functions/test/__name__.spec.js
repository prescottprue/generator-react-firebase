describe('<%= pascalEntityName %> Cloud Function', () => {
  var myFunctions, configStub, adminInitStub, functions, admin;

  before(() => {
    // Since index.js makes calls to functions.config and admin.initializeApp at the top of the file,
    // we need to stub both of these functions before requiring index.js. This is because the
    // functions will be executed as a part of the require process.
    // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
    admin =  require('firebase-admin');
    adminInitStub = sinon.stub(admin, 'initializeApp');
    // Next we stub functions.config(). Normally config values are loaded from Cloud Runtime Config;
    // here we'll just provide some fake values for firebase.databaseURL and firebase.storageBucket
    // so that an error is not thrown during admin.initializeApp's parameter check
    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns({
        firebase: {
          databaseURL: 'https://not-a-project.firebaseio.com',
          storageBucket: 'not-a-project.appspot.com',
        }
        // You can stub any other config values needed by your functions here, for example:
        // foo: 'bar'
      });
    // Now we can require index.js and save the exports inside a namespace called myFunctions.
    // This includes our cloud functions, which can now be accessed at myFunctions.makeUppercase
    // and myFunctions.addMessage
    myFunctions = require('../index');
  });

  after(() => {
    // Restoring our stubs to the original methods.
    configStub.restore();
    adminInitStub.restore();
  });

  it('should do things', () => {
    const fakeEvent = {
      // The DeltaSnapshot constructor is used by the Functions SDK to transform a raw event from
      // your database into an object with utility functions such as .val().
      // Its signature is: DeltaSnapshot(app: firebase.app.App, adminApp: firebase.app.App,
      // data: any, delta: any, path?: string);
      // We can pass null for the first 2 parameters. The data parameter represents the state of
      // the database item before the event, while the delta parameter represents the change that
      // occured to cause the event to fire. The last parameter is the database path, which we are
      // not making use of in this test. So we will omit it.
      data: new functions.database.DeltaSnapshot(null, null, null, 'input'),
      // To mock a database delete event:
      // data: new functions.database.DeltaSnapshot(null, null, 'old_data', null)
    };

    const childParam = 'uppercase';
    const setParam = 'INPUT';
    // Stubs are objects that fake and/or record function calls.
    // These are excellent for verifying that functions have been called and to validate the
    // parameters passed to those functions.
    const refStub = sinon.stub();
    const childStub = sinon.stub();
    const setStub = sinon.stub();
    // The following 4 lines override the behavior of event.data.ref.parent.child('uppercase')
    // .set('INPUT') to return true
    Object.defineProperty(fakeEvent.data, 'ref', { get: refStub });
    refStub.returns({ parent: { child: childStub}});
    childStub.withArgs(childParam).returns( { set: setStub });
    setStub.withArgs(setParam).returns(true);
    return assert.eventually.equal(myFunctions.makeUppercase(fakeEvent), true);
  })
})
