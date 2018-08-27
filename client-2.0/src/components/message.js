import React from 'react'

const Message = (props) => {

  if(props == undefined) {
    console.log('Must define props in Message: from, time, text, color')
    throw new Error('Invalid properties in Message')
  }

  const { from } = props
  const { time } = props
  const { text } = props
  const { color } = props
  const { align } = props

  return(
    <div className='chat-message'>
      <div className='chat-message-from'>
        {from}
      </div>
      <div className='chat-message-text' style={{
          background: color,
          color: 'white',
          width: 'auto',
          float: align
      }}>
        { text }
      </div>
    </div>
  )
}

export default Message
