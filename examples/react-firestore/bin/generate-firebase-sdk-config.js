#!/usr/bin/env node

const fsp = require('fs').promises
const firebase = require('firebase-tools')
const argv = require('minimist')(process.argv.slice(2))

const project = process.env.GCLOUD_PROJECT

if (!project) {
  console.error('Missing GCLOUD_PROJECT environment variable.')
  process.exit(1)
}

async function getFirebaseConfig() {
  const apps = await firebase.apps.list('WEB', {
    project
  })
  // NOTE: find is used because displayName is not a supported config option in firebase-tools
  const { appId, platform } = argv.appName
    ? apps.find((appConfig) => appConfig.displayName === argv.appName) || {}
    : apps[0]

  if (!appId) {
    throw new Error('No app found matching the provided app name')
  }

  const { sdkConfig } = await firebase.apps.sdkconfig(platform, appId)
  return sdkConfig
}

async function run() {
  const sdkConfig = await getFirebaseConfig()
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
