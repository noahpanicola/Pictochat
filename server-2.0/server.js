const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http)
const port = 8000

io.on('connection', (client) => {
  console.log('client connected...')

  client.on('send_message', function(msg) {
    console.log(msg)
    client.broadcast.emit('send_message', msg)
  })

  client.on('draw', function(pixels) {
    client.broadcast.emit('draw', pixels)
  })
})

io.listen(port)
console.log('listening on port ', port)
