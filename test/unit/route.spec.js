import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `src/routes/${name}`

describe('generator-react-firebase:route', () => {
  before(async () => {
    await helpers.run(path.join(__dirname, '../../generators/route'))
      .withArguments([name])
      .withPrompts({
        usingFirestore: true,
        includeEnhancer: true
      })
      .toPromise()
  })

  describe('index.js file', () => {
    checkForEachFile([ `${folderPath}/index.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })

  describe('component', () => {
    describe('enhancer.js file, index.js, .scss file and component file', () => {
      checkForEachFile([
        `${folderPath}/components/${name}/${name}.enhancer.js`,
        `${folderPath}/components/${name}/${name}.js`,
        `${folderPath}/components/${name}/index.js`,
        `${folderPath}/components/${name}/${name}.scss`
      ], folderPath)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/${name}/${name}.js', //)
      // })
    })
  })



})
