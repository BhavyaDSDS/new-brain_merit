import React, { useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import moment from "moment";
import {
  objectLength,
  getTimeLineFormMomentArray,
} from "../utils/JavaScriptUtils";
import { useSelector } from "react-redux";

const { Title, Text, Paragraph } = Typography;

function PreferredJobCard() {
  return (
    <Card
      size="small"
      style={{ margin: "16px 16px 16px 0" }}
      key={project.id}
    >
        <Row>
            
        </Row>
    </Card>
  );
}

export default PreferredJobCard;
