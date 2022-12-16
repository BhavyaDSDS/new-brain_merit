
import {
  ArrowUpOutlined,
  ShareAltOutlined,
  StarOutlined,
  WarningOutlined,
  BankOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Dropdown, Button, Menu, Tooltip, Typography, Badge } from 'antd';
import React, { useState } from 'react';
import parse from 'html-react-parser';
const { Meta, } = Card;
const { Text, Paragraph } = Typography;
function NewJobFeedCard({ newjob }) {
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
      <Badge.Ribbon text="New" color="orange">
        <Card style={{ marginBottom: "24px" }} >
          <Meta
            avatar={<Avatar shape="square" size={54} icon={<BankOutlined />} />}
            title={newjob.title}
            description={<Text type="secondary" style={{ fontSize: "90%" }}>{newjob.sub_title}</Text>} />

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
          ><div>
            <Text strong style={{ marginBottom: 36 }}> Job Type:</Text> {newjob.job_type}
            </div>
            <br/>
            <div>
            <Text strong>   Responsibilities</Text>
            {parse(newjob.responsibilities)}
            </div>
            <div>
            <Text strong >Skills And Qualifications</Text>
            {parse(newjob.skills_qualification)}
            </div>
            <Text strong>  Salary Range:</Text> {newjob.salary_range}
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
      </Badge.Ribbon>

    </>
  );
};

export default NewJobFeedCard;