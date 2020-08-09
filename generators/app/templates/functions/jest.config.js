// jest.config.js
module.exports = {
  verbose: true,<% if(typescriptCloudFunctions) { %>
  preset: 'ts-jest',<% } %>
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./scripts/testSetup.<% if(typescriptCloudFunctions) { %>t<% } else { %>j<% } %>s'],
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['./src/**/*.js']
}
