import React, { useState, useCallback, useEffect, } from "react";
import { Card, Form, Row, Input, Col, Modal, Select, RadioChangeEvent, DatePicker, Space, TimePicker, Button, Radio } from "antd";
import RichTextEditors from "../../../../components/utils/RichTextEditors";
import { useSelector, useDispatch } from "react-redux";
import EmployeSelectForm from "../../../../components/form/employersForms/EployeSelectForm";
import CandidateSelectForm from "../../../../components/form/employersForms/CandidateSelectForm";
import RoleSelectForm from "../../../../components/form/RoleSelectForm";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import InterviewerSelectForm from "../../../../components/form/InterviewerSelectForm";
import { addAssessment } from "../../../assessmentSlice";
import { schema } from "@antv/g2plot";
import JobdiscriptionSelectForm from "../../../../components/form/employersForms/JobdiscriptionSelectForm";
const { RangePicker } = DatePicker;


function AssessmentInfo() {

const [interviewer_inputs, setinterviewer_inputs] = useState("");
const dispatch = useDispatch();
//console.log("employer details *******", candId)

const handleFinish = React.useCallback(
  (values) => {
    values.interviewer_inputs = interviewer_inputs;
    console.log("Success:", values);
    
    var date = (values.schedule_start).format('YYYY-MM-DD ');
    var start_time = date + "" +(values.schedule_end[0].format('HH:mm'));
    var end_time=date + ""+(values.schedule_end[1].format('HH:mm'));
    values.schedule_start = start_time;
    values.schedule_end =end_time;
    console.log("Shedule start ==", start_time)
    console.log("shedule end ==", end_time)
    dispatch(addAssessment(values));
  },[interviewer_inputs]);
 
  return (
    <>
      <Card title="Add Assessments">
        <Row>
          <Col span={10}>
            <Form onFinish={handleFinish} layout="vertical">
              {/* <Form.Item 
              rules={[
                {
                  required: true,
                  message: "Please input your Interviewer!",
                },
              ]}
              >
                <InterviewerSelectForm
              name={"interviewer"}
              label={"Interviewer"}
              required={true}/>
              </Form.Item> */}

                <EmployeSelectForm
              name={"employer"}
              label={"Employer"}
            />
          
              

              

              {/* <Form.Item 
              rules={[
                {
                  required: true,
                  message: "Please input your Candidate!",
                },
              ]}
              >
                <CandidateSelectForm
              name={"candidate"}
              label={"Candidate"}
            required={true}
            />
            
              </Form.Item> */}

              <Form.Item>
                
                <JobdiscriptionSelectForm
              name={"job_description"}
              label={"Job Discription"}
            
            
            />
              </Form.Item>

              <Form.Item 
              rules={[
                {required:true,
                  message:"Please input the Job role"},
                ]}
              >
                <RoleSelectForm
              name={"role_to_be_assessed"}
              label={"Role To Be Assessed"}
             required={true}
             />
              </Form.Item>

              <Form.Item
               rules={[
                {
                  required: true,
                  message: "Please input your Skills To Be Assessed!",
                },
              ]}
              >
                <SkillsSelectForm
              name={"skills_to_be_assessed"}
              label={"Skills To Be Assessed"}
              required={true}/>
              </Form.Item>

              {/* <Form.Item name="interviewer_inputs" label="Interviewer Inputs">
                <RichTextEditors setValue={setinterviewer_inputs} />
              </Form.Item> */}

              {/* <Form.Item name="assessment_type" label="Assessment Type" >
                <Radio.Group defaultValue="interview">
                  <Radio value="interview">interview</Radio>
                  <Radio value="automated">automated</Radio>

                </Radio.Group>
              </Form.Item> */}
              {/* <Form.Item
                name="meeting_link"
                label="Meeting Link"
                rules={[

                  {
                    type: 'url',
                    warningOnly: true,
                  },
                  {
                    type: 'string',
                    min: 6,
                  },
                ]}
              >
                <Input placeholder="input placeholder" />
              </Form.Item> */}

              {/* <Form.Item label="Schedule Time">
                <Input.Group compact>
                  <Form.Item name="schedule_start">
                    <DatePicker />
                  </Form.Item>

                  <Form.Item name="schedule_end">
                  <TimePicker.RangePicker
                        use12Hours
                        format="h:mm a"
                        allowClear
                        //minuteStep={30}
                        //onChange={onChange}
                        // status={error}
                      />
                  </Form.Item>

                </Input.Group>
              </Form.Item> */}


              <Form.Item >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>



            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}
export default AssessmentInfo;

