module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-react',
    'prettier'
  ],
  plugins: [
    'babel',
    'react',
    'prettier'
  ],
  rules: {
    semi: [
      2,
      'never'
    ],
    'no-console': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false
      }
    ]
  }
}