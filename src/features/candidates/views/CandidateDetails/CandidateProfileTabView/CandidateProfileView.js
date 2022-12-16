import React, { useState, useEffect, useCallback } from "react";
import {
  Tabs,
  Collapse,
  Avatar,
  Badge,
  Col,
  Row,
  Card,
  Space,
  Upload,
  Tag,
  Image,
  Typography,
  Divider,
  Button,
  Dropdown,
  Menu,
  Modal,
  Empty,
  Drawer,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  MoreOutlined,
  LinkedinFilled,
  GithubFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getCandidate,
  updateCandidate,
  setRefreshCandList,
} from "../../../candidateSlice";
import CandidateProjects from "../AddCandidates/CandidateProjects";
import CandidateAcademics from "../AddCandidates/CandidateAcademics";
import CandidateLandingPage from "./CandidateLandingPage";
import CandidateResumePage from "./CandidateResumePage";
import CandidatePrimaryInfoForm from "../../../../components/form/CandidatePrimaryInfoForm";
import UploadDocs from "../../../../components/utils/UploadDocs";
import CandidateScreening from "./CandidateScreening";
import CandidateJobPreferenceCard from "./CandidateJobPreferenceCard";
import CandidateHeadLineCard from "./CandidateHeadLineCard";
import ScreeningInfoCard from "./ScreeningInfoCard";
import JobSeekerStatusView from "../../../../components/view/JobSeekerStatusView";
import {
  objectLength,
  capitalizeFirstLetter,
} from "../../../../components/utils/JavaScriptUtils";
import SchedulCalendar from "../../../../components/calendar/SchedulCalendar";
import AssessmentInfo from "../../../../assessments/views/AssessmentDetails/AddAssessments/AssessmentInfo";

const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { confirm } = Modal;

