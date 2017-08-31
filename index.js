var assert = require('assert')

module.exports = function Conductor(Choo) {
  Choo.prototype.layout = function layout(layout) {
    assert.ok(typeof layout === 'function', 'choo.layout should be passed a function')
    assert.equal(layout.length, 3, 'choo.layout should be passed a function with arity of 3')
    this._layout = layout
    return this
  }

  Choo.prototype.routes = function routes(opts) {
    var self = this
    var _routes = Object.keys(opts)
    assert.ok(Object.values(opts).every(function(v){return typeof v === 'function'}),
      'choo.routes values should be a function')
    assert.ok(Object.values(opts).every(function(v){return v.length === 2}),
      'choo.routes values should be a function of arity 2')

    this.use(function(state, emitter) {
      emitter.on('route', handler)
      emitter.on('DOMContentLoaded', handler)

      function handler() {
        var route = _routes.find(function(r) {
          return r === state.route
        })
        if (typeof opts[route].loadData === 'function') {
          opts[route].loadData(state, function(eventName, data) {
            emitter.emit(eventName, data)
          })
        }
      }
    })

    _routes.map(function(key) {
      var view = opts[key]
      self.route(key, function(state, emit) {
        if (self._layout) {
          return self._layout(view, state, emit)
        }
        return view(state, emit)
      })
    })
  }

  return Choo
}
