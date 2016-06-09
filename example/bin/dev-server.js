'use strict';

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('../webpack-dev.config');
var express = require('express');
var proxy = require('proxy-middleware');
var renderIndex = require('../lib/render-index');
var url = require('url');

var indexMarkup = renderIndex({dev: true});

var app = express();

app.use(
  '/' + config.publicPath,
  proxy(url.parse('http://localhost:' + config.webpackPort + '/' + config.publicPath))
);

app.get('/*', function(req, res) {
  res.send(indexMarkup);
});

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: {colors: true}
});

server.listen(config.webpackPort, function(err) {
  if (err) { return console.log(err); }
  app.listen(config.port, function(err) {
    if (err) { return console.log(err); }
    console.log('Listening at http://0.0.0.0:%d', config.port);
  });
});
