module.exports = {
  extends: [
    '../.eslintrc.js',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['node', 'jsdoc', '@typescript-eslint'],
  rules: {
    'no-console': 0,
    'jsdoc/newline-after-description': 0,
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns-type': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  overrides: [
    {
      files: ['./index.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0
      }
    }
  ]
}
