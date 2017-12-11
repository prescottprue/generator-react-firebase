import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'

export default compose(
  // Create listener for project
  firebaseConnect(({ params }) => [{ path: `projects/${params.projectname}` } ]),
  // Map project from redux state to props
  connect(({ firebase: { data } }, { params }) => ({
    project: getVal(data, `projects/${params.projectname}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
