import path from 'path'
import fs from 'fs-extra'
import rimraf from 'rimraf'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/components/${name}`

describe.skip('generator-react-firebase:component', () => {
  before(async () => {
    await helpers.run(path.join(__dirname, '../../generators/component'))
      .withArguments([ name ])
      .inDir(testPath)
      .withPrompts({
        addStyle: true,
        includeEnhancer: false,
        usingFirestore: false
      })
      .toPromise()
  })

  describe('index file', () => {
    it('is copied', () => {
      checkForEachFile([ createFilePath(`${folderPath}/index.js`) ], `${testPath}/`)
    })
    it('has correct content', () => {
      const fileStr = `import ${name} from './${name}'\n\nexport default ${name}`
      assert.fileContent(`${folderPath}/index.js`, fileStr)
    })
  })

  describe('js file', () => {
    const filePath = `${folderPath}/${name}.js`
    it('is copied', () => {
      return checkForEachFile([ createFilePath(filePath)  ], `${testPath}/`)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent(filePath,)
    // })
  })

  describe('scss file', () => {
    it('is copied', () => {
      return checkForEachFile([ createFilePath(`${folderPath}/${name}.scss`) ], `${testPath}/`)
    })
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/Test/Test.js', //)
    // })
  })
})
