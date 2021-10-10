import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles';
import {
  ACCOUNT_PATH,
  LIST_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants/paths'

const reactRouterUrl = 'https://github.com/ReactTraining/react-router'<% if (!includeRedux) { %>
const reactfireUrl = 'https://github.com/FirebaseExtended/reactfire'<% } %>

const Root = styled('div')(({ theme }) => ({
  ...theme.flexColumnCenter,
  padding: theme.spacing(2),
}));


const Section = styled(Grid)(({ theme }) => ({
  ...theme.flexColumnCenter,
  padding: theme.spacing(2),
  textAlign: 'center'
}));


function Home() {
  return (
    <Root>
      <Typography variant="h3" component="h3" gutterBottom>
        Home Page
      </Typography>
      <Paper role="article">
        <Grid container justifyContent="center">
          <Section item xs>
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
              <span> and </span><% if (includeRedux) { %>
              <a
                href="https://github.com/mjrussell/redux-auth-wrapper"
                target="_blank"
                rel="noopener noreferrer">
                redux-auth-wrapper
              </a><% } %><% if (!includeRedux) { %>
              <a
                href={`${reactfireUrl}/blob/master/docs/reference.md#AuthCheck`}
                target="_blank"
                rel="noopener noreferrer">
                reactfire's <pre>AuthCheck</pre>
              </a><% } %>
            </div>
          </Section>
          <Section item xs>
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
          </Section>
          <Section item xs>
            <Typography variant="h6" gutterBottom>
              Forms
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Input validation and context management
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
            <ul>
              <li>
                <Link to={LOGIN_PATH}>Login</Link>
              </li>
              <li>
                <Link to={SIGNUP_PATH}>Signup</Link>
              </li>
              <li>
                <Link to={ACCOUNT_PATH}>Account</Link>
              </li>
            </ul>
          </Section>
        </Grid>
      </Paper>
    </Root>
  )
}

export default Home
