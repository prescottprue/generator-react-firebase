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
  }<% if(includeFunctionsTests) { %>,
  overrides: [
    {
      files: ['src/**/*.spec.js'],
      env: {<% if(functionsTestTool === 'mocha') { %>
        mocha: true<% } %><% if(functionsTestTool === 'jest') { %>
        jest: true<% } %>
      },
      globals: {
        functionsTest: true,
        projectId: true,<% if(functionsTestTool === 'mocha') { %>
        expect: true,
        sinon: true<% } %>
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
