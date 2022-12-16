import React, { useState, useEffect } from "react";
import { Form, Steps, Card, Row, Col } from "antd";
import { resetCandidateDetails } from "../../../candidateSlice";
import { useDispatch } from "react-redux";
import CandidatePrimaryInfo from "./CandidatePrimaryInfo";
import CandidateAcademics from "./CandidateAcademics";
import CandidateProjects from "./CandidateProjects";
import CandidateJobPreferences from "./CandidateJobPreferences";
import { useLocation } from "react-router-dom";

function AddCandidateStepper() {
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [candidateKey, setCandidateKey] = useState();
  const dispatch = useDispatch();

  const location = useLocation();

  // console.log("isFresher ===",location.state.fresher);
  useEffect(() => {
    console.log("candidateKey in AddCandidateStepper: " + candidateKey);
    if (candidateKey === undefined) {
      dispatch(resetCandidateDetails());
    }
    setCurrent(0);
  }, []);

  const setNextTab = () => {
    setCurrent(current + 1);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  function onSetCandidateKey(key) {
    setCandidateKey(key);
  }

  const steps = [
    {
      title: "Primary Info",
      content: (
        <div>
          <CandidatePrimaryInfo
            candidateKey={candidateKey}
            onSetCandidateKey={onSetCandidateKey}
            setNextTab={setNextTab}
            isFresher={location.state.fresher}
          />
        </div>
      ),
    },
    {
      title: "Academics",
      content: (
        <div>
          <Row>
            <Col span={18}>
              <CandidateAcademics />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Projects",
      content: (
        <div>
          <Row>
            <Col span={18}>
              <CandidateProjects />
            </Col>
          </Row>
        </div>
      ),
    },

    {
      title: "Job Preference",
      content: (
        <div>
          <CandidateJobPreferences />
        </div>
      ),
    },
  ];

  return (
    <Card title="Add Candidate" loading={false}>
      <Steps current={current} onChange={onChange}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} 
          disabled={ candidateKey!=undefined ? false : true }
          />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action"></div>
    </Card> 
  );
}
export default AddCandidateStepper;
