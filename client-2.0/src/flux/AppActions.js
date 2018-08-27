import AppDispatcher from './AppDispatcher';

class AppActions {

    setModal(data) {
      AppDispatcher.dispatch({
          actionType: 'SET_MODAL',
          value: data
      })
    }

    hideModal(data) {
      AppDispatcher.dispatch({
          actionType: 'HIDE_MODAL',
          value: data
      })
    }

    showModal(data) {
      AppDispatcher.dispatch({
          actionType: 'SHOW_MODAL',
          value: data
      })
    }

    modalButtonPressed(eventName, data) {
      AppDispatcher.dispatch({
        actionType: eventName,
        value: data
      })
    }

}

export default new AppActions()
