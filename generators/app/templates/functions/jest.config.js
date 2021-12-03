// jest.config.js
module.exports = {
  verbose: true,<% if(typescriptCloudFunctions) { %>
  preset: 'ts-jest',<% } %>
  testEnvironment: 'node',
  // node-exports-resolver is needed to support firebase-admin v10
  resolver: 'jest-node-exports-resolver',
  setupFilesAfterEnv: ['./scripts/testSetup.<% if(typescriptCloudFunctions) { %>t<% } else { %>j<% } %>s'],
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['./src/**']
}
