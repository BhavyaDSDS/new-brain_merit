import { Card, Steps, Form } from "antd";
import React, { useState,useEffect } from "react";
import { resetEmployerDetails } from "../../../employerSlice";
import EmployerPrimaryInfo from "./EmployerPrimaryInfo";
import JobProfile from "./JobProfile";
import { useSelector, useDispatch } from "react-redux";


const { Step } = Steps;

function AddEmployerStepper() {
  const [current, setCurrent] = useState(0);
  const [empId, setEmpId] = useState();
  const { Step } = Steps;

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("empId in AddEmployerStepper: " + empId);
    if(empId === undefined)
    {
      dispatch(resetEmployerDetails());
    }
    setCurrent(0);
  },[]);

  const setNextTab = () => {
    setCurrent(current + 1);
  };


  const onChange = (value) => {
    // console.log("onChange:", current);
    setCurrent(value);
  };
   function onSetEmpId(id) {
     setEmpId(id);
   }
 

  const steps = [
    {
        title: "Primary Info",
        content: (
          <div>
            <EmployerPrimaryInfo
           empId={empId}
           // onSetCandidateKey={onSetEmployerKey}
            setNextTab={setNextTab}
           // isFresher={location.state.fresher}
           onSetEmpId = {onSetEmpId}
          />
          {/* <EmployerPrimaryInfo 
            empId = {empId}
            onSetEmpId = {onSetEmpId}
            /> */}
          </div>
        ),
      },
      {
        title: "Jobs",
        content: (
          <div>
            <JobProfile
            empId = {empId}
            />
          </div>
        ),
      },
  ]
  return (
    <div>
      <Card title="Add Employer" loading={false}>
      <Steps current={current} onChange={onChange} >
        {steps.map((item) => (
          <Step key={item.title} title={item.title}
          disabled={ empId!=undefined ? false : true }
          />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action"></div>
      </Card>
    </div>
  );
}

export default AddEmployerStepper;
