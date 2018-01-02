import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/modules/${name}`

describe('generator-react-firebase:module', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/module'))
      .withArguments(['Test'])
      .withPrompts({
        usingFirestore: true
      })
      .toPromise()
  )

  describe('enhancer.js file', () => {
    checkForEachFile([ `${folderPath}/actionTypes.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('modules/${name}/${name}.js', //)
    // })
  })
  describe('index.js file', () => {
    checkForEachFile([ `${folderPath}/index.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('modules/${name}/${name}.js', //)
    // })
  })
  describe('actions.js file', () => {
    checkForEachFile([ `${folderPath}/actions.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('modules/${name}/${name}.js', //)
    // })
  })
  describe('reducer.js file', () => {
    checkForEachFile([ `${folderPath}/reducer.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('modules/${name}/${name}.js', //)
    // })
  })
})
