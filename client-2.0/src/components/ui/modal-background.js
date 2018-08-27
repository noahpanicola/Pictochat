import React from 'react'
import '../../styles/modal.css'

const ModalBackground = (props) => {
    return(
      <div style={props.style} className='modal-background' onClick={props.handleClose}></div>
    )
}

/*
 * In case we want a close button on the modal
 */
/*
<div onClick={close} className='modal-close-btn'>
  <img src={require('../../images/close-red-512.png')}/>
</div>
*/

export default ModalBackground
