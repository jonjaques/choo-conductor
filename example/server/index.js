import Express            from 'express'
import Path               from 'path'
import compression        from 'compression'
import {json}             from 'body-parser'

const app = Express()
export default app

app.use(compression())
app.use(json())

// In app compilation for development.
// Loaded before static middleware, so we
// catch any requests for managed resources
if (process.env.NODE_ENV !== 'production') {
  const webpack            = require('webpack')
  const devMiddleware      = require('webpack-dev-middleware')
  const hotMiddleware      = require('webpack-hot-middleware')
  const webpackConfig      = require('../webpackfile')(process.env.NODE_ENV)
  const webpackCompiler    = webpack(webpackConfig)
  app.use(
    devMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath
    }),
    hotMiddleware(webpackCompiler)
  )
}

app.use('/assets', 
  Express.static(Path.resolve('public')),
  Express.static(Path.resolve('assets'))
)

app.all('*', (req, res)=> {
  res.sendFile(Path.resolve('index.html'))
})