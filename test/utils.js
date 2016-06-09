/* global describe it */
import assert from 'yeoman-assert'
export function checkForEachFile (files, nameRemove) {
  return describe('creates files', () =>
    files.forEach(item =>
      it(item.replace(nameRemove, ''), () => assert.file([ item ]))
    )
  )
}
