/* eslint-disable no-console, no-use-before-define */

var Express = require('express')
var fs = require('fs')
var path = require('path')
var serveStatic = require('serve-static')

var config = require('../webpack-production.config')

var renderIndex = require('../lib/render-index')
var renderApp = require('../build/bundle-server')

try {
  var stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'stats.json')))
} catch (err) {
  console.log('Error parsing stats file:', err)
}

var app = new Express()

app.use('/' + config.publicPath, serveStatic('assets', {
  index: false,
  setHeaders: function (res) {
    res.setHeader('Cache-Control', 'max-age=2592000')
  }
}))
app.use('/' + config.publicPath, serveStatic(config.output.path, {
  index: false,
  setHeaders: function (res) {
    res.setHeader('Cache-Control', 'max-age=2592000')
  }
}))

// This is fired every time the server side receives a request
app.use(handleRender)

const useStatic = true // Enabled to use static rendering instead of react server-side rendering

function handleRender (req, res) {
  if (useStatic) {
    return res.send(renderIndex({
      hash: stats.hash
    }))
  }
  if (typeof renderApp !== 'function') {
    console.log('Server side rendering not working. Enabled static rendering.')
  }
  try {
    renderApp(req.url, function (result) {
      res.send(renderIndex({
        hash: stats.hash,
        appData: result.appData,
        appMarkup: result.appMarkup
      }))
    })
  } catch (err) {
    console.log('Server side rendering not working. Enabled static rendering.')
    res.send('Server side rendering not working. Enabled static rendering.')
  }
}

app.listen(config.port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on port ${config.port}`)
  }
})
