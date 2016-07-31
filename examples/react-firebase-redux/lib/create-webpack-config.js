'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const buildPath = 'build'
const publicPath = 'assets'
const port = process.env.PORT || 3000
const webpackPort = process.env.WEBPACK_PORT || 3001

function createWebpackConfig (options) {
  if (!options) { options = {} }

  const devtool = options.dev ? 'eval-source-map' : 'sourcemap'

  var entry = options.entry || [
    './app/index.js'
  ]

  if (options.dev) {
    entry = entry.concat(
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:' + webpackPort
    )
  }

  const output = {
    path: path.resolve(__dirname, '..', buildPath),
    filename: options.outputFilename || (options.dev ? 'bundle.js' : publicPath + '/bundle.[hash].js'),
    publicPath: options.dev
    ? 'http://localhost:' + webpackPort + '/' + publicPath + '/'
    : '/',
    libraryTarget: options.outputLibraryTarget
  }

  var plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/vertx/),
    new ExtractTextPlugin(publicPath + '/style.[hash].css', {allChunks: true})
  ]

  if (options.dev) {
    plugins = plugins.concat(new webpack.HotModuleReplacementPlugin())
  } else {
    plugins = plugins.concat(
      [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
    )
  }

  if (options.target) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          WEBPACK_TARGET: JSON.stringify(options.target)
        }
      })
    ])

    if (options.target === 'node') {
      plugins = plugins.concat(
        new webpack.BannerPlugin('require("source-map-support").install();',
          {raw: true, entryOnly: false}))
    } else {
      plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        function () {
          this.plugin('done', function (stats) {
            fs.writeFileSync(
              path.resolve(__dirname, '..', 'stats.json'),
              JSON.stringify(stats.toJson())
            )
          })
        }
      ])
    }
  }

  if (options.includeHtml) {
    plugins = plugins.concat(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'index.html'),
        filename: 'index.html'
      })
    )
  }

  const resolve = {
    alias: {
      assets: path.resolve(__dirname, '..', 'assets')
    },
    fallback: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js']
  }

  const cssLoaders = [
    'css?root=..',
    'sass?outputStyle=expanded&' +
    'includePaths[]=' + path.resolve(__dirname, 'bower_components')
  ].join('!')

  const loaders = [
    {
      include: [path.join(__dirname, '..', 'app'), path.join(__dirname, '..', 'lib')],
      test: /\.js$/,
      loaders: options.dev
      ? ['react-hot', 'babel']
      : ['babel']
    },
    {
      test: /\.(scss|css)$/,
      loader: options.dev
      ? 'style!' + cssLoaders
      : ExtractTextPlugin.extract(cssLoaders)
    },
    {
      include: [path.join(__dirname, '..', 'app'), path.join(__dirname, '..', 'lib')],
      test: /\.(jpg|png|svg)$/,
      loader: 'url?limit=8192'
    },
    {
      test: /\.json$/,
      loader: 'json'
    }
    // npm i --save-dev url-loader file-loader
    // {
    //   test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
    //   loader: 'url?limit=8192'
    // }
  ]
  return {
    bail: !options.dev,
    devtool: devtool,
    entry: entry,
    output: output,
    plugins: plugins,
    resolve: resolve,
    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules')
    },
    module: { loaders: loaders },
    target: options.target,

    port: port,
    webpackPort: webpackPort,
    buildPath: buildPath,
    publicPath: publicPath
  }
}
module.exports = createWebpackConfig
