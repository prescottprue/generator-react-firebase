const glob = require('glob')
const path = require('path')
const admin = require('firebase-admin')

// Initialize firebase-admin so it is available within functions
try {
  admin.initializeApp()
} catch (err) {
  /* istanbul ignore next: not called in tests */
  console.error(
    'Caught error initializing default firebase-admin app instance:',
    err
  )
}

// Load all folders within dist directory (mirrors layout of src)
const files = glob.sync('./dist/**/index.js', {
  cwd: __dirname,
  ignore: ['./node_modules/**', './dist/utils/**', './dist/constants/**']
})

// Load only files associated with the current function if FUNCTION_NAME env
// variable exists - Done to help improve function cold start times.
files.forEach((functionFile) => {
  // Get folder name from file name (removing any dashes)
  const folderName = path
    .basename(path.dirname(functionFile))
    .replace(/[-]/g, '')

  // Load single function from default export of function folder's index file
  !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === folderName // eslint-disable-line no-unused-expressions
    ? (exports[folderName] = require(functionFile).default) // eslint-disable-line global-require
    : () => {}
})
