import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import {
  ACCOUNT_PATH,
  LIST_PATH,
  LOGIN_PATH,
  SIGNUP_PATH
} from 'constants/paths'

const reactRouterUrl = 'https://github.com/ReactTraining/react-router'
const reactfireUrl = 'https://github.com/FirebaseExtended/reactfire'

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
                <Link
                  href={reactRouterUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  react-router
                </Link>
              </span>
              <span> and </span>
              <Link
                href={`${reactfireUrl}/blob/main/docs/reference/modules/auth.md#usesignincheck`}
                target="_blank"
                rel="noopener noreferrer">
                reactfire's <pre>useSignInCheck</pre>
              </Link>
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
                <Button component={RouterLink} to={LIST_PATH}>Projects</Button>
              </li>
              <li>
                <Button component={RouterLink} to={ACCOUNT_PATH}>Account</Button>
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
                <Link
                  href="https://react-hook-form.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  react-hook-form
                </Link>
              </span>
            </div>
            <span>The following routes use react-hook-form:</span>
            <ul>
              <li>
                <Button component={RouterLink} to={LOGIN_PATH}>Login</Button>
              </li>
              <li>
                <Button component={RouterLink} to={SIGNUP_PATH}>Signup</Button>
              </li>
              <li>
                <Button component={RouterLink} to={ACCOUNT_PATH}>Account</Button>
              </li>
            </ul>
          </Section>
        </Grid>
      </Paper>
    </Root>
  )
}

export default Home
