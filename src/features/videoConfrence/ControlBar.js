import React from "react";
import { Card, Button, Form, Input, Row, Col, Space } from "antd";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsLocalScreenShared
} from "@100mslive/react-sdk";

function ControlBar() {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);

  const leaveRoom = () => {
    hmsActions.leave();
  };

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const toggleScreen = async () => {
    await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
}

  return (
    <div>
      <Space>
        <Button onClick={leaveRoom}>Leave</Button>
        <Button onClick={toggleAudio}>
          {isLocalAudioEnabled ? "Mute" : "Unmute"}
        </Button>
        <Button onClick={toggleVideo}>
          {isLocalVideoEnabled ? "Hide" : "Unhide"}
        </Button>
        <Button onClick={toggleScreen}>
        {isLocalScreenShared ? "Unshare" : "Share"}
        </Button>
      </Space>
    </div>
  );
}

export default ControlBar;
