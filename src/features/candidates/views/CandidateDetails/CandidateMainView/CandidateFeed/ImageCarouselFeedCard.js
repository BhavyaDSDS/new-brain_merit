import {
    BankOutlined,
    MoreOutlined,
    ArrowUpOutlined,
    ShareAltOutlined,
    StarOutlined,
    WarningOutlined,
    RightOutlined,
    LeftOutlined,

} from '@ant-design/icons';
import { Avatar, Carousel, Card, Dropdown, Button, Menu, Tooltip, Typography } from 'antd';
import React, { useRef } from 'react';

const { Meta, } = Card;
const { Text } = Typography;
const contentStyle = {
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'block',
    height: '100%',
    margin: 'auto',
    width: '100%',

};
const leftButtonStyle = {
    position: 'absolute',
    left: '2px',
    top: '300px',
    zIndex: "15",
    opacity: "1",
    marginLeft: "30px"
}
const rightButtonStyle = {
    float: "right",
    position: 'absolute',
    right: '2px',
    top: '300px',

    zIndex: "15",
    opacity: "1",
    marginRight: "30px"
}

function ImageCarouselFeedCard({ carousel }) {
    const carousl = useRef();
    const onChange = (a, b, c) => {
        console.log(a, b, c);
    };

    const handleNext = () => carousl.current.next();

    const handlePrev = () => carousl.current.prev();
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
                    title={carousel.title}
                    description={<Text type="secondary" style={{ fontSize: "90%" }}>{carousel.sub_title} </Text>}
                    style={{ marginBottom: "15px" }} />
                <div >
                    <Button type='text' style={leftButtonStyle} onClick={handlePrev} icon={<LeftOutlined style={{ color: 'white' }} />}></Button>

                    <Button type='text' style={rightButtonStyle} onClick={handleNext} icon={<RightOutlined style={{ color: 'white' }} />}></Button>
                </div>
                <Carousel afterChange={onChange} ref={carousl} >

                    <div>
                        <img
                            src={carousel.image1}
                            style={contentStyle}
                        />
                    </div>
                    <div>
                        <img
                            src={carousel.image2}
                            style={contentStyle}
                        />
                    </div>
                    <div>
                        <img
                            src={carousel.image3}
                            style={contentStyle}
                        />
                    </div>
                    <div>
                        <img
                            src={carousel.image4}
                            style={contentStyle}
                        />
                    </div>
                    <div>
                        <img
                            src={carousel.image5}
                            style={contentStyle}
                        />
                    </div>


                </Carousel>

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

export default ImageCarouselFeedCard;