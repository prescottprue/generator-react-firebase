module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['react-app', 'prettier'],
  plugins: ['import', 'babel', 'react', 'prettier'],
  settings: {
    react: {
      version: '16.6'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  globals: {
    Raven: false
  },
  rules: {
    semi: [
      2, 'never'
    ],
    'no-console': 'error',
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
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
