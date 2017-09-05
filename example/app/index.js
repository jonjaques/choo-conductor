import Choo       from 'choo'
import logger     from 'choo-log'
import requireAll from 'require-all-context'
import Conductor  from '../../' // use 'choo-conductor' in your app

const app = global.__APP__ = Conductor(Choo)()
export default app

var storeContext = require.context('./state')
var stores = requireAll(storeContext)
var viewContext = require.context('./views')
var views = requireAll(viewContext)

app.use(logger())
app.use(stores.counter.default)

app.set('views', ()=> views)
app.set('layout', ()=> views.layout)
app.routes({
  '/': 'homepage'
})

if (global.document) {
  app.mount('#application')
}

if (module.hot) {
  module.hot.accept(viewContext.id, ()=> {
    views = requireAll(require.context('./views'))
    app.emitter.emit('render')
  })
}