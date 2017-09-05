export default function counter(state, emitter) {
  const initialState = {count: 0}

  state.counter = initialState

  emitter.on('count', ()=> {
    state.counter.count = state.counter.count + 1
    emitter.emit('render')
  })
}