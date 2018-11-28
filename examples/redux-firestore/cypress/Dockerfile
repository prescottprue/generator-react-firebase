FROM cypress/base:8

## Build Arguments
# URL which Cypress will run tests against (with default)
ARG test_url=https://redux-firebasev3.firebaseapp.com

# Arguments to add to the cypress run command
ARG test_command_args=""

## Environment Variables
# URL which Cypress will run tests against (defaults to test_url arg)
ENV CYPRESS_baseUrl=$test_url
# Arguments to add to the cypress run command
ENV TEST_ARGS "${test_command_args}"

# Token used to auth firebase-tools for use in seeding/checking Firebase (RTDB + Firestore)
ENV FIREBASE_TOKEN $FIREBASE_TOKEN
# Key used to specifiy job
ENV JOB_RUN_KEY $JOB_RUN_KEY

# Prevent a large number messages during NPM install
ENV npm_config_loglevel warn
# Color logs where possible
ENV TERM xterm

## Copy code into container
### Files
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json cypress.json serviceAccount.json ./

### Directories
COPY public/ /public/
COPY scripts/ /scripts/
COPY cypress/ /cypress/

# Install Dependencies (only those used to build config files)
RUN CYPRESS_INSTALL_BINARY=0 npm install cypress-firebase

# Install Cypress
# Set CI=true to prevent a large number of messages during install of
# dependencies such as Cypress
RUN CI=true npm install cypress

# Verify Cypress Installed correctly
RUN $(npm bin)/cypress verify

# Run Cypress tests (URL set by ENV above) reporting results using Barista Reporter.
# Results are written to test_runs_data/$JOB_RUN_KEY and test_runs_meta/$JOB_RUN_KEY
ENTRYPOINT $(npm bin)/cypress run $TEST_ARGS
