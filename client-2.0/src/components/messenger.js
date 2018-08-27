import React, { Component } from 'react'
import { Transition, transit } from 'react-transition-group'
import AppStore from '../flux/AppStore.js'
import Message from './message.js'
import Socket from '../io/SocketClient.js'
import '../styles/messenger.css'

class Messenger extends Component {

  constructor(props){
    super(props)

    this.state = {
      open: true,
      room: 'Test Room',
      messages: [
        <Message from={'Me'} time={Date.now()} color={'blue'} text={'this is a test'} align={'left'}/>
      ]
    }

    this.toggleChat = this.toggleChat.bind(this)
    this.toggleOnKeyPress = this.toggleOnKeyPress.bind(this)
    this.header = React.createRef()
    this.userInput = React.createRef()
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleNewMessage = this.handleNewMessage.bind(this)

    Socket.on('send_message', this.handleNewMessage)
  }

  componentDidMount() {
    AppStore.addChangeListener('TOGGLE_CHAT', this.toggleChat)
    document.addEventListener("keydown", this.toggleOnKeyPress, false);
  }

  toggleChat() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  toggleOnKeyPress(event) {
    const { open } = this.state
    if(!open && event.key === 'm') {
      this.toggleChat()
    }
  }

  handleKeyPress(event){
    if(event.key === 'Enter') {
      const { current } = this.userInput
      const { messages } = this.state
      const { value } = current
      current.value = ''
      messages.push( <Message from={'Me'} time={Date.now()} color={'blue'} text={value} align={'left'}/> )
      this.setState({ messages: messages })
      Socket.emit('send_message', value)
    }
  }

  handleNewMessage(msg) {
    const { messages } = this.state
    messages.push(
      <Message from={'Unknown'} time={Date.now()} color={'green'} text={msg} align={'left'} />
    )
    this.setState({
      messages: messages
    })
  }

  render() {
    const { room } = this.state
    const { open } = this.state
    const { messages } = this.state

    return(
      <Transition in={open} timeout={{enter: 0, exit: duration}}  appear={open} unmountOnExit>
        { state => {
            return(
              <div className='messenger-container' style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                <div ref={this.header} className='messenger-header' style={{
                    padding: window.innerHeight * 0.015
                }}>
                  {room}
                  <div className='messenger-close'>
                    <img src={require('../images/close-red-512.png')} alt='close'
                      onClick={this.toggleChat}
                    />
                  </div>
                </div>
                <div className='messenger-body'>
                  {messages}
                </div>
                <div className='messenger-input' onKeyUp={this.handleKeyPress}>
                  <input ref={this.userInput} type='text' name='chat-input' style={{
                      fontSize: window.innerHeight * 0.03,
                  }}/>
                </div>
              </div>
            )
          }
        }
      </Transition>
    )
  }
}

const duration = 400

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  width: window.innerWidth * 0.2,
  height: window.innerHeight
}

const transitionStyles = {
  entering: { height: 0 },
  entered:  { height: window.innerHeight },
  exiting: { height: 0 },
  exited: { height: window.innerHeight }
}

export default Messenger
