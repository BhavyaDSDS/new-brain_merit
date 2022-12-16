import React, {useState} from 'react'
import { Card, Button, Form, Input, Row, Col, Space } from "antd";
import {useHMSStore,selectHMSMessages,useHMSActions} from "@100mslive/react-sdk"
import Chat from './Chat';


function ChatSection() {

    const hmsActions = useHMSActions();
    const storeMessages = useHMSStore(selectHMSMessages);
    const [chatInput, setChatInput] = useState('');


    const sendMessage = () => {
     hmsActions.sendBroadcastMessage(chatInput);
        setChatInput("")
    }


  return (
    <div>
        <Card style={{width:"227px",height:"400px",marginTop:"5px"}}>
        {storeMessages.map((message) => (
            <Chat key={message.id} msg={message} />
          ))}
        </Card>
        <Input 
        placeholder='Enter here...'
        value={chatInput}
        type='text'
        onKeyPress={(event) => {
            if(event.key === 'Enter'){
                if(!event.shiftKey){
                    event.preventDefault();
                    if(chatInput.trim() !== ''){
                        sendMessage();
                    }
                }
            }
        }}
        onChange={(e) => {setChatInput(e.target.value)}}
        />
                   
    </div>
  )
}

export default ChatSection