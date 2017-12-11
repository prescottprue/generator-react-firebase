import { compose } from 'redux'
import { connect } from 'react-redux'
import { LIST_PATH } from 'constants'
import { withHandlers, withStateHandlers, pure } from 'recompose'
import { firebaseConnect, populate } from 'react-redux-firebase'
import { withNotifications } from 'modules/notification'
import { withRouter, spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

const populates = [
  { child: 'createdBy', root: 'users' }
]

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Map auth uid from state to props
  connect(({ firebase: { auth: { uid } } }) => ({ uid })),
  // Wait for uid to exist before going further
  spinnerWhileLoading(['uid']),
  // Create listeners based on current users UID
  firebaseConnect(({ params, uid }) => ([
    {
      path: 'projects',
      queryParams: ['orderByChild=createdBy', `equalTo=${uid}`],
      populates
    }
  ])),
  connect(({ firebase }, { params }) => ({
    projects: populate(firebase, 'projects', populates)
  })),
  // Show loading spinner while projects and collabProjects are loading
  spinnerWhileLoading(['projects']),
  // Add props.router
  withRouter,
  // Add props.showError and props.showSuccess
  withNotifications,
  // Add state and state handlers as props
  withStateHandlers(
    // Setup initial state
    ({ initialDialogOpen = false }) => ({
      newDialogOpen: initialDialogOpen
    }),
    // Add state handlers as props
    {
      toggleDialog: ({ newDialogOpen }) => () => ({
        newDialogOpen: !newDialogOpen
      })
    }
  ),
  // Add handlers as props
  withHandlers({
    addProject: props => newInstance => {
      const { firebase, uid, showError, showSuccess } = props
      if (!uid) {
        return showError('You must be logged in to create a project')
      }
      return firebase
        .push('projects', {
          ...newInstance,
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => showSuccess('Project added successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add project')
          return Promise.reject(err)
        })
    },
    deleteProject: props => projectId => {
      const { firebase, showError, showSuccess } = props
      return firebase.remove(`projects/${projectId}`)
        .then(() => showSuccess('Project deleted successfully'))
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not delete project')
          return Promise.reject(err)
        })
    },
    goToProject: ({ router }) => projectId => {
      router.push(`${LIST_PATH}/${projectId}`)
    }
  }),
  pure // shallow equals comparison on props (prevent unessesary re-renders)
)
