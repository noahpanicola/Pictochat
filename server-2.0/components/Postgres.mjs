import pg from 'pg'

const defaultConfig = {
    user: 'noahpanicola',
    database: 'pictochat',
    password: 'npanic15',
    port: 5432
}

class Postgres {

  constructor(config) {

    if(config != undefined) this.config = config
    else this.config = defaultConfig

    this.client = null
    this.isConnected = false

    this.pool = new pg.Pool(this.config)
    console.log('Database connected...')
  }

  async query(q) {
    const client = await this.pool.connect()
    let response
    try {
      response = await client.query(q)
    } catch(err) {
      console.log(err)
    } finally {
      client.release()
    }
    return response
  }

  setConfig(config) {
    this.config = config
  }

  end(){
    this.pool.end()
  }

}

export default new Postgres()
