const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const srcDir = path.join(rootDir, 'src')

// const debug = console.debug;
const debug = () => {
  return
}

module.exports = {
  /** resolves from test to snapshot path */
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    const result =
      testPath.replace('dist/', 'src/').replace(distDir, rootDir) +
      snapshotExtension
    debug('testPath', testPath, snapshotExtension, result)
    return result
  },

  /** resolves from snapshot to test path */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    const result = snapshotFilePath
      .replace('dist/', 'src/')
      .replace(distDir, rootDir)
      .slice(0, -snapshotExtension.length)
    debug('snapshotFilePath', snapshotFilePath, snapshotExtension, result)
    return result
  }
}
