import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/components/${name}`
var testPath = path.join(__dirname, 'temp2');
const createFilePath = (name) => path.join(__dirname, 'temp2', folderPath, name)

describe('generator-react-firebase:component', () => {
  beforeEach(function (done) {
    var self = this
    helpers.run(path.join(__dirname, '../../generators/component'))
      .withArguments([ name ])
      .inDir(testPath)
      .withPrompts({ includeStyles: true })
      .on('end', done)
  })

  describe('index file', () => {
    it('is copied', () => {
      checkForEachFile([ createFilePath('index.js') ], testPath)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })

  describe('js file', () => {
    it('is copied', () => {
      return checkForEachFile([ createFilePath(`${name}.js`)  ], testPath)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })
  describe('scss file', () => {
    it('is copied', () => {
      return checkForEachFile([ createFilePath(`${name}.scss`) ], testPath)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/Test/Test.js', //)
    // })
  })
})
