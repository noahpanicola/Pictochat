import Repository from '../Repository.mjs'

const TABLE_NAME = 'notebook'

class NotebookRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new NotebookRepository()
