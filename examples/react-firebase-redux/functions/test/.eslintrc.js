module.exports = {
  extends: '../.eslintrc.js',
    env: {
    mocha: true
  },
  globals: {
    sinon: true,
    functionsTest: true
  },
  rules: {
    'no-console': 0,
    'import/no-dynamic-require': 0,
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0
  }
}