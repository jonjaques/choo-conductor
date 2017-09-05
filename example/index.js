require('babel-register')()
require('babel-polyfill')

const server = require('./server').default

server.listen(3001, ()=> {
    console.log('listening on 3001')
})
