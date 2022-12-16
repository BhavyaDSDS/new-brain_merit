import React from "react";
import { Card, Typography, Form } from "antd";
import CandidateHeadLineCard from "./CandidateHeadLineCard";
import CandidateAboutMeCard from "./CandidateAboutMeCard";
import CandidateSkillsCard from "./CandidateSkillsCard";

const { Title } = Typography;

function CandidateLandingPage(props) {  
  return (
    <>
      <Card size="small" style={{ "margin": "0 16px 16px 0" }}>
        <CandidateAboutMeCard />
      </Card>
      <Card size="small" style={{ "margin": "0 16px 16px 0" }}>
        <CandidateSkillsCard />
      </Card>
    </>
  );
}
export default CandidateLandingPage;
