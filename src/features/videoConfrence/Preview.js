import React from 'react'
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import {useHMSActions} from "@100mslive/react-sdk";

// const endPoint = "https://prod-in2.100ms.live/hmsapi/videoConfresnce.app.100ms.live/"


function Preview(props) {
    const {onFinesh} = props

    const handleFinesh = async(value) => {     
            onFinesh(value)

    };
   
  return (
    <div>
    <Row>
      <Col span={5} />
      <Col span={14}>
        <Card style={{ margin: "100px" }}>
          <Form onFinish={handleFinesh} layout="vertical">
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Select placeholder="Select your role" allowClear>
                <Option value="host">Host</Option>
                <Option value="guest">Guest</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Join
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={5} />
    </Row>
  </div>
  )
}

export default Preview