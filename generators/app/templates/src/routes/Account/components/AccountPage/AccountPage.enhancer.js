<% if (includeRedux) { %>import { compose } from 'redux'
import { connect } from 'react-redux'
<% } %>import { withHandlers } from 'recompose'<% if (includeRedux) { %>
import { withFirebase } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'<% } %>

export default compose(
  <% if (includeRedux) { %>UserIsAuthenticated, // redirect to /login if user is not authenticated
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    profile,
    avatarUrl: profile.avatarUrl
  })),
  spinnerWhileLoading(['profile']),<% } %>
  withHandlers({
    updateAccount: ({ firebase }) => newAccount =>
      firebase.updateProfile(newAccount)
  })
)
