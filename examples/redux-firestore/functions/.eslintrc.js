module.exports = {
  'extends': '../.eslintrc.js',
  rules: {
    'no-console': 0
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  overrides: [
    {
      files: ['src/**/*.spec.js'],
      env: {
        mocha: true
      },
      globals: {
        functionsTest: true,
        sinon: true
      },
      rules: {
        'no-console': 0,
        'import/no-dynamic-require': 0,
        'no-unused-expressions': 0,
        'import/prefer-default-export': 0
      }
    }
  ]
};
