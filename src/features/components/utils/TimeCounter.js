import React, { useEffect, useState } from "react";
import { Button,} from "antd";

function TimeCounter(props) {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [disable,setDisable] = useState(true)
 
  const handleSubmit = (e) =>{
        e.preventDefault();
         props.reSend()
        setDisable(true);
        setSeconds(59)
  }
  var timer;
  useEffect(() => {
    timer = setInterval(() => {
        if(disable)
        setSeconds(seconds - 1);
      if (seconds === 0) {
        setDisable(false)
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  },[seconds]);

  return (
    <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
      <p style={{fontSize:20}}>
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </p>
      <Button disabled={disable} onClick={handleSubmit} type='link'
        style={{fontSize:15}}>
        Re-send OTP
      </Button>
    </div>
  );
}

export default TimeCounter;
