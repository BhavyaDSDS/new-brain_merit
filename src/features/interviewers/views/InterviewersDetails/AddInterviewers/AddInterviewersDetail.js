import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Slider,
  InputNumber,
  Checkbox,
  Space,
  TimePicker,
  Modal,
} from "antd";
import { addInterviewer } from "../../../interviewerSlice";
import { useHistory } from "react-router-dom";
import CloudinaryUploadWidget from "./../../../../components/utils/CloudinaryUploadWidget";
import FormBuilder from "antd-form-builder";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import en from "world_countries_lists/data/countries/en/world.json";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import CompaniesSelectForm from "../../../../components/form/CompaniesSelectForm";
import DomainSelectForm from "../../../../components/form/DomainSelectForm";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import WorkDomain from "../../../../components/form/WorkDomain";
import CandidateInterviewAvailability from "../../../../components/form/CandidateInterviewAvailability";
import { CANDIDATE_AVAILABLE_SLOTS } from "../../../../../constants";
import { CANDIDATE_MAX_EXP } from "../../../../../constants";
import { FormContext } from "antd/lib/form/context";
import { SECONDARY_SKILLS } from "../../../../../constants";
import moment from "moment";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";

function AddInterviewersDetail(props) {
  const { editableForm, onFinishInterviewersDetail, onModalCancel, testing } = props;
  // const { empId, onSetEmpId } = props;
  // const [loading] = useState(false);
  const PercformatterGrt = (value) => `>= ${value} %`;
  const [image, setImage] = useState(null);
  // const [isNew, setIsNew] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [value, setValue] = useState({ short: "IN", phone: "" });
  const [available_slot, setAvailable_slot] = useState(2);
  const [activeCheck, setActivecheck] = useState(false);

  const [form] = Form.useForm();
  const interviewersDetails = useSelector((state) => state.interviewer.interviewerDetail)


  // const interviewer = useSelector(
  //   (state) => state.interviewer);
  //   console.log("interviewer",interviewer)
  // var  interviewerDetails=interviewer.interviewerDetail;
  //console.log("recordKeyrecordKeyrecordKeyrecordKey",recordKey)

  // const [domain, setDomain] = useState("Computer Software");
  // console.log("interviewerDetails ********#############********",interviewerDetails)
  //console.log("recordKeyrecordKeyrecordKeyrecordKey",interviewersDetails)

  const history = useHistory();

  const dispatch = useDispatch();
  // console.log("interviewersList ********#############********",interviewerDetails)


  const activeslot = (a) => {
    //console.log("activeslot",a.target.checked)
    setActivecheck(a.target.checked)

  }
  const handleFinish = React.useCallback(
    (values) => {
      console.log("values  ********##############*******", values)
     if (values.availablity_for_interview != undefined) {
        //if (objectLength(values.availablity_for_interview) > 0) {

        values.availablity_for_interview = values.availablity_for_interview.map(
          (info) => {
            return {
              day: info.day,
              time: info.time.map((t) => {
                return t.format("HH:mm");
              }),
              type: "Available"
            };
          }
        );
      }

      values.photo = image;
      console.log("interviewers details =", values);
      console.log("JSON formate =", JSON.stringify(values));

      // dispatch(addInterviewer(values));
      // history.push("/interviewerslist")



      let valuesCopy = _.cloneDeep(values);
      console.log("valuesCopy", valuesCopy)
      onFinishInterviewersDetail(values)
      hideModal();
      // testing(values)
    },
    [value, image]
  );
  useEffect(() => {
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",interviewersDetails);
    if (editableForm === true){
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",interviewersDetails);

      setActivecheck(interviewersDetails.active)

    var interviewSlot;
    if (objectLength(interviewersDetails.availablity_for_interview) > 0) {
      interviewSlot = interviewersDetails.availablity_for_interview.map(
        (a, idx) => {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",a)
          return {
            day:a.day,
            time: a.time.map((b) => {
              return moment(b, "h:mm a");
            }),
          };
        }
      );
      setAvailable_slot(interviewersDetails.availablity_for_interview.length);
    }
   // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",interviewSlot);
      
    {
      form.setFieldsValue({

        first_name: interviewersDetails.first_name,
        last_name: interviewersDetails.last_name,
        companies_worked_for: interviewersDetails.companies_worked_for,
        linkedin_profile: interviewersDetails.linkedin_profile,
        no_of_interviews_conducted: interviewersDetails.no_of_interviews_conducted,
        availablity_for_interview:interviewSlot,
        domains: interviewersDetails.domains,
        email: interviewersDetails.email,
        image: interviewersDetails.image,
        phone_number: interviewersDetails.phone_number,
        pri_tech_skills: interviewersDetails.pri_tech_skills,
        relevant_experience: interviewersDetails.relevant_experience,
        sec_tech_skills: interviewersDetails.sec_tech_skills,
        total_exp: interviewersDetails.total_exp,
        active: interviewersDetails.active,

      });
      // if (interviewersDetails.availablity_for_interview != null) {
      //   form.setFieldsValue({
      //     availablity_for_interview: moment(interviewersDetails.availablity_for_interview, "YYYY-MM-DD"),
      //   });
      // }


      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", interviewersDetails);

    }
      showModal();

    }
  }, []);
  function onWidgetUpload(url) {
    console.log(" onWidgetUpload image url", url);
    setImage(url);
  }
  const formatterYears = (value) => `${value} YRS`;
  const formatternumber = (value) => `${value}`;
  const intervieweConducted = {
    0: "0",
    30: "30",
    60: "60",
    90: "90",
    120: "120",
  };
  const expirience = { 0: "0y", 10: "10y", 20: "20y", 30: "30y" };

  return (
    <>
      {!editableForm && (
        <Card title="Add Interviewers">
          <Card>
            <Row>
              <Col span={12}>
                <ConfigProvider locale={en}>
                  <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                      phone_number: { phone: "", code: 91, short: "IN" },
                      active: false,
                    }}
                    scrollToFirstError
                  >

                    <Form.Item label="Profile photo" name="image">
                      <CloudinaryUploadWidget
                        photo={image}
                        onWidgetUpload={onWidgetUpload}
                        name="Upload Profile Image"
                      />
                    </Form.Item>
                    {/* <Form.Item label="Name" name="name"  style={{ width: "80%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your first Name!",
                    },]}
                  >
                    <Input />
                  </Form.Item> */}





                    <Row>
                      <Col span={12}>
                        <Form.Item label="First Name" name="first_name" style={{ width: "80%" }}
                          rules={[
                            {
                              required: true,
                              message: "Please input your first Name!",
                            },]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Last Name" name="last_name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                            },]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Phone Number"
                          name="phone_number"
                          style={{ width: "80%" }}
                          rules={[
                            { required: true },
                            {
                              validator(_, value) {
                                if (value.phone === "") {
                                  return Promise.reject(new Error("'Phone number' is Required!"));
                                } else {
                                  if (value.phone.length === 10 && !value.phone.includes("e") && !value.phone.includes(".")) {
                                    return Promise.resolve();
                                  } else {
                                    return Promise.reject(new Error('Please,Enter 10 digit Mobile Number!'));
                                  }
                                }
                              }
                            }
                          ]}
                        >
                          <CountryPhoneInput

                            placeholder="Enter your Number"
                            maxLength={10}
                            size="small"
                            type={"number"}
                            controls={false}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Email" name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },]}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      label="Linkedin"
                      name="linkedin_profile"
                      rules={[
                        {
                          required: true,
                        },
                        {
                          type: "url",
                          warningOnly: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <CompaniesSelectForm
                      title="Companies worked for"
                      name="companies_worked_for"
                      multiselect={false}
                    />


                    <WorkDomain name="domains" multiselect={true} />

                    <SkillsSelectForm
                      label="Primary Technical Skills"
                      name="pri_tech_skills"
                      multiselect={true}
                    />

                    <SkillsSelectForm
                      label={SECONDARY_SKILLS}
                      name="sec_tech_skills"
                      multiselect={true}
                    />

                    <Form.Item
                      label="No.of Interviews conducted"
                      name="no_of_interviews_conducted"
                    >
                      <Slider
                        tipFormatter={formatternumber}
                        marks={intervieweConducted}
                        min={0}
                        max={150}

                      />

                    </Form.Item>
                    {/* 
                  <Form.Item
                    label="Cost per interviews"
                    name="cost_per_interview"
                  >
                    <InputNumber controls={false} />
                  </Form.Item> */}

                    <Form.Item name="active" valuePropName="checked">

                      <Checkbox onChange={activeslot}>Active</Checkbox>
                    </Form.Item>

                    {
                      activeCheck ? <CandidateInterviewAvailability
                        label="Availabl slot (Min two-slot)"
                        name="availablity_for_interview"
                        setAvailable_slot={setAvailable_slot}
                        available_slot={available_slot}
                        interviewer={true}
                      /> : null

                    }

                    <Form.Item label="Total experience" name="total_exp">
                      <Slider
                        tipFormatter={formatterYears} marks={expirience} min={0} max={CANDIDATE_MAX_EXP} />
                    </Form.Item>

                    <Form.Item
                      label="Relevant Experience"
                      name="relevant_experience"
                      dependencies={["total_exp"]}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              getFieldValue("total_exp") >= value ||
                              value === undefined
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Relevant exp entered is more than total exp!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Slider
                        tipFormatter={formatterYears}
                        marks={expirience}
                        step={0.1}
                        min={0}
                        max={CANDIDATE_MAX_EXP}
                      // tooltipVisible="true"
                      // defaultValue={3}
                      />
                    </Form.Item>
                    {/* <Form.Item name="active" valuePropName="checked" >
                    
                    <Checkbox  checked={activeAvailabel} onChange={availabelactive}>Active
                  
                    </Checkbox>
                  </Form.Item> */}

                    {/* <CandidateInterviewAvailability
                    label="Availabl slot (Min two-slot)"
                    name="availablity_for_interview"
                    setAvailable_slot={setAvailable_slot}
                    available_slot={available_slot}
                    interviewer={true}
                  /> */}

                    {/* <Form.Item name="active" valuePropName="checked">
                 
                    <Checkbox>Active</Checkbox>
                  </Form.Item> */}

                    <Form.Item wrapperCol={{ span: 18 }}>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </ConfigProvider>
              </Col>
            </Row>
          </Card>
        </Card>
      )}
      {editableForm && (
        <Modal
          maskClosable={false}
          visible={modalVisible}
          footer={null}
         title={"Update Primary Info"}
          destroyOnClose={true}
          onOk={() => form.submit()}
          onCancel={() => {
            hideModal();
            onModalCancel();
          }}
          okText={"Save"}
          width={700}
        >
          <div
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          >
            <ConfigProvider locale={en}>
              <Form
                layout="vertical"
                onFinish={handleFinish}
                initialValues={
                   {
                 phone_number: { phone: "", code: 91, short: "IN" },
                   active: false,
                }
                }
                scrollToFirstError
                form={form}
              >

                <Form.Item label="Profile photo" name="image">
                  <CloudinaryUploadWidget
                    photo={image}
                    onWidgetUpload={onWidgetUpload}
                    name="Upload Profile Image"
                  />
                </Form.Item>
                {/* <Form.Item label="Name" name="name"  style={{ width: "80%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your first Name!",
                    },]}
                  >
                    <Input />
                  </Form.Item> */}





                <Row>
                  <Col span={12}>
                    <Form.Item label="First Name" name="first_name" style={{ width: "80%" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your first Name!",
                        },]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Last Name" name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your last name!",
                        },]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone_number"
                      style={{ width: "80%" }}
                      rules={[
                        { required: true },
                        {
                          validator(_, value) {
                            if (value.phone === "") {
                              return Promise.reject(new Error("'Phone number' is Required!"));
                            } else {
                              if (value.phone.length === 10 && !value.phone.includes("e") && !value.phone.includes(".")) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(new Error('Please,Enter 10 digit Mobile Number!'));
                              }
                            }
                          }
                        }
                      ]}
                    >
                      <CountryPhoneInput

                        placeholder="Enter your Number"
                        maxLength={10}
                        size="small"
                        type={"number"}
                        controls={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email" name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Linkedin"
                  name="linkedin_profile"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "url",
                      warningOnly: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <CompaniesSelectForm
                  title="Companies worked for"
                  name="companies_worked_for"
                  multiselect={false}
                />


                <WorkDomain name="domains" multiselect={true} />

                <SkillsSelectForm
                  label="Primary Technical Skills"
                  name="pri_tech_skills"
                  multiselect={true}
                />

                <SkillsSelectForm
                  label={SECONDARY_SKILLS}
                  name="sec_tech_skills"
                  multiselect={true}
                />

                <Form.Item
                  label="No.of Interviews conducted"
                  name="no_of_interviews_conducted"
                >
                  <Slider
                    tipFormatter={formatternumber}
                    marks={intervieweConducted}
                    min={0}
                    max={150}

                  />

                </Form.Item>
                {/* 
                  <Form.Item
                    label="Cost per interviews"
                    name="cost_per_interview"
                  >
                    <InputNumber controls={false} />
                  </Form.Item> */}

                <Form.Item name="active" valuePropName="checked">

                  <Checkbox onChange={activeslot}>Active</Checkbox>
                </Form.Item>

                {
                  activeCheck ? <CandidateInterviewAvailability
                    label="Availabl slot (Min two-slot)"
                    name="availablity_for_interview"
                    setAvailable_slot={setAvailable_slot}
                    available_slot={available_slot}
                    interviewer={true}
                  /> : null

                }

                <Form.Item label="Total experience" name="total_exp">
                  <Slider
                    tipFormatter={formatterYears} marks={expirience} min={0} max={CANDIDATE_MAX_EXP} />
                </Form.Item>

                <Form.Item
                  label="Relevant Experience"
                  name="relevant_experience"
                  dependencies={["total_exp"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          getFieldValue("total_exp") >= value ||
                          value === undefined
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Relevant exp entered is more than total exp!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Slider
                    tipFormatter={formatterYears}
                    marks={expirience}
                    step={0.1}
                    min={0}
                    max={CANDIDATE_MAX_EXP}
                  // tooltipVisible="true"
                  // defaultValue={3}
                  />
                </Form.Item>
                {/* <Form.Item name="active" valuePropName="checked" >
                    
                    <Checkbox  checked={activeAvailabel} onChange={availabelactive}>Active
                  
                    </Checkbox>
                  </Form.Item> */}

                {/* <CandidateInterviewAvailability
                    label="Availabl slot (Min two-slot)"
                    name="availablity_for_interview"
                    setAvailable_slot={setAvailable_slot}
                    available_slot={available_slot}
                    interviewer={true}
                  /> */}

                {/* <Form.Item name="active" valuePropName="checked">
                 
                    <Checkbox>Active</Checkbox>
                  </Form.Item> */}

                <Form.Item wrapperCol={{ span: 18 }}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>


          </div>
        </Modal>
      )}
    </>
  );
}

export default AddInterviewersDetail;
