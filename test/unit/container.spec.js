/* global describe before */
import path from 'path'
// import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/containers/${name}`

describe('generator-react-firebase:container', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/container'))
      .withArguments(['Test'])
      .withPrompts({includeStyles: true})
      .toPromise()
  )

  describe('js file', () => {
    checkForEachFile([ `${folderPath}/${name}.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/containers/${name}/${name}.js', //)
    // })
  })
  describe('scss file', () => {
    checkForEachFile([ `${folderPath}/${name}.scss` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/containers/Test/Test.js', //)
    // })
  })
})
