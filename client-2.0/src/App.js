import React, { Component, Fragment } from 'react'
import './styles/App.css'
import Whiteboard from './components/whiteboard.js'
import Navigator from './components/ui/navigator.js'
import Modal from './components/ui/modal.js'
import Messenger from './components/messenger.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Whiteboard lineSize={2} color={'blue'}>
          <Navigator />
        </Whiteboard>
        <Messenger />
      </div>
    )
  }
}

export default App;
