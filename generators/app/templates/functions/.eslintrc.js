module.exports = {
  <% if(!typescriptCloudFunctions) { %>extends: ['../.eslintrc.js','plugin:jsdoc/recommended'],<% } %><% if(typescriptCloudFunctions) { %>extends: [
    '../.eslintrc.js',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['node', 'jsdoc', '@typescript-eslint'],<% } %><% if(!typescriptCloudFunctions) { %>
  plugins: ['jsdoc'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },<% } %>
  rules: {
    'no-console': 0,
    'jsdoc/newline-after-description': 0<% if(typescriptCloudFunctions) { %>,
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns-type': 0,
    '@typescript-eslint/no-explicit-any': 0<% } %>
  },
  overrides: [
    <% if(typescriptCloudFunctions) { %>{
      files: ['./index.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }<% if(includeFunctionsTests) { %>,
    {
      files: ['scripts/testSetup.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 0
      }
    }<% } %><% } %><% if(includeFunctionsTests) { %>,
    {
      files: ['src/**/*.spec.<% if(typescriptCloudFunctions) { %>t<% } else { %>j<% } %>s'],
      env: {<% if(functionsTestTool === 'mocha') { %>
        mocha: true<% } %><% if(functionsTestTool === 'jest') { %>
        jest: true<% } %>
      },
      globals: {
        functionsTest: true,
        projectId: true<% if(functionsTestTool === 'mocha') { %>,
        expect: true,
        sinon: true<% } %>
      },
      rules: {
        'no-console': 0,
        'no-unused-expressions': 0,
        'import/no-dynamic-require': 0,
        'import/prefer-default-export': 0
      }
    }<% } %>
  ]
}
