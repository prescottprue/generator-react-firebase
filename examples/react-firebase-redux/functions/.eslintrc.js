module.exports = {
  'extends': ['../.eslintrc.js',  'plugin:jsdoc/recommended'],
  plugins: ['jsdoc'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    'no-console': 0,
    'jsdoc/newline-after-description': 0
  }
};
