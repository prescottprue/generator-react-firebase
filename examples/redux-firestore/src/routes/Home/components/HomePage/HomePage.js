import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { ACCOUNT_PATH, LIST_PATH } from 'constants/paths'
import styles from './HomePage.styles'

const reactRouterUrl = 'https://github.com/ReactTraining/react-router'

const useStyles = makeStyles(styles)

function Home() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h3" gutterBottom>
        Home Page
      </Typography>
      <Paper>
        <Grid container justify="center">
          <Grid item xs className={classes.section}>
            <Typography variant="h6" gutterBottom>
              Routing
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Redirecting and route protection done using:
            </Typography>
            <div>
              <span>
                <a
                  href={reactRouterUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  react-router
                </a>
              </span>
              <span> and </span>
              <a
                href="https://github.com/mjrussell/redux-auth-wrapper"
                target="_blank"
                rel="noopener noreferrer">
                redux-auth-wrapper
              </a>
            </div>
          </Grid>
          <Grid item xs className={classes.section}>
            <Typography variant="h6" gutterBottom>
              Auth
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              User is redirected to <pre>/login</pre> if not authenticated and
              trying to vist:
            </Typography>
            <ul>
              <li>
                <Link to={LIST_PATH}>Projects</Link>
              </li>
              <li>
                <Link to={ACCOUNT_PATH}>Account</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs className={classes.section}>
            <Typography variant="h6" gutterBottom>
              Forms
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              User is redirected to <pre>/login</pre> if not authenticated and
              trying to vist:
            </Typography>
            <div>
              <span>
                <a
                  href="https://react-hook-form.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  react-hook-form
                </a>
              </span>
            </div>
            <span>The following routes use react-hook-form:</span>
            <Link to={LIST_PATH}>
              <p>Projects</p>
            </Link>
            <Link to={ACCOUNT_PATH}>
              <p>Account Page</p>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Home
