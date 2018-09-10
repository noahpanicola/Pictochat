import Database from './Postgres.mjs'
import Server from './Server.mjs'
import SCHEMA from './Schema.mjs'

class Repository {

  constructor(name) {
    this.name = name
    this.addRoute(Server.getRouter())
    this.all = null
    this.one = null
  }

  async findAll() {
    const res = await Database.query('SELECT * FROM ' + SCHEMA + '.' + this.name)
    return res.rows
  }

  async findByID(id) {
    const q = 'SELECT * FROM ' + SCHEMA + '.' + this.name + ' WHERE ' + this.name + 'ID=' + id
    const res = await Database.query(q)
    return res.rows
  }

  async addRoute(router) {
    const name = this.name
    const it = await this.findAll()
    console.log("Registering Route: /" + name)
    router.get('/' + name, function(req, res, next) {
      res.json(it)
    })
  }

  async register(path, query) {
    const router = Server.getRouter()
    const it = await Database.query(query)
    console.log("Registering Route: " + path)
    router.get(path, function(req, res, next) {
      res.json(it)
    })
  }

}

export default Repository
