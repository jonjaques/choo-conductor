# Conductor 👨‍✈️ 🚂🚃🚃🚃

Plugin for Choo that enables a few missing features, aka stuff that I want.

1. Hot reloading for views via Webpack (state/stores coming soon!)
2. Simple application settings API
3. Support for registering views as an object literal
4. Support for loadings views inside a global view
5. Support for loading data inside views via a static `loadData(state, emit)` member which is called on page load and on `route` events (added by PR referenced above)

## Example
*The code shown here are only the relevant snippets. If you want a complete example, checkout the appropriately named folder in this repo.*

### NPM
```
npm i --save choo-conductor@next require-all-context
npm i --save-dev webpack-dev-middleware webpack-hot-middleware
```

### Webpack
```js
{
  entry: [
    'webpack-hot-middleware/client?reload=true',
    // .. your app entrypoint
  ]
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

### Server app
```js
// In app compilation for development.
// Loaded before static middleware, so we
// catch any requests for managed resources
if (process.env.NODE_ENV !== 'production') {
  const webpack            = require('webpack')
  const devMiddleware      = require('webpack-dev-middleware')
  const hotMiddleware      = require('webpack-hot-middleware')
                             // how you require this may differ slightly
  const webpackConfig      = require('../webpackfile')(process.env.NODE_ENV)
  const webpackCompiler    = webpack(webpackConfig)
  app.use(
    devMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath
    }),
    hotMiddleware(webpackCompiler)
  )
}
```

### Choo app
```js
import Choo       from 'choo'
import logger     from 'choo-log'
import Conductor  from 'choo-conductor'
import requireAll from 'require-all-context'

const app = Conductor(Choo)()

var viewContext = require.context('./views')
var views       = requireAll(viewContext)

// app.use middleware like normal
app.set('views', ()=> views) // <- these *must* be functions for hot reloading to work
app.set('layout', ()=> views.layout) // <- must have the signature shown below
app.routes({
  '/': 'homepage'
})

if (module.hot) {
  module.hot.accept(viewContext.id, ()=> {
    // update the views object
    views = requireAll(require.context('./views'))
    app.emitter.emit('render')
  })
}

// mount your app like normal
```

### Layout handler
```js
function layout(view, state, emit) {
  return html`
    <div id="application" style="font-size: 200%">
      <header ... />
      ${view(state, emit)}
      <footer ... />
    </div>
  `
}
```
