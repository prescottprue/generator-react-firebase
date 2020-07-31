import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import WarningIcon from '@material-ui/icons/Warning'
import useNotifications from './useNotifications'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    // backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing()
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function Notifications() {
  const classes = useStyles()
  const { allIds, byId, dismissNotification } = useNotifications()
  // Only render if notifications exist
  if (!allIds || !Object.keys(allIds).length) {
    return null
  }

  return (
    <div>
      {allIds.map((id) => {
        const Icon = variantIcon[byId[id].type] || variantIcon.info
        function dismissNotificationById() {
          return dismissNotification(id)
        }
        return (
          <Snackbar
            key={id}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open
            className={classes.snackbar}>
            <SnackbarContent
              className={classes[byId[id].type] || classes.info}
              aria-describedby="client-snackbar"
              message={
                <span
                  id="client-snackbar"
                  data-test="notification-message"
                  className={classes.message}>
                  <Icon className={classes.icon} />
                  {byId[id].message}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={dismissNotificationById}>
                  <CloseIcon className={classes.icon} />
                </IconButton>
              ]}
            />
          </Snackbar>
        )
      })}
    </div>
  )
}

export default Notifications
