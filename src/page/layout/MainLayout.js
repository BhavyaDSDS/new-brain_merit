import React, { useEffect, useCallback, useState } from "react";
import { Layout } from "antd";
import SiderMenu from "./SiderMenu";
import LayoutBanner from "./LayoutBanner";
import "./Style.less";
import MainRoutingList from "../../router/MainRoutingList";
import {
  getLocationList,
  getBranchList,
  getDegreeList,
  getInstituteList,
  getRoleList,
  getSkillList,
  getNtSkillList,
  getCountryCodeList,
  getDomainList,
  getCandDomainList
} from "../../features/components/componentsSlice";
import {
  getEmployerFilterList,
  getEmployerList,
} from "../../features/employers/employerSlice";
import { getInternshipFilterList, getInternShipList } from "../../features/internships/internshipSlice";
import { getJobPostingFilterList, getJobPostingList } from "../../features/jobs/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { getInterviewerFilterList, getInterviewerList } from "../../features/interviewers/interviewerSlice";
import { getFresherCandidateList, getExpCandidateList } from "../../features/candidates/candidateSlice";

const { Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocationList());
    dispatch(getCountryCodeList());
    dispatch(getSkillList());
    dispatch(getNtSkillList());
    dispatch(getDegreeList());
    dispatch(getBranchList());
    dispatch(getRoleList());
    dispatch(getInstituteList());
    dispatch(getEmployerList());
    dispatch(getJobPostingList());
    dispatch(getInternShipList());
    dispatch(getInterviewerList());
    dispatch(getDomainList());
    dispatch(getExpCandidateList());
    dispatch(getFresherCandidateList());
    dispatch(getCandDomainList());
    dispatch(getInterviewerFilterList());
    dispatch(getJobPostingFilterList());
    dispatch(getInternshipFilterList());
    dispatch(getEmployerFilterList("is_deleted=false"));
  }, []);

  const handleOnCollapse = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderMenu collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
      <Layout>
        <LayoutBanner
          collapsed={collapsed}
          handleOnCollapse={handleOnCollapse}
        />
        <Content style={{ margin: "24px" }}>
          <div style={{ background: "#fff", minHeight: 20 }}>
            <MainRoutingList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
