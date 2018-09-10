import Repository from '../Repository.mjs'

const TABLE_NAME = 'canvas'

class CanvasRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new CanvasRepository()
