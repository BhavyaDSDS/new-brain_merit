import {
    BankOutlined,
    MoreOutlined,
    ArrowUpOutlined,
    ShareAltOutlined,
    StarOutlined,
    WarningOutlined,


} from '@ant-design/icons';
import { Avatar, Card, Dropdown, Button, Menu, Tooltip, Typography } from 'antd';
import React from 'react';
import { Player } from "video-react";

import 'video-react/dist/video-react.css';
const { Meta } = Card;
const { Text } = Typography;

function VideoFeedCard({video}) {

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <p>
                            <Text type="danger" >{<WarningOutlined />}{" "} Report</Text>

                        </p>
                    ),
                },

            ]}
        />
    );


    return (
        <>

            <Card style={{ marginBottom: "24px" }} >
                <Meta
                    avatar={<Avatar shape="square" size={54} icon={<BankOutlined />} />}
                    title={video.title}
                    description={<Text type="secondary" style={{ fontSize: "90%" }}> {video.sub_title} </Text>}
                    style={{ marginBottom: "15px" }} />
                    <Player>
                        <source src={video.src}/>
                    </Player>
                <br />
                <div>
                    <Tooltip title="Upvote">
                        <Button style={{ marginRight: 15 }}>
                            <ArrowUpOutlined key="upvote" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Bookmark">
                        <Button style={{ marginRight: 15 }}>
                            <StarOutlined key="Bookmark" />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Share">
                        <Button style={{ marginRight: 15 }} >
                            <ShareAltOutlined key="share" />
                        </Button>
                    </Tooltip>

                    <Dropdown
                        overlay={menu}
                        placement="top"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <Button
                            style={{
                                float: "right",
                            }}
                        >
                            <MoreOutlined key="more" />
                        </Button>
                    </Dropdown>
                </div>
            </Card>

        </>
    );
};

export default VideoFeedCard;