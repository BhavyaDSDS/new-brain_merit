import React from 'react'
import { notification } from "antd";


function Notification(props) {
    const {type,message,time,place} = props

        notification[type]({
          message : message,
          duration : time,
          placement : place
        })
    
  return (<></>)
}

export default Notification