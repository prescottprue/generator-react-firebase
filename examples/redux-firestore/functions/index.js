const glob = require('glob');
const path = require('path');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase so it is available within
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  console.log('Caught error initializing app with functions.config():', e.message || e);
}

// Load all folders within dist directory (mirrors layout of src)
const files = glob.sync('./dist/**/index.js', {
  cwd: __dirname,
  ignore: ['./node_modules/**', './dist/utils/**', './dist/constants'],
});

// Loop over all folders found within dist loading only the relevant function
files.forEach(functionFile => {
  const folderName = path.basename(path.dirname(functionFile)).replace(/[-]/g, '.');
  // Load single function from default
  !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === folderName
    ? (exports[folderName] = require(functionFile).default) // eslint-disable-line global-require
    : () => {};
});
