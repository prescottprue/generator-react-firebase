import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { setDisplayName } from 'recompose'
import { UserIsAuthenticated } from 'utils/router'

// Redirect to /login if user is not logged in
export default UserIsAuthenticated
