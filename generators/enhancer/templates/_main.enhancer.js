import { compose } from 'redux'
import { connect } from 'react-redux'
import { <% if (usingFirestore) { %>firestoreConnect<% } %><% if (!usingFirestore) { %>firebaseConnect<% } %> } from 'react-redux-firebase'

export default compose(
  // create listener for <%= camelName %>, results go into redux
  <% if (!usingFirestore) { %>firebaseConnect([{ path: '<%= camelName %>' }]),<% } %><% if (usingFirestore) { %>firestoreConnect([{ collection: '<%= camelName %>' }]),<% } %>
  // map redux state to props
  connect(({ <% if (!usingFirestore) { %>firebase<% } else { %>firestore<% } %>: { data } }) => ({
    <%= camelName %>: data.<%= camelName %>
  }))
)
