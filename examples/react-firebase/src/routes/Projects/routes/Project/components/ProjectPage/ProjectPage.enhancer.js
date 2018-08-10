import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  firebaseConnect(({ params }) => [{ path: `projects/${params.projectId}` }]),
  connect(({ firebase: { data } }, { params }) => ({
    project: get(data, `projects.${params.projectId}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
