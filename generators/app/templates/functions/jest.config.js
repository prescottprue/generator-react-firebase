// jest.config.js
module.exports = {
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./scripts/testSetup.js'],
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['./src/**/*.js']
}
