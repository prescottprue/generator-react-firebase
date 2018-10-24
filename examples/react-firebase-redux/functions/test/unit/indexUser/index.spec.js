import * as admin from 'firebase-admin'

describe('indexUser RTDB Cloud Function (onWrite)', () => {
  let adminInitStub
  let indexUser
  let updateStub
  let deleteStub
  let docStub
  let collectionStub

  beforeEach(() => {
    updateStub = sinon.stub().returns(Promise.resolve({}))
    deleteStub = sinon.stub().returns(Promise.resolve({}))
    docStub = sinon.stub().returns({ update: updateStub, delete: deleteStub })
    collectionStub = sinon
      .stub()
      .returns({ add: sinon.stub().returns(Promise.resolve({})), doc: docStub })
    // Apply stubs as admin.firestore()
    const firestoreStub = sinon
      .stub()
      .returns({ doc: docStub, collection: collectionStub })
    sinon.stub(admin, 'firestore').get(() => firestoreStub)
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Set GCLOUD_PROJECT to env
    process.env.GCLOUD_PROJECT = 'test'
    indexUser = functionsTest.wrap(
      require(`${__dirname}/../../../index`).indexUser
    )
    /* eslint-enable global-require */
  })

  afterEach(() => {
    adminInitStub.restore()
    functionsTest.cleanup()
    process.env.GCLOUD_PROJECT = undefined
  })

  it('removes user when user profile is being deleted', async () => {
    const res = await indexUser({ after: { exists: false } })
    expect(res).to.equal(null)
  })

  it('exits with null if display name did not change', async () => {
    const res = await indexUser({
      after: { exists: true, data: () => ({ displayName: 'asdf' }) },
      before: { exists: true, data: () => ({ displayName: 'asdf' }) }
    })
    expect(res).to.be.null
  })

  it('updates profile with new displayName if changed', async () => {
    const afterData = { displayName: 'fdas' }
    const res = await indexUser({
      after: { exists: true, data: () => afterData },
      before: { exists: true, data: () => ({ displayName: 'asdf' }) }
    })
    expect(res).to.equal(afterData)
  })
})
