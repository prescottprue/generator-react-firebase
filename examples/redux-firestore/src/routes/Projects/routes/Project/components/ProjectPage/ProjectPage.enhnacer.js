import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

export default compose(
  firebaseConnect(({ params }) => ([
    { path: `projects/${params.projectname}` }
  ])),
  connect(({ firebase: { data } }, { params }) => ({
    project: getVal(data, `projects/${params.projectname}`)
  })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project']),
)
