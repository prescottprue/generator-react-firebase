import { compose } from 'redux'
import { withHandlers } from 'recompose'
import { withNotifications } from 'modules/notification'

export default compose(
  withNotifications,
  withHandlers({

  })
)
