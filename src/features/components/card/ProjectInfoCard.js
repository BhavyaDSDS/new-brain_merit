import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Dropdown,
  Menu,
  Popconfirm,
} from "antd";
import moment from "moment";
import SkillsView from "../view/SkillsView";
import {
  objectLength,
  GetTimeLineFromMomentArray,
} from "../../components/utils/JavaScriptUtils";
import { useSelector } from "react-redux";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function ProjectInfoCard(props) {
  const [ellipsis] = useState(true);
  const { projectInfo, onEditClick, onDelete } = props;
  const employerList = useSelector((state) => state.employer.listEmployers);
  const roleList = useSelector((state) => state.utils.roleList);
  const locationsList = useSelector((state) => state.utils.locationsList);

  var empOptions;
  if (JSON.stringify(employerList) !== "{}") {
    empOptions = employerList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  var JobRoleOptions;
  if (JSON.stringify(roleList) !== "{}") {
    JobRoleOptions = roleList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var Locoptions;
  if (JSON.stringify(locationsList) !== "{}") {
    Locoptions = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  // console.log("empOptions info",empOptions);
  // console.log("JobRoleOptions info",JobRoleOptions);
  // console.log("Locoptions info",Locoptions);

  return (
    <div>
      {objectLength(projectInfo) > 0 &&
        projectInfo.map((project, index) => {
          console.log("project info ******************", project);

          let momentArray = [
            moment(project.from_date, "YYYY-MM-DD").toDate(),
            moment(project.to_date, "YYYY-MM-DD").toDate(),
          ];
          let timeline = GetTimeLineFromMomentArray(momentArray);


          const confirm = () => {
            onDelete(project.id);
            // console.log("i am working fine",project.id);
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

          
          if (
            project.type === "Work Experience" ||
            project.type === "Internship"
          ) {
            let employer_name = empOptions.find(
              (o) => o.value === project.employer
            );
            let role_name = JobRoleOptions.find(
              (o) => o.value === project.job_role
            );
            let loc_name = Locoptions.find((o) => o.value === project.location);

            return (
              <Card
                size="small"
                style={{ margin: "16px 16px 16px 0" }}
                key={project.id}
              >
                <Row>
                  <Col span={23}>
                    <Row>
                      <Col span={20}>
                        <Title level={5}>
                          {employer_name != undefined && employer_name.label}
                        </Title>
                        <div style={{ marginTop: "-8px", marginBottom: "0px" }}>
                          <Text>
                            {role_name != undefined && role_name.label}
                          </Text>
                        </div>
                        <Text>{loc_name != undefined && loc_name.label}</Text>                        
                        {loc_name != undefined && (<br />)}

                        <Text type="secondary" style={{ fontSize: "90%" }}>
                          {timeline}
                        </Text>
                        <div
                          style={{ marginTop: "6px", marginBottom: "0px" }}
                        ></div>
                        <SkillsView
                          skillset={project.skills}
                          skillType={"o_tech_skills"}
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
                          style={{ marginTop: "12px" }}
                        >
                          {project.description}
                        </Paragraph>
                      </Col>
                      <Col span={4}>
                        <Button
                          type="link"
                          onClick={() => {
                            onEditClick(index);
                          }}
                          style={{ float: "right", marginTop: 0 }}
                        >
                          Edit
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={1}>
                    <Dropdown overlay={menu} placement="bottom">
                      <MoreOutlined style={{marginTop:8}}/>
                    </Dropdown>
                  </Col>
                </Row>
              </Card>
            );
          } else if (
            project.type === "College Project" ||
            project.type === "Open Source Project"
          ) {
            return (
              <Card
                size="small"
                style={{ margin: "16px 16px 16px 0" }}
                key={project.id}
              >
                <Row>
                  <Col span={20}>
                    <Title level={5}>{project.name}</Title>
                    <Text type="secondary" style={{ fontSize: "90%" }}>
                      {timeline}
                    </Text>
                    <div
                      style={{ marginTop: "6px", marginBottom: "0px" }}
                    ></div>
                    <SkillsView
                      skillset={project.skills}
                      skillType={"o_tech_skills"}
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
                      style={{ marginTop: "12px" }}
                    >
                      {project.description}
                    </Paragraph>
                  </Col>
                  <Col span={3}>
                    <Button
                      type="link"
                      onClick={() => {
                        onEditClick(index);
                      }}
                      style={{ float: "right" }}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col span={1}>
                    <Dropdown overlay={menu} placement="bottom">
                      <MoreOutlined style={{marginTop:8}}/>
                    </Dropdown>
                  </Col>
                </Row>
              </Card>
            );
          }
        })}
    </div>
  );
}

export default ProjectInfoCard;
