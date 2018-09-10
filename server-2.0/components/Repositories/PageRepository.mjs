import Repository from '../Repository.mjs'

const TABLE_NAME = 'page'

class PageRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new PageRepository()
