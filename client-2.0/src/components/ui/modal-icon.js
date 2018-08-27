import React, { Component, Fragment } from 'react'
import AppActions from '../../flux/AppActions.js'
import '../../styles/modal.css'

const ModalIcon = (props) => {

    return(
        <div onClick={handleClick} name={props.name} className='modal-item'>
          <img src={props.img}/>
        </div>
    )

    function handleClick(){
      if(props.event != undefined)
        AppActions.modalButtonPressed(props.event, 'Test Button Press')

      if(props.handleClick != undefined)
        props.handleClick()
    }
}

export default ModalIcon
