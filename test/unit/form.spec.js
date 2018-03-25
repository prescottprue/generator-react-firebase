import path from 'path'
import fs from 'fs-extra'
import rimraf from 'rimraf'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const formName = 'TestForm'
const folderPath = `src/components/${name}Form`

describe('generator-react-firebase:form', () => {
  beforeEach(() =>
    helpers.run(path.join(__dirname, '../../generators/form'))
      .withArguments([ name ])
      .withPrompts()
      .toPromise()
  )

  describe('index file', () => {
    it('is copied', () => {
      checkForEachFile([ createFilePath(`${folderPath}/index.js`) ], folderPath)
    })
    it.skip('has correct content', () => {
      const fileStr = `import ${formName} from './${formName}'\n\
      import enhance from './${formName}.enhancer'\n\n\
      export default enhance(${formName})`
      assert.fileContent(`${folderPath}/index.js`, fileStr)
    })
  })

  describe('js file', () => {
    const filePath = `${folderPath}/${formName}.js`
    it('is copied', () => {
      return checkForEachFile([ createFilePath(filePath)  ], folderPath)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent(filePath,)
    // })
  })

  describe('scss file', () => {
    it('is copied', () => {
      return checkForEachFile([
        createFilePath(`${folderPath}/${formName}.scss`)
      ], folderPath)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/Test/Test.js', //)
    // })
  })
})
