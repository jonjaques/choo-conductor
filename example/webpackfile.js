const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = build('browser')

function build(type = 'browser') {
  return function (env = 'development') {
    console.log('webpack config', env, type)
    let config = {}

    config.devtool = 'source-map'
    config.context = path.resolve('app')
    config.entry = [
      'babel-polyfill', 
      './index.js'
    ]
    config.output = {
      path: path.resolve('public'),
      filename: 'app.js',
      publicPath: '/assets'
    }

    config.externals = {
      jquery: 'jQuery'
    }

    config.module = {
      loaders: [
        {
          loader: 'babel-loader',
          test: /\.jsx?/,
          include: path.resolve('app')
        }
      ]
    }

    config.plugins = [
      new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]

    if (type === 'browser') {
      if (env === 'production') {
        config.plugins.push(new UglifyJSPlugin({ sourceMap: true }))
      } else {
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
        config.entry.unshift('webpack-hot-middleware/client?reload=true')
      }
    }

    if (type === 'server') {
      config.entry = config.entry.slice(1)
      config.output.filename = 'server.js'
      config.output.libraryTarget = 'commonjs2'
      config.target = 'node'
      config.node = false // turns off all mock objects for node stdlib
    }

    return config
  }
}
