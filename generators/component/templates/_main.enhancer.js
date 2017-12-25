import { compose } from 'redux'
import { connect } from 'react-redux'
import { <% if (usingFirestore) { %>firestoreConnect<% } %><% if (!usingFirestore) { %>firebaseConnect<% } %> } from 'react-redux-firebase'

export default compose(
  // create listener for <%= lowerName %>, results go into redux
  <% if (!usingFirestore) { %>firebaseConnect([{ path: '<%= lowerName %>' }]), <% } %><% if (usingFirestore) { %>firestoreConnect([{ collection: '<%= lowerName %>' }]),<% } %>
  // map redux state to props
  connect(({ firebase: { data } }) => ({
    <%= lowerName %>: data.<%= lowerName %>
  }))
)
