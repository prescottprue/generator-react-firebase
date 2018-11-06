import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('someOther RTDB Cloud Function (onWrite)', () => {
  let adminInitStub
  let someOther

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp')
    /* eslint-disable global-require */
    someOther = functionsTest.wrap(
      require(`${__dirname}/../../../index`).someOther
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

    const res = await someOther({ after: snap }, fakeContext)
    expect(res).to.be.null
  })
})
