import html from 'choo/html'

export default function(view, state, emit) {
  return html`
    <div id="application" style="font-size: 200%">
      <h1>hello, world</h1>
      ${view(state, emit)}
    </div>
  `
}