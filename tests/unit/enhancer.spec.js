import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/components/${name}`

describe('generator-react-firebase:enhancer', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/enhancer'))
      .withArguments(['Test'])
      .withPrompts({
        usingFirestore: true
      })
      .toPromise()
  )

  describe('enhancer.js file', () => {
    checkForEachFile([ `${folderPath}/${name}.enhancer.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })
  describe('index.js file', () => {
    checkForEachFile([ `${folderPath}/index.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })
})
