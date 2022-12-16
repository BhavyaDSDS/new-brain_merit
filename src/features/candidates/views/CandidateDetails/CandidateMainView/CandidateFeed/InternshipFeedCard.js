
import {
    ArrowUpOutlined,
    ShareAltOutlined,
    StarOutlined,
    WarningOutlined,
    BankOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Dropdown, Button, Menu, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import parse from 'html-react-parser';
const { Meta, } = Card;
const { Text, Paragraph } = Typography;
function InternshipFeedCard({ internship }) {
 
    const [ellipsis] = useState(true);
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
                    avatar={<Avatar shape="square" size={54} icon={<BankOutlined />} />}
                    title={internship.title}
                    description={<Text type="secondary" style={{ fontSize: "90%" }}>{internship.sub_title}</Text>} />

                <Paragraph
                    ellipsis={
                        ellipsis
                            ? {
                                rows: 6,
                                expandable: true,
                                symbol: "more",
                            }
                            : false
                    }
                    style={{ marginTop: "16px" }}
                >
                    <div>
                    <Text strong style={{ marginBottom: 36 }}> Internship Type:</Text> {internship.internship_type}
                    </div>
                    <br/>
                    <div>
                        <Text type="secondary" style={{ marginBottom: 36 }}> {parse(internship.intership_description)}</Text>
                        </div>
                   <div>
                   {parse(internship.intership_description1)}
                   </div>
                      
                   

                    <div>
                        <Text strong>  About the internship</Text>
                        {parse(internship.responsibilities)}
                    </div>
                    <div>
                        <Text strong >    Skill(s) required </Text>
                        <Text type="secondary" style={{ fontSize: "90%" }}> {parse(internship.Skill)}  </Text>
                    </div>
                    <div>
                    <Text strong >   Who Can Apply</Text>
                       { parse(internship.who_can_apply)}

                    </div>
                    <Text strong>  Number of openings:</Text> {internship.num_of_openings}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </div>
                </Paragraph>
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

export default InternshipFeedCard;