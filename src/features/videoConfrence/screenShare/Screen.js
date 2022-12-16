import React,{useEffect} from 'react'
import {useHMSActions,useHMSStore,selectScreenShareByPeerID} from '@100mslive/react-sdk'


function Screen(props) {
    const {peer,islocal} = props

    const hmsActions = useHMSActions();
    const screenRef = React.useRef(null);
    const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));

    useEffect(() => {
        (async () => {
          console.log(screenRef.current);
          console.log(screenTrack);
          if (screenRef.current && screenTrack) {
            if (screenTrack.enabled) {
              await hmsActions.attachVideo(screenTrack.id, screenRef.current);
            } else {
              await hmsActions.detachVideo(screenTrack.id, screenRef.current);
            }
          }
        })();
       
      }, [screenTrack, screenRef, hmsActions]);

  return (
    <div>
         <video
            ref={screenRef}
            autoPlay={true}
            playsInline
            muted={false}
            className={`object-cover h-40 w-40 rounded-lg mt-12 shadow-lg" ${
              islocal ? "mirror" : ""
            }`}
          >
          </video>

    </div>
  )
}

export default Screen