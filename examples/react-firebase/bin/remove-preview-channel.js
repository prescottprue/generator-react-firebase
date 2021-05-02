#!/usr/bin/env node

const firebase = require('firebase-tools')
const argv = require('minimist')(process.argv.slice(2))

const project = process.env.GCLOUD_PROJECT

if (!project) {
  console.error('Missing GCLOUD_PROJECT environment variable.')
  process.exit(1)
}

async function getBranchPreviewChannelName() {
  const { channels } = await firebase.hosting.channel.list({
    project,
    site: argv.site
  })
  const selectedPreviewChannel = channels
    .map((previewChannel) => /([^/]+$)/.exec(previewChannel.name)[1])
    .find((previewChannelName) =>
      previewChannelName.startsWith(`pr${argv.pullRequest}`)
    )
  return selectedPreviewChannel
}

async function removePreviewChannel(channelName) {
  console.log(
    `Deleteing preview-channel "${channelName}" for project "${project}"...`
  )
  await firebase.hosting.channel.delete(channelName, {
    project,
    site: argv.site,
    force: true
  })
}

async function run() {
  const channelName = await getBranchPreviewChannelName()
  if (!channelName) {
    console.log('No preview channel found matching the closed PR, exiting')
    return
  }
  await removePreviewChannel(channelName)
  console.log(`Successfully removed preview channel "${channelName}"`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
