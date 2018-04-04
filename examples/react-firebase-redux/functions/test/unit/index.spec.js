import * as admin from 'firebase-admin' // eslint-disable-line no-unused-vars

describe.skip('Cloud Functions', () => {
  let myFunctions
  let adminInitStub
  let admin

  before(() => {
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    myFunctions = require(`${__dirname}/../../index`)
    /* eslint-enable global-require */
  })

  after(() => {
    // Restoring our stubs to the original methods.
    adminInitStub.restore()
  })

  it('exports an object', () => {
    expect(myFunctions).to.be.an('object')
  })
})
