#!/usr/bin/env node

const fsp = require('fs').promises
const firebaseTools = require('firebase-tools')
const argv = require('minimist')(process.argv.slice(2))

const project = process.env.GCLOUD_PROJECT

if (!project) {
  console.error('Missing GCLOUD_PROJECT environment variable.')
  process.exit(1)
}

async function getFirebaseWebApp() {
  let apps
  try {
    apps = await firebaseTools.apps.list('WEB', {
      project
    })
  } catch {
    throw new Error(
      `Error getting Firebase config for project "${project}". Confirm you have firebase-tools installed, you have authenticated using "firebase login", and that you currently logged in user has access to the project.`
    )
  }
  // NOTE: find is used because displayName is not a supported config option in firebase-tools
  const { appId, platform } = argv.appName
    ? apps.find((appConfig) => appConfig.displayName === argv.appName) || {}
    : apps[0]

  if (!appId) {
    throw new Error('No app found matching the provided app name')
  }
  return { appId, platform }
}

async function getFirebaseAppConfig() {
  const { platform, appId } = await getFirebaseWebApp()
  const { sdkConfig } = await firebaseTools.apps.sdkconfig(platform, appId)
  return sdkConfig
}

async function run() {
  console.log('Loading Firebase App config for client...')
  const sdkConfig = await getFirebaseAppConfig()
  const content = JSON.stringify({ firebase: sdkConfig }, null, 2)

  if (argv.file) {
    await fsp.writeFile(argv.file, content)
    console.log(`Successfully written Firebase SDK config to ${argv.file}`)
  }
  console.log(content)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
