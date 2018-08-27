import AppDispatcher from './AppDispatcher'
import { EventEmitter } from 'events'

var _activeModal = {}

class AppStore extends EventEmitter {

  constructor() {
    super()
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this))
  }

  emitChange(eventName) {
    this.emit(eventName)
  }

  getModal(){
    return _activeModal
  }

  dispatcherCallback(action) {

    console.log(action.actionType)
    
    switch (action.actionType) {
      case 'SET_MODAL':
        this.setModal(action.value)
        break
    }

    this.emitChange(action.actionType)
    return true
  }

  setModal(modal) {
    _activeModal = modal
  }

  addChangeListener(eventName, callback) {
    this.on(eventName, callback)
  }

  removeChangeListener(eventName, callback) {
    this.removeListener(eventName, callback)
  }
}

export default new AppStore()
