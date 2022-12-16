import React from 'react'
import { Card } from 'antd'
import {useHMSActions,selectCameraStreamByPeerID,useHMSStore} from '@100mslive/react-sdk'


function VideoTile(props) {
    const {peer, isLocal} = props

    const hmsActions = useHMSActions();
    const videoRef = React.useRef(null)
    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id))

    React.useEffect(()=>{

        (async () => {

            console.log(videoRef.current);
            console.log(videoTrack);
            if(videoRef.current && videoTrack){
                if(videoTrack.enabled){
                    await hmsActions.attachVideo(videoTrack.id,videoRef.current);
                }else{
                    await hmsActions.detachVideo(videoTrack.id,videoRef.current);
                }
            }

        })();
    },[hmsActions, videoTrack, videoRef])


  return (
    <>
        <Card>
            <video
            ref={videoRef}
            autoPlay={true}  
            playsInline
            muted={true}          
            className={`object-cover h-40 w-40 rounded-lg mt-12 shadow-lg" ${
                isLocal ? "mirror" : ""
              }`}
            ></video>
            <div>
                <label>{peer.name}</label>
            </div>
        </Card>

    </>
  )
}

export default VideoTile