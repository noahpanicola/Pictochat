import Repository from '../Repository.mjs'

const TABLE_NAME = 'pageobject'

class PageObjectRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new PageObjectRepository()
