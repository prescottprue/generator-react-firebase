import { connect } from 'react-redux'
import { withHandlers, compose, withProps, flattenProp<% if (materialv1) { %>, withStateHandlers<% } %> } from 'recompose'
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { ACCOUNT_PATH } from 'constants'
import { withRouter, spinnerWhileLoading } from 'utils/components'

export default compose(
  withFirebase, // add props.firebase (firebaseConnect() can also be used)
  connect(({ firebase: { auth, profile } }) => ({
    auth,
    profile
  })),
  withRouter,
  // Wait for auth to be loaded before going further
  spinnerWhileLoading(['profile']),<% if (materialv1) { %>
  withStateHandlers(({ accountMenuOpenInitially = false }) => ({
    accountMenuOpen: accountMenuOpenInitially,
    anchorEl: null
  }), {
    toggleAccountMenu: ({ accountMenuOpen }) => () => ({
      accountMenuOpen: !accountMenuOpen
    }),
    handleMenu: () => (anchorEl) => ({ anchorEl })
  }),<% } %>
  // Handlers
  withHandlers({
    handleLogout: props => () => {
      props.firebase.logout()
      props.router.push('/')<% if (materialv1) { %>
      props.toggleAccountMenu()<% } %>
    },
    goToAccount: props => () => {
      props.router.push(ACCOUNT_PATH)<% if (materialv1) { %>
      props.toggleAccountMenu()<% } %>
    }
  }),
  withProps(({ auth, profile }) => ({
    authExists: isLoaded(auth) && !isEmpty(auth)
  })),
  // Flatten profile so that avatarUrl and displayName are available
  flattenProp('profile')
)
