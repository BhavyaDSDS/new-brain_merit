import React from 'react'
import { useHMSActions,useHMSStore,selectIsConnectedToRoom } from '@100mslive/react-sdk'
import Preview from './Preview'
import Video from './Room';
import getToken from './endPoint/getToken';


function VideoApp() {

  


  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom)

  const handleFinish = async (value) => {    

    const token = await getToken(value.role)
    console.log(token);

    const config = {
      userName: value.name,
      authToken: token, 
      settings: {
          isAudioMuted: true,
          isVideoMuted: false,
      },
      // metaData: JSON.stringify({city: 'Winterfell', knowledge: 'nothing'}),
      rememberDeviceSelection: true,  // remember manual device change
    };

    await hmsActions.join(config)
  }


  return (
    <>
    {isConnected ? <Video/>:<Preview onFinesh={handleFinish} />}
    
    </>
  )
}

export default VideoApp