import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Col,
  Avatar,
  Row,
  Menu,
  Dropdown,
  Popconfirm,
  Space,
} from "antd";
import { BankOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  objectLength,
  GetTimeLineFromMomentArray,
} from "../../components/utils/JavaScriptUtils";
const { Title, Text } = Typography;

function AcademicInfoCard(props) {
  const { AcademicInfo, onEditClick, onDelete } = props;

  const branchsList = useSelector((state) => state.utils.branchsList);
  const institutesList = useSelector((state) => state.utils.instituteList);
  const degreesList = useSelector((state) => state.utils.degreesList);

  var degreeList;
  if (JSON.stringify(degreesList) !== "{}") {
    degreeList = degreesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var instituteList;
  if (JSON.stringify(institutesList) !== "{}") {
    instituteList = institutesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var branchList;
  if (JSON.stringify(branchsList) !== "{}") {
    branchList = branchsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  return (
    <div>
      {objectLength(AcademicInfo) > 0 &&
        AcademicInfo.map((academics, index) => {
          // console.log("academics = ", academics)
          let branch = branchList.find((o) => o.value === academics.branch);
          let institute = instituteList.find(
            (o) => o.value === academics.institute
          );
          let degree = degreeList.find((o) => o.value === academics.degree);
          let momentArray = [
            moment(academics.from_date, "YYYY-MM-DD").toDate(),
            moment(academics.to_date, "YYYY-MM-DD").toDate(),
          ];
          let timeline = GetTimeLineFromMomentArray(momentArray);
          // console.log("branch", branch);
          // console.log("institute", institute);
          // console.log("degree", degree);
          // console.log("academics&&&&&", academics);

          const confirm = () => {
            onDelete(academics.id);
          };

          const menu = (
            <Popconfirm
              title="Are you sure, do you want to delete？"
              okText="Delete"
              okType="danger"
              cancelText="No"
              onConfirm={confirm}
            >
              <Menu
                items={[
                  {
                    label: "Delete",
                    key: "1",
                    icon: <DeleteOutlined />,
                  },
                ]}
              />
            </Popconfirm>
          );

          return (
            <>
              {branch != null &&
                institute != null &&
                degree != null &&
                timeline != null && (
                  <Card
                    size="small"
                    style={{ margin: "16px 16px 16px 0" }}
                    key={academics.id}
                  >
                    <Row>
                      <Col span={3} justify="center">
                        <Avatar
                          shape="square"
                          size={54}
                          icon={<BankOutlined />}
                        />
                      </Col>
                      <Col span={20}>
                        <Row>
                          <Col span={20}>
                            <Title level={5}>{institute.label}</Title>
                            <div style={{ marginTop: "-8px" }}>
                              {branch.label ? (
                                <Text>
                                  {degree.label}, {branch.label}
                                </Text>
                              ) : (
                                <Text>{degree.label}</Text>
                              )}
                            </div>
                            <div> 
                              <Text
                                type="secondary"
                                style={{ fontSize: "90%" }}
                              >
                                {timeline}
                              </Text>
                            </div>
                          </Col>
                          <Col span={4}>
                            <Button
                              type="link"
                              size="small"
                              onClick={() => {
                                console.log("index:" + index);
                                onEditClick(index);
                              }}
                              style={{ float: "right" }}
                            >
                              Edit
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={1}>
                        <Dropdown overlay={menu} placement="bottom">
                          <MoreOutlined />
                        </Dropdown>
                      </Col>
                    </Row>
                  </Card>
                )}
            </>
          );
        })}
    </div>
  );
}

export default AcademicInfoCard;
