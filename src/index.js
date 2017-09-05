import assert from 'assert'

module.exports = Conductor

function Conductor (Choo) {

  Choo.prototype.set = function set(key, val) {
    if (!this._settings) { this._settings = {} }
    this._settings[key] = val
  }

  Choo.prototype.get = function get(key) {
    if (!this._settings) return void 0
    let val = this._settings[key]
    if (typeof val === 'function') {
      return val.bind(this)()
    }
    return val
  }

  Choo.prototype.routes = function routes (opts) {
    const _routes = Object.keys(opts)

    this.use((state, emitter) => {
      emitter.on('route', handler)
      emitter.on('DOMContentLoaded', handler)

      function handler() {
        const route = _routes.find(r => r === state.route)
        if (typeof opts[route].loadData === 'function') {
          opts[route].loadData(state, (eventName, data) => {
            emitter.emit(eventName, data)
          })
        }
      }
    })

    _routes.map(key => {
      const viewKey = opts[key]
      this.route(key, (state, emit) => {
        const views = this.get('views')
        const layout = this.get('layout')
        const view = interopRequireDefault(views[viewKey]).default
        if (layout) {
          return interopRequireDefault(layout).default(view, state, emit)
        }
        return view(state, emit)
      })
    })
  }

  return Choo
}

function interopRequireDefault(obj) { 
  return obj && obj.__esModule ? obj : { default: obj }; 
}
