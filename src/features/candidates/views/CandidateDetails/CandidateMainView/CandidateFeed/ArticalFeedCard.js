import {
  ArrowUpOutlined,
  ShareAltOutlined,
  StarOutlined,
  WarningOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Dropdown,
  Button,
  Menu,
  Tooltip,
  Typography,
} from "antd";
import parse from 'html-react-parser';
import React, { useState } from "react";

const { Meta } = Card;
const { Text, Paragraph } = Typography;


function ArticalFeedCard({article}) {
  const [ellipsis] = useState(true);
 
  const menu = (
    <Menu
      items={[
        
        {
          key: "2",
          label: (
            <p>
              <Text type="danger">{<WarningOutlined />} Report</Text>
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
          avatar={<Avatar src={article.avatar}/>}
          title={article.title} 
        />
        
        <Paragraph
          ellipsis={
            ellipsis
              ? {
                rows: 2,
                expandable: true,
                symbol: "more",
              }
              : false
          }
          style={{ marginTop: "16px" }}
        >
         {parse(article.paragraph)}
        </Paragraph>

        <div>
          <Card
            size="small"
            cover={
              <img
                size="small"
              
                src={article.photo}
              />
            }
          />
        </div>
        
     

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
}

export default ArticalFeedCard;
