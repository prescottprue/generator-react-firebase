import React from 'react'
import PropTypes from 'prop-types'
import { size } from 'lodash'
import { connect } from 'react-redux'
import { pure, compose, renderNothing, branch } from 'recompose'<% if (materialv1) { %>
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'<% } else { %>
import Snackbar from 'material-ui/Snackbar'<% } %>
import CloseIcon from <% if (materialv1) { %>'@material-ui/icons/Close'<% } %><% if (!materialv1) { %>'material-ui/svg-icons/navigation/close'<% } %>
import * as actions from '../actions'<% if (materialv1) { %>
import { withStyles } from '@material-ui/core/styles'

const styles = {
  buttonRoot: {
    color: 'white'
  }
}<% } else { %>
const closeIconStyle = { paddingTop: '5px', height: '30px' }<% } %>

export const Notifications = ({<% if (!materialv1) { %> allIds, byId, dismissNotification }) => (<% } else {%>
  allIds,
  byId,
  dismissNotification,
  classes
}) => (<% } %>
  <div>
    {allIds.map(id => (
      <% if (materialv1) { %><Snackbar
        key={id}
        open
        action={
          <IconButton
            onClick={() => dismissNotification(id)}
            classes={{ root: classes.buttonRoot }}>
            <CloseIcon />
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
  byId: PropTypes.object.isRequired,<% if (materialv1) { %>
  classes: PropTypes.object.isRequired,<% } %>
  dismissNotification: PropTypes.func.isRequired
}

export default compose(
  pure,<% if (materialv1) { %>
  withStyles(styles),<% } %>
  connect(({ notifications: { allIds, byId } }) => ({ allIds, byId }), actions),
  branch(props => !size(props.allIds), renderNothing) // only render if notifications exist
)(Notifications)
