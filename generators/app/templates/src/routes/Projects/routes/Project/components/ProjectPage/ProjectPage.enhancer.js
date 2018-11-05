import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
<% if (includeRedux && includeFirestore) { %>import { firestoreConnect } from 'react-redux-firebase'<% } %><% if (includeRedux && !includeFirestore) { %>import { firebaseConnect } from 'react-redux-firebase'<% } %>
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { setPropTypes, withProps } from 'recompose'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'
import styles from './ProjectPage.styles'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,<% if (includeRedux && includeFirestore) { %>
  // Create listeners based on current users UID
  firestoreConnect(({ params }) => [
    // Listener for projects the current user created
    {
      collection: 'projects',
      doc: params.projectId
    }
  ]),
  // Map projects from state to props
  connect(({ firestore: { data } }, { params }) => ({<% } %><% if (includeRedux && !includeFirestore) { %>
  firebaseConnect(({ params }) => [{ path: `projects/${params.projectId}` }]),
  connect(({ firebase: { data } }, { params }) => ({<% } %>
    project: get(data, `projects.${params.projectId}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
