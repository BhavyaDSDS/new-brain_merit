import React from "react";
import { Card, Button, Form, Input, Row, Col, Space } from "antd";
import {
  useHMSActions,
  useHMSStore,
  selectLocalPeer,
  selectPeers,
  selectIsLocalScreenShared
} from "@100mslive/react-sdk";
import VideoTile from "./VideoTile";
import ControlBar from "./ControlBar";
import ChatSection from "./ChatSection";
import Screen from "./screenShare/Screen";

function Room() {

  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);

 

  return (
    <div>
      <Row>
        <Col span={10}>
          {localPeer && <VideoTile peer={localPeer} islocal={true} />}
        </Col>
        <Col span={10}>
          {peers &&
            peers
              .filter((peer) => !peer.isLocal)
              .map((peer) => {
                return (
                  <>
                    <VideoTile peer={peer} isLocal={false} />
                  </>
                );
              })}
        </Col>
        <Col span={4}>
          <ChatSection />
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <ControlBar />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
        {!isLocalScreenShared ? 
        peers
         .map((peer) => {
           return (
             <>
               <Screen peer={peer} isLocal={false}/>
             </>
           );
         }) : 
        
        null}
        
        </Col>
      </Row>
    </div>
  );
}

export default Room;
