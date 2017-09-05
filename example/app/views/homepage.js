import html from 'choo/html'

export default function(state, emit) {
  return html`
    <div>
      <p>Count: <strong style="color: red">${state.counter.count * 1}</strong></p>
      <p><button type="button" onclick=${e => emit('count')}>Increment!</button>
    </div>
  `
}
