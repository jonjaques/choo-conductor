const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = [build()]

function build() {
  let config = {}

  config.devtool = 'source-map'
  config.context = path.resolve('src')
  config.entry = {
    index: './index',
    // server: './server',
    // build: './build'
  }

  config.node = false
  config.output = {
    path: path.resolve('.'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  }

  config.externals = [nodeExternals()]

  config.module = {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?/,
        include: path.resolve('src')
      }
    ]
  }

  // for debug
  // config.plugins = [
  //   new webpack.NamedModulesPlugin()
  // ]

  return config
}
