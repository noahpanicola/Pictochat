import Repository from '../Repository.mjs'

const TABLE_NAME = 'user'

class UserRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new UserRepository()
