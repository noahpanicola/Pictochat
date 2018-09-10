import Server from './components/Server.mjs'

import UserRepository from './components/Repositories/UserRepository.mjs'
import SettingsRepository from './components/Repositories/SettingsRepository.mjs'
import PageRepository from './components/Repositories/PageRepository.mjs'
import PageObjectRepository from './components/Repositories/PageObjectRepository.mjs'
import NotebookRepository from './components/Repositories/NotebookRepository.mjs'
import CanvasRepository from './components/Repositories/CanvasRepository.mjs'

// get the router
const router = Server.getRouter()

// Set the main route for the API
router.get('/', function(req, res, next) {
  res.json({
    vesion: '0.0.0'
  })
})


Server.start()
