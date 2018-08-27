import React, { Component, Fragment } from 'react'
import Modal from './modal.js'
import AppActions from '../../flux/AppActions.js'
import ModalIcon from './modal-icon.js'
import '../../styles/navigator.css'

class Navigator extends Component {

  constructor(props){
    super(props)
    this.isHidden = true
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleOnEscape = this.toggleOnEscape.bind(this)
    this.getMenuModal = this.getMenuModal.bind(this)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.toggleOnEscape, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.toggleOnEscape, false);
  }

  toggleMenu() {
    if(this.isHidden === true)
      AppActions.setModal(
        this.getMenuModal()
      )
    else AppActions.hideModal()
    this.isHidden = !this.isHidden
  }

  toggleOnEscape(event) {
    if(event.key == 'Escape') this.toggleMenu()
  }

  render() {
    return(
      <Fragment>
        <div className='navigator-bar'>
          <div className='toggle-btn' onClick={this.toggleMenu}>
            <img src={require('../../images/menu-icon-400.png')} alt='Menu' />
          </div>
        </div>
        <Modal handleClose={this.toggleMenu}/>
      </Fragment>
    )
  }

  getMenuModal() {
    return(
      <Fragment>
        <ModalIcon img={require('../../images/ok-512.png')} name={'Save'} event={'SAVE_BOARD'} handleClick={this.toggleMenu} />
        <ModalIcon img={require('../../images/color-icon-256.png')} name={'Color'} event={'CHANGE_BOARD_COLOR'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/user-circle-512.png')} name={'Profile'} event={'OPEN_PROFILE'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/settings-icon-260.png')} name={'Setings'} event={'OPEN_SETTINGS'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/gallery-247.jpg')} name={'Gallery'} event={'OPEN_GALLERY'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/chat-circle-blue-512.png')} name={'Chat'} event={'TOGGLE_CHAT'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/video-icon-512.png')} name={'Video'} event={'TOGGLE_VIDEO'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/audio-on-512.png')} name={'Audio'} event={'TOGGLE_AUDIO'} handleClick={this.toggleMenu}/>
        <ModalIcon img={require('../../images/red-trash-300.png')} name={'Delete'} event={'DELETE_BOARD'} handleClick={this.toggleMenu}/>
      </Fragment>
    )
  }
}

export default Navigator
