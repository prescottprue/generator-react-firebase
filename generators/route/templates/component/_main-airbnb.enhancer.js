import { compose } from 'redux';
import { connect } from 'react-redux';
import { <% if (usingFirestore) { %>firestoreConnect<% } %><% if (!usingFirestore) { %>firebaseConnect<% } %> } from 'react-redux-firebase';<% if (styleType === 'localized') { %>
import { withStyles } from '@material-ui/core/styles';
import styles from './<%= componentName %>.styles';<% } %>

export default compose(
  // create listener for <%= camelName %>, results go into redux
  <% if (!usingFirestore) { %>firebaseConnect([{ path: '<%= camelName %>' }]), <% } %><% if (usingFirestore) { %> firestoreConnect([{ collection: '<%= camelName %>' }]),<% } %>
  // map redux state to props
  connect(({ <% if (usingFirestore) { %> firestore <% } else { %> firebase <% } %>: { data } }) => ({
    <%= camelName %>: data.<%= camelName %>
  }))<% if (styleType === 'localized') { %>,
  withStyles(styles),<% } %>
)
