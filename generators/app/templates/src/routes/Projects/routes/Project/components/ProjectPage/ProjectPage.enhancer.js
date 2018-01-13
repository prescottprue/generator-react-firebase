import { compose } from 'redux'
import { connect } from 'react-redux'
<% if (includeRedux && includeFirestore) { %>import { firestoreConnect, getVal } from 'react-redux-firebase'<% } %><% if (!includeFirestore) { %>import { firebaseConnect, getVal } from 'react-redux-firebase'<% } %>
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,<% if (includeFirestore) { %>
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firestoreConnect(({ params, uid }) => [
    // Listener for projects the current user created
    {
      collection: 'projects',
      where: ['createdBy', '==', uid]
    }
  ]),
  spinnerWhileLoading(['firestore']),
  // // Map projects from state to props
  connect(({ firestore: { data } }, { params }) => ({<% } %><% if (!includeFirestore) { %>firebaseConnect(({ params }) => [{ path: `projects/${params.projectname}` }]),
  connect(({ firebase: { data } }, { params }) => ({<% } %>
    project: getVal(data, `projects/${params.projectname}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
