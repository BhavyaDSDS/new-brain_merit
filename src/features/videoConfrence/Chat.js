import React from 'react'

function Chat({msg}) {
  return (
    <div>
    <b><span>
      {msg.senderName}:
    </span></b> &nbsp;
    <span>{msg.message}</span>
  </div>
  )
}

export default Chat