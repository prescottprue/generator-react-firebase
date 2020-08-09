module.exports = {
  require: [<% if(typescriptCloudFunctions) { %>'ts-node/register'<% } else { %>'@babel/register'<% } %>, './scripts/testSetup<% if(typescriptCloudFunctions) { %>.ts<% } %>'],
  recursive: true
}