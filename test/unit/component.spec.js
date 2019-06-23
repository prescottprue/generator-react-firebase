import path from 'path'
import rimraf from 'rimraf'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
let folderPath = `src/components/${name}`

describe('generator-react-firebase:component', () => {
  describe('Not Include Enhancer', () => {
    before(async () => {
      await helpers
        .run(path.join(__dirname, '../../generators/component'))
        .withArguments([name])
        .inDir(testPath)
        .withPrompts({
          addStyle: true,
          includeEnhancer: false,
          usingFirestore: false
        })
        .toPromise()
    })

    describe('index file', () => {
      checkForEachFile([`${folderPath}/index.js`], `${testPath}/`)
      it('has correct content', () => {
        const fileStr = `import ${name} from './${name}'\n\nexport default ${name}`
        assert.fileContent(`${folderPath}/index.js`, fileStr)
      })
    })

    describe('js file', () => {
      const filePath = `${folderPath}/${name}.js`
      checkForEachFile([filePath], `${testPath}/`)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('scss file', () => {
      checkForEachFile([`${folderPath}/${name}.scss`], `${testPath}/`)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })

  describe('Include Enhancer', () => {
    before(async () => {
      await helpers
        .run(path.join(__dirname, '../../generators/component'))
        .withArguments([name])
        .inDir(testPath)
        .withPrompts({
          addStyle: true,
          includeEnhancer: true,
          usingFirestore: false
        })
        .toPromise()
    })

    describe('index file', () => {
      checkForEachFile([`${folderPath}/index.js`], `${testPath}/`)
      it.skip('has correct content', () => {
        const fileStr = `import ${name} from './${name}'\nimport enhancer from './${name}.enhancer'\n\nexport default enhance(${name})\n`
        console.log('what I am guessing:', JSON.stringify(fileStr))
        console.log('what it is:', JSON.stringify())
        assert.fileContent(`${folderPath}/index.js`, fileStr)
      })
    })

    describe('js file', () => {
      const filePath = `${folderPath}/${name}.js`
      checkForEachFile([filePath], `${testPath}/`)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('scss file', () => {
      checkForEachFile([`${folderPath}/${name}.scss`], `${testPath}/`)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })

  describe('With basePath', () => {
    before(async () => {
      const afterPath = 'routes/Account'
      const afterPath2 = `/components/${name}`
      folderPath = `src/${afterPath}/${afterPath2}`
      await helpers
        .run(path.join(__dirname, '../../generators/component'))
        .withArguments([name, afterPath])
        .inDir(testPath)
        .withPrompts({
          addStyle: true,
          includeEnhancer: true,
          usingFirestore: false
        })
        .toPromise()
    })

    describe('index file', () => {
      const afterPath = 'routes/Account'
      const afterPath2 = `/components/${name}`
      checkForEachFile(
        [`src/${afterPath}/${afterPath2}/index.js`],
        `${testPath}/`
      )
    })

    describe('js file', () => {
      const afterPath = 'routes/Account'
      const afterPath2 = `/components/${name}`
      const filePath = `src/${afterPath}/${afterPath2}/${name}.js`
      checkForEachFile([filePath], `${testPath}/`)
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent(filePath,)
      // })
    })

    describe('scss file', () => {
      const afterPath = 'routes/Account'
      const afterPath2 = `/components/${name}`
      checkForEachFile(
        [`src/${afterPath}/${afterPath2}/${name}.scss`],
        `${testPath}/`
      )
      // TODO: Check that content of file is correct
      // it('has correct content', () => {
      //   assert.fileContent('app/components/Test/Test.js', //)
      // })
    })
  })
})
