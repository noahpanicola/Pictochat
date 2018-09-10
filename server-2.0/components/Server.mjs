import http from 'http'
import express from 'express'
import SocketIO from 'socket.io'

class Server {

  constructor(ports) {
    this.ports = ports
    this.app = express()
    this.router = express.Router()
    this.io = null
    this.server = null
  }

  startSocketListener() {
    const { socketPort } = this.ports
    this.io = SocketIO(http)

    this.io.on('connection', (client) => {
      console.log('client connected...')

      client.on('send_message', function(msg) {
        console.log(msg)
        client.broadcast.emit('send_message', msg)
      })

      client.on('draw', function(pixels) {
        client.broadcast.emit('draw', pixels)
      })
    })

    this.io.listen(socketPort)
    console.log("Starting Socket Listener on port: " + socketPort)
  }

  startApiListener() {
    const { apiPort } = this.ports

    this.server = http.createServer(this.app)

    this.app.use('/', this.router)
    this.server.listen(apiPort)
    console.log("Starting API listener on port: " + apiPort)
  }

  start() {
    this.startSocketListener()
    this.startApiListener()
  }

  getApp() {
    return this.app
  }

  setApp(app) {
    this.app = app
  }

  getRouter() {
    return this.router
  }

  setRouter(router) {
    this.router = router
  }

}

export default new Server({
  apiPort: 8080,
  socketPort: 8000
})
