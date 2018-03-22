import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

export default compose(
  firestoreConnect([{ collection: '<%= camelEntityName %>' }]),
  connect(({ firebase: { ordered: { <%= camelEntityName %> } } }) => ({
    <%= camelEntityName %>
  }))
)
