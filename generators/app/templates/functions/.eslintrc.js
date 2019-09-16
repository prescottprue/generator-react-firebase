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
    'no-console': 0
  }<% if(includeFunctionsTests) { %>,
  overrides: [
    {
      files: ['src/**/*.spec.js'],
      env: {
        mocha: true
      },
      globals: {
        functionsTest: true,
        expect: true,
        sinon: true
      },
      rules: {
        'no-console': 0,
        'import/no-dynamic-require': 0,
        'no-unused-expressions': 0,
        'import/prefer-default-export': 0
      }
    }
  ]<% } %>
};
