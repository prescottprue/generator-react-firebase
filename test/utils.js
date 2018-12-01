import assert from 'yeoman-assert'
export function checkForEachFile(files, nameRemove) {
  return describe('creates file', () =>
    files.forEach(item =>
      it(item.replace(nameRemove, ''), () => assert.file([item]))
    ))
}
