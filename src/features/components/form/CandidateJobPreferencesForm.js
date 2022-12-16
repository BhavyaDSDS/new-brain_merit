import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  DatePicker,
  Select,
  Input,
  Space,
  Checkbox,
  Alert,
  message,
  notification,
} from "antd";
import _ from "lodash";
import LocationSelectForm from "./LocationSelectForm";
import RoleSelectForm from "./RoleSelectForm";
import UploadDocs from "../utils/UploadDocs";
import SkillsSelectForm from "./SkillsSelectForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  MAX_URL_LINKS,
  FORM_SINGLE_FIELD_COLUMN_SPAN,
} from "../../../constants";
import UploadResume from "../utils/UploadResume";
import Notification from "../utils/Notification";
import WorkDomain from "./WorkDomain";
import { SECONDARY_SKILLS } from "../../../constants";
const { RangePicker } = DatePicker;
const { Option } = Select;

/* Needs to be removed once backend is integrated */
const prim_skills = "";
const other_tech_skills = "";
const non_tech_skills = "";

function CandidateJobPreferencesForm(props) {
  const { candidateDetails, onFinishCandJobPreferences } = props;
  const [any_role, setany_role] = useState(false);
  const [any_location, setany_location] = useState(false);
  const [resume, setResume] = useState();
  const [resumestatus, setResumestatus] = useState();
  const [open_for_job, setopen_for_job] = useState(true);
  const [open_for_internship, setopen_for_internship] = useState(true);
  const [form] = Form.useForm();
  const [no_of_links, set_no_of_links] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  // const warningMessage = () => {
  //   notification.warning({
  //     message:"Resume is not uploaded !",
  //     placement:'top',
  //     duration:null
  //   })
  // }

  function onAnyRoleChanged(role) {
    setany_role(role);
  }

  function onAnyLocationChanged(location) {
    setany_location(location);
  }

  function onPRCheckboxChange(e) {
    setopen_for_job(e.target.checked);
    console.log(" onPRCheckboxChange", e.target.checked);
  }

  function onOFICheckboxChange(e) {
    setopen_for_internship(e.target.checked);
    console.log(" onOFICheckboxChange", e.target.checked);
  }

  function onS3Upload(url, status) {
    console.log(" onS3Upload image url", url);
    setResume(url);
    setResumestatus(status);
  }

  const handleFinish = React.useCallback(
    (values) => {
      setShowWarning(false);
      if (resume == null && resumestatus) {
        setShowWarning(true);
      } else {
        values.resume = resume;

        if (values.internship_start_date) {
          values.internship_from_date = values.internship_start_date[0].format(
            "YYYY-MM-01"
          );
          values.internship_to_date = values.internship_start_date[1].format(
            "YYYY-MM-01"
          );
        }

        if (values.date_of_joining) {
          values.date_of_joining = values.date_of_joining.format("YYYY-MM-01");
        }

        onFinishCandJobPreferences(values);
        console.log("JobPreferences values === ", values);
      }
    },
    [resume, resumestatus]
  );

  if ((!resumestatus || resume != null) && showWarning) {
    setShowWarning(false);
  }

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < moment().endOf("day");
  };

  // console.log("candidate details **********", candidateDetails)

  return (
    <>
      {showWarning && (
        <Notification
          type="warning"
          place="top"
          message="Resume is not uploaded !"
          time={null}
        />
      )}

      <Card>
        <Form
          onFinish={handleFinish}
          layout="vertical"
          form={form}
          initialValues={{
            any_role: any_role,
            any_location: any_location,
            open_for_job: open_for_job,
            open_for_internship: open_for_internship,
          }}
        >
          <Row justify="left">
            <Col span={FORM_SINGLE_FIELD_COLUMN_SPAN}>
              <RoleSelectForm
                any_role={any_role}
                name={"preferred_roles"}
                label={"Preferred Job Role"}
                multiselect={true}
                onAnyRoleChanged={onAnyRoleChanged}
                checkBox={true}
              />

              <LocationSelectForm
                any_location={any_location}
                name={"preferred_locations"}
                label={"Preferred Job Location"}
                multiselect={true}
                onAnyLocationChanged={onAnyLocationChanged}
                checkBox={true}
              />

              <WorkDomain name={"domain"} multiselect={true} label={"Preferred Domain"}/>

              {candidateDetails.fresher && (
                <>
                  <Form.Item
                    name="open_for_job"
                    valuePropName="checked"
                    style={{ marginBottom: "0px" }}
                  >
                    <Checkbox
                      checked={open_for_job}
                      onChange={onPRCheckboxChange}
                    >
                      Open for Job
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="date_of_joining">
                    <DatePicker
                      disabled={!open_for_job}
                      placeholder="Available From"
                      disabledDate={disabledDate}
                    />
                  </Form.Item>

                  <Form.Item
                    name="open_for_internship"
                    valuePropName="checked"
                    style={{ marginBottom: "0px" }}
                  >
                    <Checkbox
                      checked={open_for_internship}
                      onChange={onOFICheckboxChange}
                    >
                      Open For Internship
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="internship_start_date">
                    <RangePicker
                      picker="month"
                      placeholder={["From", "To"]}
                      disabled={!open_for_internship}
                      disabledDate={(current) => {
                        return moment() >= current;
                      }}
                    />
                  </Form.Item>
                </>
              )}

              <SkillsSelectForm
                value={prim_skills}
                label={"Primary Technical Skills (Max Six skills)"}
                name={"p_tech_skills"}
                required={false}
                multiselect={true}
                maxSixSkills={true}
              />

              <SkillsSelectForm
                value={other_tech_skills}
                label={SECONDARY_SKILLS+""+"(Max Six skills)"}
                name={"o_tech_skills"}
                multiselect={true}
                maxSixSkills={true}
              />

              <SkillsSelectForm
                value={non_tech_skills}
                label={"Non Technical Skills"}
                name={"non_tech_skills"}
                multiselect={true}
                maxSixSkills={true}
              />

              <Form.Item label="Links">
                <Form.List
                  name="links"
                  initialValue={[{ LinkType: "GitHub", Link: "" }]}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: "flex",
                            marginBottom: 5,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            name={[name, "LinkType"]}
                            rules={[
                              {
                                required: true,
                                message: "Required type!",
                              },
                            ]}
                          >
                            <Select
                              style={{
                                width: "110px",
                              }}
                            >
                              <Option value="GitHub">GitHub</Option>
                              <Option value="LinkedIn">LinkedIn</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, "Link"]}
                            style={{ width: "405px" }}
                            rules={[
                              {
                                type: "url",
                                // warningOnly: true,
                                required: true,
                                message: "Required url!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          {console.log("fields", fields)}
                          <MinusCircleOutlined
                            onClick={() => {
                              remove(name);
                              set_no_of_links(no_of_links - 1);
                            }}
                          />
                        </Space>
                      ))}

                      {no_of_links < MAX_URL_LINKS && (
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                              set_no_of_links(no_of_links + 1);
                            }}
                            icon={<PlusOutlined />}
                          ></Button>
                        </Form.Item>
                      )}
                    </>
                  )}
                </Form.List>
              </Form.Item>

              {/* <Form.Item label="Attach Resume" name="resume">
        <UploadDocs candId={candidateDetails.id} dirName="resume" onS3Upload={onS3Upload}/>
      </Form.Item> */}

              <Form.Item label="Attach Resume" name="resume">
                <UploadResume
                  candId={candidateDetails.id}
                  onS3Upload={onS3Upload}
                />
              </Form.Item>
              {/* {showWarning && <Alert message="You still haven't uploaded your resume." type="warning"/>} */}
              <br />
              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
export default CandidateJobPreferencesForm;
