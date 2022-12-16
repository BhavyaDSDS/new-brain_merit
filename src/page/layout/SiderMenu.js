import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import {
  DashboardOutlined,
  FundProjectionScreenOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  CarryOutOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import "./Style.less";
const { Sider } = Layout;
function SiderMenu(props) {
  const { handleOnCollapse, collapsed } = props;

  const theme = "light";
  const history = useHistory();
  const handleSiderMenuClick = (action) => {
    switch (action.key) {
      case "FresherDashboard":
        history.push("/");
        break;
      case "ExpCandidatesDashboard":
        history.push("/expcandidates");
        break;  
      case "freshers":
        history.push("/freshers");
        break;
      case "expCandidateList":
        history.push("/expCandidateList");
        break;  
      case "addCandidates":
        history.push("/AddCandidates");
        break;
      case "employers":
        history.push("/employers");
        break;
      case "AddEmployerDetails":
        history.push("/AddEmployerDetails");
        break;
      case "JobPostingList":
        history.push("/JobPostingList");
        break;
      case "InternshipList":
        history.push("/InternshipList");
        break;
      case "ProfileView":
        history.push("/ProfileView");
        break;
      case "InterviewersList":
        history.push("/interviewerslist");
        break;
      case "AssessmentList":
        history.push("/assessmentList");
        break;
      default:
        history.push("/");
    }
  };

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsedWidth="80"
      onCollapse={handleOnCollapse}
      collapsed={collapsed}
      width="256"
      theme={theme}
    >
      <div className="menu-logo" />
      <Menu mode="inline" theme={theme} onClick={handleSiderMenuClick}>
        <Menu.Item key="FresherDashboard">
          <DashboardOutlined />
          <span className="nav-text">Freshers Dashboard</span>
        </Menu.Item>
        <Menu.Item key="ExpCandidatesDashboard">
          <DashboardOutlined />
          <span className="nav-text">Exp Candidates Dashboard</span>
        </Menu.Item>
        <Menu.Item key="freshers">
          <TeamOutlined />
          {/* <Icon icon="mdi:account-multiple" style={{ fontSize: '24px' }} /> */}
          <span className="nav-text">Freshers</span>
        </Menu.Item>
        <Menu.Item key="expCandidateList">
          <TeamOutlined />
          {/* <Icon icon="mdi:account-multiple" style={{ fontSize: '24px' }} /> */}
          <span className="nav-text">Experienced Candidates</span>
        </Menu.Item>
        <Menu.Item key="employers">
          <TeamOutlined />
          <span className="nav-text">Employers</span>
        </Menu.Item>
        <Menu.Item key="JobPostingList">
          <CarryOutOutlined />
          <span className="nav-text">Jobs</span>
        </Menu.Item>
        <Menu.Item key="InternshipList">
          <SolutionOutlined />
          <span className="nav-text">Internships</span>
        </Menu.Item>
        <Menu.Item key="InterviewersList">
          <UserAddOutlined />
          <span className="nav-text">Interviewers</span>
        </Menu.Item>
        <Menu.Item key="AssessmentList">
          <UserAddOutlined />
          <span className="nav-text">Assessments</span>
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          <span className="nav-text">Settings</span>
        </Menu.Item>
        <Menu.Item key="reports">
          <FundProjectionScreenOutlined />
          <span className="nav-text">Reports</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
