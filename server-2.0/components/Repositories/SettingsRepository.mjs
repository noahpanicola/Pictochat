import Repository from '../Repository.mjs'

const TABLE_NAME = 'settings'

class SettingsRepository extends Repository {

  constructor() {
    super(TABLE_NAME)
  }

}

export default new SettingsRepository()
