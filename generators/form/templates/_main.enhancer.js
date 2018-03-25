import { compose } from 'redux'
import { connect } from 'react-redux'
import { withHandlers } from 'recompose'

export default compose(
  // Add form capabilities (including submit and validation handling)
  reduxForm({ form: formNames.<%= name %> }),
  // add handlers as props
  withHandlers({

  })
)
