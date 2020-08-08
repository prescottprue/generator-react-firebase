module.exports = {
  require: [<% if(typescriptCloudFunctions) { %>'ts-node/register'<% } else { %>'@babel/register'<% } %>, './scripts/testSetup'],
  recursive: true
}