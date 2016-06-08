import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-react-firebase:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise()
  )

  it('creates files', () => {
    assert.file([
      'package.json'
    ])
  })
})
