import path from 'path'
import rimraf from 'rimraf'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const formName = 'TestForm'
const folderPath = `src/components/${name}Form`

describe('generator-react-firebase:form', () => {
  describe('with styles in styles.js file', () => {
    before(async () => {
      await helpers
        .run(path.join(__dirname, '../../generators/form'))
        .withArguments([name])
        .inDir(testPath)
        .withPrompts({
          addStyle: true,
          styleType: 'localized'
        })
        .toPromise()
    })

    describe('index file', () => {
      it('is copied', () => {
        return checkForEachFile(
          [createFilePath(`${folderPath}/index.js`)],
          folderPath
        )
      })
      it.skip('has correct content', () => {
        const fileStr = `import ${formName} from './${formName}'\n\
      import enhance from './${formName}.enhancer'\n\n\
      export default enhance(${formName})`
        assert.fileContent(`${folderPath}/index.js`, fileStr)
      })
    })

    describe('component file', () => {
      const filePath = `${folderPath}/${formName}.js`
      it('is copied', () => {
        return checkForEachFile([createFilePath(filePath)], folderPath)
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('styles.js file', () => {
      it.skip('is copied', () => {
        return checkForEachFile(
          [createFilePath(`${folderPath}/${formName}.styles.js`)],
          folderPath
        )
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })

  describe('with styles in scss file', () => {
    before(async () => {
      await helpers
        .run(path.join(__dirname, '../../generators/form'))
        .withArguments([name])
        .inDir(testPath)
        .withPrompts({
          addStyle: true,
          styleType: 1
        })
        .toPromise()
    })

    describe('index file', () => {
      it('is copied', () => {
        checkForEachFile([createFilePath(`${folderPath}/index.js`)], folderPath)
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
        return checkForEachFile([createFilePath(filePath)], folderPath)
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('scss file', () => {
      it.skip('is copied', () => {
        return checkForEachFile(
          [createFilePath(`${folderPath}/${formName}.scss`)],
          folderPath
        )
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })

  describe('without style', () => {
    before(async () => {
      await helpers
        .run(path.join(__dirname, '../../generators/form'))
        .withArguments([name])
        .inDir(testPath)
        .withPrompts({
          addStyle: false
        })
        .toPromise()
    })

    describe('index file', () => {
      it('is copied', () => {
        checkForEachFile([createFilePath(`${folderPath}/index.js`)], folderPath)
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
        return checkForEachFile([createFilePath(filePath)], folderPath)
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('styles file', () => {
      it('is not copied', () => {
        assert.noFile(`${folderPath}/${formName}.scss`)
        assert.noFile(`${folderPath}/${formName}.styles.js`)
      })
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })
})
