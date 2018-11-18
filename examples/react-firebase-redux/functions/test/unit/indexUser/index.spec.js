import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('indexUser RTDB Cloud Function (onWrite)', () => {
  let adminInitStub
  let indexUser

  before(() => {
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    indexUser = functionsTest.wrap(
      require(`${__dirname}/../../index`).indexUser
    )
    /* eslint-enable global-require */
  })

  after(() => {
    adminInitStub.restore()
    functionsTest.cleanup()
    // admin.database = oldDatabase;
  })

  describe('displayName removed', () => {
    it('exists if displayName was deleted', async () => {
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

      const res = await indexUser({ after: snap }, fakeContext)
      expect(res).to.be.null
    })

    it('throws for errors removing name from index', async () => {
      const databaseStub = sinon.stub()
      const refStub = sinon.stub()
      const removeStub = sinon.stub()

      refStub.withArgs(refParam).returns({ remove: removeStub })
      removeStub.returns(Promise.reject('error')) // eslint-disable-line prefer-promise-reject-errors
      databaseStub.returns({ ref: refStub })
      sinon.stub(admin, 'database').get(() => databaseStub)
      const snap = {
        val: () => null
      }
      const fakeContext = {
        params: { filePath: 'testing', userId: 1 }
      }
      try {
        await indexUser({ after: snap }, fakeContext)
      } catch (err) {
        expect(err).to.equal('error')
      }
    })
  })

  describe('displayName changed', () => {
    it('Indexes User within users_public/{userId}', async () => {
      const databaseStub = sinon.stub()
      const refStub = sinon.stub()
      const updateStub = sinon.stub()

      refStub.withArgs(refParam).returns({ update: updateStub })
      updateStub.returns(Promise.resolve({ ref: 'new_ref' }))
      databaseStub.returns({ ref: refStub })
      sinon.stub(admin, 'database').get(() => databaseStub)

      const before = {
        val: () => ({ displayName: 'some' })
      }
      const after = {
        val: () => ({ displayName: 'other' })
      }
      const fakeContext = {
        params: { filePath: 'testing', userId: 1 }
      }
      const res = await indexUser({ before, after }, fakeContext)
      expect(res).to.be.null
    })

    it('throws if error updating index with displayName', async () => {
      const databaseStub = sinon.stub()
      const refStub = sinon.stub()
      const updateStub = sinon.stub()

      refStub.withArgs(refParam).returns({ update: updateStub })
      updateStub.returns(Promise.reject('error')) // eslint-disable-line prefer-promise-reject-errors
      databaseStub.returns({ ref: refStub })
      sinon.stub(admin, 'database').get(() => databaseStub)

      const after = {
        val: () => ({ displayName: 'other' })
      }
      const fakeContext = {
        params: { filePath: 'testing', userId: 1 }
      }
      try {
        await indexUser({ after }, fakeContext)
      } catch (err) {
        expect(err).to.equal('error')
      }
    })
  })

  it('exists if displayName did not change', async () => {
    const databaseStub = sinon.stub()
    const refStub = sinon.stub()
    const updateStub = sinon.stub()

    refStub.withArgs(refParam).returns({ update: updateStub })
    updateStub.returns(Promise.resolve({ ref: 'new_ref' }))
    databaseStub.returns({ ref: refStub })
    sinon.stub(admin, 'database').get(() => databaseStub)

    const snap = {
      val: () => ({ displayName: 'some' })
    }
    const fakeContext = {
      params: { filePath: 'testing', userId: 1 }
    }

    const res = await indexUser({ before: snap, after: snap }, fakeContext)
    expect(res).to.be.null
  })
})
