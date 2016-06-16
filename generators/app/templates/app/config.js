export const firebase = {
  <% if (answers.includeRedux) { %>url: 'https://something.firebaseapp.com/',
  userFolder: 'users',<% } %> <% if (!answers.includeRedux) { %>apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'<% } %>
}

export default { firebase }