function CandidateProfile(props) {
  const { candidateKey, onShowNextCandidate, afterProfileDelete } = props;
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );
  const locationsList = useSelector((state) => state.utils.locationsList);
  // const [formEditable, setFormEditable] = useState(true);
  const [TabKey, setTabKey] = useState("1");
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const [editPrimInfo, setEditPrimInfo] = useState(false);
  const [schedularOpen, setSchedular] = useState(false);

  console.log("candidate full data =", candidateDetails);
  console.log("record key =", candidateKey);

  // console.log("editPrimInfo************* =", editPrimInfo);

  var locations;
  if (JSON.stringify(locationsList) !== "{}") {
    locations = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  const onChange = (key) => {
    setTabKey(key);
    console.log(key);
  };

  useEffect(() => {
    console.log("candidateKey in CandidateProfile: " + candidateKey);
    dispatch(getCandidate(candidateKey));
    setTabKey("1");
  }, [candidateKey]);

  const handleButtonClick = (e) => {
    // message.info("Click on left button.");
    console.log("click on menu button", e);
  };

  // const handleLeftButtonClick = (e) => {
  //   console.log("click left button", e);
  // };

  const handleDirButtonClick = (direction) => {
    console.log("click button direction ", direction);
    onShowNextCandidate(candidateKey, direction);
  };

  const deleteConfirm = () => {
    confirm({
      title: "Are you sure delete this profile?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const values = { is_deleted: true };
        const data = [values, candidateKey];
        dispatch(updateCandidate(data));
        afterProfileDelete(candidateKey);
        dispatch(setRefreshCandList());
        // handleDirButtonClick("Right")
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };

  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    console.log("click", e);
    if (e.key === "2") {
      deleteConfirm();
    } else if (e.key === "1") {
      setEditPrimInfo(true);
    } else if (e.key === "3") {
      console.log("schedular is clicked....");
      setSchedular(true);
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "Edit Profile",
          key: "1",
          icon: <EditOutlined />,
        },
        {
          label: "Delete Profile",
          key: "2",
          icon: <DeleteOutlined />,
        },
        {
          label: "Schedular",
          key: "3",
          icon: <CalendarOutlined />,
        },
      ]}
    />
  );

  const propss = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleFinish = useCallback(
    (values) => {
      values.first_name = capitalizeFirstLetter(values.first_name);
      values.last_name = capitalizeFirstLetter(values.last_name);
      console.log("submit values before: ", values);

      const data = [values, candidateKey];
      dispatch(updateCandidate(data));
      console.log("updated successfully");
      setEditPrimInfo(false);
      dispatch(setRefreshCandList());
    },
    [setPending, candidateKey]
  );

  let locationObj = locations.find(
    (o) => o.value == candidateDetails.current_location
  );
  // console.log("location name =",locationObj);
  // console.log("Locations list, location", locations, locationObj);
  let location;
  if (locationObj === undefined) {
    location = "";
  } else {
    location = locationObj.label;
  }

  function onS3Upload(url) {
    console.log(" onS3Upload image url", url);
    const values = { resume: url };
    const data = [values, candidateDetails.id];
    dispatch(updateCandidate(data));
    dispatch(setRefreshCandList());
    console.log("updated successfully ");
  }

  function OnPrimInfoModalCancel() {
    setEditPrimInfo(false);
  }

  let projLabel = "Experience";
  if (candidateDetails.fresher) {
    projLabel = "Projects";
  }
  console.log("profile view isFresher? =", candidateDetails.fresher);

  function getColor(firstname, lastname) {
    const colors = [
      "#91d5ff",
      "#1890ff",
      "#3f6600",
      "#b37feb",
      "#13c2c2",
      "#7cb305",
      "#096dd9",
    ];
    const firstChar = firstname.charCodeAt(0);
    const secondChar = lastname.charCodeAt(0);

    return colors[(firstChar + secondChar) % 7];
    //return colors[6];
  }

  const onClose = () => {
    setSchedular(false);
  };

  return (
    <>
      {console.log("candidate details ****", candidateDetails)}

      {editPrimInfo && (
        <CandidatePrimaryInfoForm
          candidateDetails={candidateDetails}
          onFinishCandPrimInfo={handleFinish}
          editableForm={true}
          onModalCancel={OnPrimInfoModalCancel}
        />
      )}

      <Drawer
        // title="Interview Scheduler"
        placement="right"
        onClose={onClose}
        width="80%"
        closable={false}
        visible={schedularOpen}
        drawerStyle={{ background: "#F6F8FC" }}
        destroyOnClose
      >
          <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Assessments" key="1">
      <AssessmentInfo />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Interview Scheduler" key="2">
    <SchedulCalendar candidateDetails={candidateDetails} />
    </Tabs.TabPane>
  </Tabs>
        
      </Drawer>

      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>
              {candidateDetails.photo && (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  shape="square"
                  src={candidateDetails.photo}
                />
              )}
              {!candidateDetails.photo && candidateDetails.first_name && (
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  shape="square"
                  style={{
                    backgroundColor: getColor(
                      candidateDetails.first_name,
                      candidateDetails.last_name
                    ),
                  }}
                >
                  {candidateDetails.first_name.charAt(0).toUpperCase()}{" "}
                  {candidateDetails.last_name.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Col>
            <Col span={20}>
              <Row>
                <Col style={{ marginLeft: "16px" }}>
                  <div style={{ marginBottom: "-14px" }}>
                    <Title level={4}>
                      {candidateDetails.first_name} {candidateDetails.last_name}
                    </Title>
                  </div>
                </Col>
                {candidateDetails.screening && (
                  <Col style={{ marginLeft: "8px" }}>
                    <JobSeekerStatusView
                      jobSeekerStatus={candidateDetails.job_seakers_status}
                    />
                  </Col>
                )}
              </Row>

              <Row>
                <Col style={{ marginLeft: "16px" }}>
                  <CandidateHeadLineCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "right" }}
          >
            <Button
              onClick={() => {
                handleDirButtonClick("Left");
              }}
            >
              <LeftOutlined />
            </Button>
            <Button
              onClick={() => {
                handleDirButtonClick("Right");
              }}
            >
              <RightOutlined />
            </Button>
            <Button>
              <ShareAltOutlined />
              Share
            </Button>
            <Button>
              <StarOutlined />
              Shortlist
            </Button>
            <Dropdown overlay={menu}>
              <Button>
                <MoreOutlined />
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Tabs activeKey={TabKey} onChange={onChange}>
            <TabPane tab="Overview" key="1">
              <CandidateLandingPage />
            </TabPane>
            <TabPane tab="Resume" key="2">
              {candidateDetails.resume == null ? (
                <>
                  <div>
                    <Empty description={false}>No resume</Empty>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: 50,
                    }}
                  >
                    <Title level={4}>Upload resume here</Title>
                    <UploadDocs
                      candId={candidateDetails.id}
                      dirName="resume"
                      onS3Upload={onS3Upload}
                      reUpload={false}
                    />
                  </div>
                </>
              ) : (
                <CandidateResumePage
                  resumeUrl={candidateDetails.resume}
                  candId={candidateDetails.id}
                  onS3Upload={onS3Upload}
                />
              )}
            </TabPane>

            <TabPane tab={projLabel} key="3">
              <CandidateProjects />
            </TabPane>
            <TabPane tab="Education" key="5">
              <CandidateAcademics />
            </TabPane>
            <TabPane tab="Screening Info" key="4">
              {candidateDetails.screening === true ? (
                <ScreeningInfoCard candidateKey={candidateKey} />
              ) : (
                <CandidateScreening
                  fresher={candidateDetails.fresher}
                  Editable={false}
                  candidateKey={candidateKey}
                />
              )}
            </TabPane>
          </Tabs>
        </Col>

        <Col span={8} style={{ marginTop: "21px" }}>
          <Divider style={{ marginBottom: "16px" }} />
          <Space direction="vertical" size="small" style={{ display: "flex" }}>
            <Card size="small">
              <Space
                direction="vertical"
                size="small"
                style={{ display: "flex" }}
              >
                <Row>
                  <Col span={12}>
                    <Title level={5} style={{ fontWeight: 500, margin: 0 }}>
                      Contact
                    </Title>
                  </Col>
                </Row>

                <div style={{ marginTop: 8 }}>
                  <PhoneOutlined style={{ marginRight: 8, color: "grey" }} />
                  {candidateDetails.mobile}
                </div>
                <div>
                  <MailOutlined style={{ marginRight: 8, color: "grey" }} />
                  {candidateDetails.email}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {objectLength(candidateDetails.links) > 0 &&
                    candidateDetails.links.map((data) => {
                      return data.LinkType === "GitHub"
                        ? data.Link != "" && (
                            <a href={data.Link} target="_blank">
                              {
                                <GithubFilled
                                  style={{ fontSize: 24, color: "#69b8f0" }}
                                />
                              }
                            </a>
                          )
                        : data.Link != "" && (
                            <a href={data.Link} target="_blank">
                              {
                                <LinkedinFilled
                                  style={{ fontSize: 24, color: "#69b8f0" }}
                                />
                              }
                            </a>
                          );
                    })}
                </div>
              </Space>
            </Card>

            <Card size="small">
              <Row align="middle">
                <Col span={12}>
                  <Title level={5} style={{ fontWeight: 500, margin: 0 }}>
                    Summary
                  </Title>
                </Col>
                <Col span={12}>
                  <CandidateScreening
                    fresher={candidateDetails.fresher}
                    Editable={true}
                    candidateKey={candidateKey}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: 8 }}>
                  <div>
                    <CandidateJobPreferenceCard
                      candidateDetails={candidateDetails}
                      fresher={candidateDetails.fresher}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </>
  );
}
export default CandidateProfile;
