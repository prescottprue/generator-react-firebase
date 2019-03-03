import { compose } from 'redux';
import { connect } from 'react-redux';<% if (usingFirestore) { %>
import firestoreConnect from 'react-redux-firebase/lib/firestoreConnect';<% } else { %>
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect';<% } %><% if (styleType === 'localized') { %>
import { withStyles } from '@material-ui/core/styles';
import styles from './<%= componentName %>.styles';<% } %>

export default compose(
  // create listener for <%= camelName %>, results go into redux
  <% if (!usingFirestore) { %>firebaseConnect([{ path: '<%= camelName %>' }]), <% } %><% if (usingFirestore) { %>firestoreConnect([{ collection: '<%= camelName %>' }]),<% } %>
  // map redux state to props
  connect(({ <% if (usingFirestore) { %> firestore <% } else { %> firebase <% } %>: { data } }) => ({
    <%= camelName %>: data.<%= camelName %>
  }))<% if (styleType === 'localized') { %>,
  withStyles(styles),<% } %>
)
