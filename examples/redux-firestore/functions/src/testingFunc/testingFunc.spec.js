import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('testingFunc RTDB Cloud Function (onCreate)', () => {
  let adminInitStub
  let testingFunc

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp')
    /* eslint-disable global-require */
    testingFunc = functionsTest.wrap(
      require(`${__dirname}/../../index`).testingFunc
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

    const res = await testingFunc(snap , fakeContext)
    expect(res).to.be.null
  })
})
