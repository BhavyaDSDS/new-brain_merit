
import {
    MoreOutlined,
    ArrowUpOutlined,
    ShareAltOutlined,
    StarOutlined,
    WarningOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import { Card, Dropdown, Button, Menu, Tooltip, Typography, Checkbox, Row, Avatar } from 'antd';
import React from 'react';
import parse from 'html-react-parser';
const { Meta, } = Card;
const { Text } = Typography;
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java

    ],
});
function QuizFeedCard({ quiz }) {
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <p>
                            <Text type="danger" >{<WarningOutlined />} Report</Text>

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
                    avatar={<Avatar shape="circle" size={54} icon={<IconFont type="icon-javascript" />} />}
                    title={quiz.title}
                    description={<Text type="secondary" style={{ fontSize: "90%" }}>{quiz.sub_title}</Text>} />
                <p style={{ marginBottom: 15, marginTop: "16px" }}>
                    <Text strong>
                        {quiz.question} </Text></p>
                <pre>
                    <code>
                        {parse(quiz.code)}
                    </code></pre>


                <p>
                    <Row style={{ marginBottom: 15 }}>
                        <Checkbox value="1">{quiz.option1}</Checkbox>
                    </Row>
                    <Row style={{ marginBottom: 15 }}>
                        <Checkbox value="2">{quiz.option2}</Checkbox>
                    </Row>
                    <Row style={{ marginBottom: 15 }}>
                        <Checkbox value="3">{quiz.option3}</Checkbox>
                    </Row>
                    <Row style={{ marginBottom: 15 }}>
                        <Checkbox value="4">{quiz.option4}</Checkbox>
                    </Row>
                </p>

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

export default QuizFeedCard;