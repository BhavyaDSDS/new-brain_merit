import React, { useState, useEffect } from "react";
import {
  Tabs,
  Collapse,
  Avatar,
  List,
  Col,
  Row,
  Card,
  Space,
  Upload,
  Tag,
  Empty,
  Typography,
  Divider,
  Button,
  Dropdown,
  Menu,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  MoreOutlined,
  ExclamationOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployer,
  updateEmployer,
  deleteEmployer,
  setRefreshEmployerList,
} from "../../employerSlice";
import EmployerLandingPage from "./EmployerLandingPage";
import EmployerContactInfo from "./EmployerContactInfo";
import EmployerInfo from "./EmployerInfo";
import { objectLength } from "../../../components/utils/JavaScriptUtils";
import EmployerPrimaryInfoForm from "../../../components/form/employersForms/EmployerPrimaryInfoForm";

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { confirm } = Modal;

function EmployerProfileView(props) {
  const { recordKey, onShowNextCandidate, afterProfileDelete, } = props;
  const [editPrimInfo, setEditPrimInfo] = useState(false);

  const employerDetails = useSelector((state) => state.employer.employerDetail);

  console.log("empDetails info from empProfileView =", employerDetails);

  const [TabKey, setTabKey] = useState("1");

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect - recordkey in EmployerProfile: " + recordKey);
    dispatch(getEmployer(recordKey));
    setTabKey("1");
  }, [recordKey]);

  const onChange = (key) => {
    setTabKey(key);
    console.log(key);
  };

  const handleDirButtonClick = (direction) => {
    onShowNextCandidate(recordKey, direction);
  };
  const deleteConfirm = () => {
    confirm({
      title: "Are you sure delete this profile",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
       // const data = recordKey;
        const values = { is_deleted: true };
       // console.log("is_deleted: true is_deleted: true is_deleted: true is_deleted: true is_deleted: true ",values)
        const data = [values, recordKey];
        console.log("is_deleted: true is_deleted: true is_deleted: true is_deleted: true is_deleted: true ",data)

        // console.log("VALES**########****",values)
        dispatch(updateEmployer(data));
        afterProfileDelete(recordKey);
        dispatch(setRefreshEmployerList());
        console.log("setRefreshEmployerList() called");
        // afterProfileDelete(recordKey)
        // dispatch( setRefreshEmployList());
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

  function OnPrimInfoModalCancel() {
    setEditPrimInfo(false);
  }
console.log("zzzz ZZZZZZZZZ",recordKey)
  const handleFinish = React.useCallback((values) => {
    if (recordKey) {
      console.log("zzzzz",recordKey)
      const data = [values, recordKey];
      dispatch(updateEmployer(data));
      dispatch(setRefreshEmployerList());
      console.log("setRefreshEmployerList() called");
    }
    setEditPrimInfo(false);

    // console.log("emp primary Edit info = ",values);
    // console.log("emp primary Edit JSON info =",JSON.stringify(values));
  }, [recordKey]);

  return (
    <>
      {editPrimInfo && (
        <EmployerPrimaryInfoForm
          editableForm={true}
          onFinishEmpPrimInfo={handleFinish}
          onModalCancel={OnPrimInfoModalCancel}
          employerDetails={employerDetails}
        />
      )}

      <Row>
        <Col span={12}>
          <Row>
            <Col span={4}>
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                shape="square"
                src={employerDetails.logo}
              />
            </Col>
            <Col flex="auto" style={{ marginLeft: "16px" }}>
              <Title level={4}>{employerDetails.name}</Title>
              <Text>{employerDetails.tagline}</Text>
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
              <Button icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16} >
          <Tabs activeKey={TabKey} onChange={onChange}>
            <TabPane tab="Overview" key="1">
              <Card>
                <Title level={5}>Description</Title>
              
              {employerDetails.description != null ? (
                <EmployerLandingPage
                  description={employerDetails.description}
                />
              ) : (
                <Empty description={false} />
              )}
              </Card>
            </TabPane>
          </Tabs>
        </Col>

        <Col span={8} style={{ marginTop: "21px" }}>
          <Divider style={{ marginBottom: "16px" }} />
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <EmployerContactInfo />
            <EmployerInfo />
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default EmployerProfileView;