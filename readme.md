# Conductor

Dead simple routing 'plugin' for Choo that simplifies views and loads data for you automatically. No dependencies!

Depends on choo PR#553, but you can use `jonjaques/choo#feature/add-route-event` in the meantime.

Currently does two things:
1. Allows you to use a `layout` view which wraps all child views
2. Views can define a `loadData(state, emit)` member which is called on page load and on `route` events (added by PR referenced above)

```js
const app = Conductor(Choo)()

// app.use some stuff
app.layout(layout)
app.routes({
  '/'          : homepage,
  '/todos'     : todoList,
  '/todos/:id' : todoDetail
})
app.mount('#application')

function todoList(state, emit) {
  return html`...`
}

todoList.loadData = function(state, emit) {
  emit('todos.load')
}

function todoDetail(state, emit) {
  return html`...`
}

todoDetail.loadData = function(state, emit) {
  emit('todos.loadDetail', state.params.id)
}

function layout(view, state, emit) {
  return html`
    <div id="global-layout">
      <header />
      ${view(state, emit)}
      <footer />
    </div>
  `
}
```
