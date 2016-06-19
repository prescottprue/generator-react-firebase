'use strict'

var fs = require('fs')
var path = require('path')

var indexPath = path.resolve(__dirname, '..', 'index.html')
var indexMarkup = fs.readFileSync(indexPath).toString()

function renderIndex (options) {
  if (!options) { options = {} }

  var appMarkup = options.dev
    ? ''
    : options.appMarkup || ''

  var appData = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(options.appData)}</script>` && ''

  return indexMarkup
    .replace('<!-- app -->', appMarkup)
    .replace('<!-- app-data -->', appData)
    .replace(
      '<!-- script -->',
      options.dev
        ? '<script src="/assets/bundle.js"></script>'
        : '<script src="/assets/bundle.' + options.hash + '.js"></script>')
    .replace(
      '<!-- style -->',
      options.dev
        ? ''
        : '<link rel="stylesheet" href="/assets/style.' + options.hash + '.css" />')
}

module.exports = renderIndex
