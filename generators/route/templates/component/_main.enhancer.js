import { compose } from 'redux'
import { connect } from 'react-redux'
import { <% if (usingFirestore) { %>firestoreConnect<% } %><% if (!usingFirestore) { %>firebaseConnect<% } %> } from 'react-redux-firebase'<% if (styleType === 'localized') { %>
import { withStyles } from '@material-ui/core/styles'
import styles from './<%= componentName %>.styles'<% } %>

export default compose(
  // create listener for <%= lowerName %>, results go into redux
  <% if (!usingFirestore) { %>firebaseConnect([{ path: '<%= lowerName %>' }]), <% } %><% if (usingFirestore) { %>firestoreConnect([{ collection: '<%= lowerName %>' }]),<% } %>
  // map redux state to props
  connect(({ <% if (usingFirestore) { %>firestore<% } else { %>firebase<% } %>: { data } }) => ({
    <%= lowerName %>: data.<%= lowerName %>
  }))<% if (styleType === 'localized') { %>,
  withStyles(styles)<% } %>
)
