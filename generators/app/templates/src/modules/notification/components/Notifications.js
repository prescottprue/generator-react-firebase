import React from 'react'
import PropTypes from 'prop-types'
import { size } from 'lodash'
import { connect } from 'react-redux'
import { pure, compose, renderNothing, branch } from 'recompose'
import Snackbar from 'material-ui/Snackbar'<% if (materialv1) { %>
import IconButton from 'material-ui/IconButton'
import Fade from 'material-ui/transitions/Fade'<% } %>
import CloseIcon from <% if (materialv1) { %>'material-ui-icons/Close'<% } %><% if (!materialv1) { %>'material-ui/svg-icons/navigation/close'<% } %>
import * as actions from '../actions'
const closeIconStyle = { paddingTop: '5px', height: '30px' }

export const Notifications = ({ allIds, byId, dismissNotification }) => (
  <div>
    {allIds.map(id => (
      <% if (materialv1) { %><Snackbar
        key={id}
        open
        transition={Fade}
        action={
          <IconButton onClick={() => dismissNotification(id)}>
            <CloseIcon color="contrast" style={closeIconStyle} />
          </IconButton>
        }
        message={byId[id].message}
      /><% } %><% if (!materialv1) { %><Snackbar
        key={id}
        open
        contentStyle={{ color: 'white' }}
        bodyStyle={{ paddingRight: 0 }}
        action={<CloseIcon color="white" style={closeIconStyle} />}
        onActionTouchTap={() => dismissNotification(id)}
        message={byId[id].message}
      /><% } %>
    ))}
  </div>
)

Notifications.propTypes = {
  allIds: PropTypes.array.isRequired,
  byId: PropTypes.object.isRequired,
  dismissNotification: PropTypes.func.isRequired
}

export default compose(
  pure,
  connect(({ notifications: { allIds, byId } }) => ({ allIds, byId }), actions),
  branch(props => !size(props.allIds), renderNothing) // only render if notifications exist
)(Notifications)
