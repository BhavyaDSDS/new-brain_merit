import React from 'react'
import {HMSRoomProvider} from "@100mslive/react-sdk"
import VideoApp from './VideoApp'

function VideoAppRoot() {
  return (
    <HMSRoomProvider>
      <VideoApp />
    </HMSRoomProvider>
  )
}

export default VideoAppRoot  