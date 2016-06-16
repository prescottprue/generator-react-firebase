'use strict';

var createWebpackConfig = require('./lib/create-webpack-config');

module.exports = createWebpackConfig({
  dev: false,
  entry: ['./lib/index-server'],
  target: 'node',
  outputFilename: 'bundle-server.js',
  outputLibraryTarget: 'umd'
});
