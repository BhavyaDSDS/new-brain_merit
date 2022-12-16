import React, { useEffect, useState, useRef, useCallback, } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Select,
  Input,
  Space,
  InputNumber,
  Slider,
  Radio,
  DatePicker,
} from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import RoleSelectForm from "./RoleSelectForm";
import JobLocationSelectForm from "./LocationSelectForm";
import { useSelector, useDispatch } from "react-redux";
import SkillsSelectForm from "./SkillsSelectForm";
import RichTextEditors from "../utils/RichTextEditors";
import FormBuilder from "antd-form-builder";
import { addJobPosting, updateJobPosting } from "../../employers/employerSlice";
import { CANDIDATE_MAX_EXP } from "../../../constants";
import moment from "moment";
import { SECONDARY_SKILLS } from "../../../constants";
import { trueColor } from "@cloudinary/url-gen/qualifiers/colorSpace";
/* Needs to be removed once backend is integrated */
const prim_skills = "";
const other_tech_skills = "";
const non_tech_skills = "";

function CreateJobPosting(props) {
  const {
    cardTitle,
    experience,
    salaryLabel,
    jobType,
    required,
    editableForm,
    jobPostingDetails,
    onFinishJobPosting,
    onModalCancel
  } = props;
  const [JobRole, setJobRole] = useState("Software Engg");
  const [PrefLocation, setPrefLocation] = useState("Mysore");
  const [responsibility, setResponsibility] = useState("");
  const [minimumRequir, setMinimumRequir] = useState("");
  const [prefiredRequir, setPrefiredRequir] = useState("");
  const [draft, setDraft] = useState(false);
  const [form] = Form.useForm();
  const employerId = useSelector((state) => state.employer.listEmployers);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const [application_closes_on, setapplication_closes_on] = useState(true);
  const [interviewerinputs, setInterviewerinputs] = useState("");

  const [test, setTest] = useState("ghjkhdgsf")


  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);





  const [jobInput, seJobInput] = useState();
  //  console.log("EmployerId from Jobpostion= ",JSON.stringify(employerId))
  const dispatch = useDispatch();

  var empId;
  if (JSON.stringify(employerId) !== "{}") {
    empId = employerId.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  if (!experience) {
    var text = "KPM";
  } else {
    var text = "LPA";
  }
 
  // const formatter = (value) => `${value} ${text}`;
  const markLPA = {
    5: "5LPA",
    20: "20LPA",
    40: "40LPA",
    60: "60LPA",
    80: "80LPA",
    99: "99LPA",
  };
  const formatterLPA = (value) => `${value} LPA`;
  const formatterYears = (value) => `${value} YRS`;
  const expirienced = { 0: "0y", 10: "10y", 20: "20y", 30: "30y" };

  const handleFinish = React.useCallback(
    (values) => {
      //console.log("data ****###**",jobPostingDetails.id) 
      // console.log("EmployerId from Jobpostion= ",employerId)
      console.log("value", values);

      var active;
      draft ? (values.active = false) : (values.active = true);
      // console.log("draft value =", draft)

      if (!experience) {
        values.total_exp = null;
        values.relevant_exp = null;
        values.job_type = "intern";
      }

      values.salary_range_min = values.salary_range[0] * 100000;
      values.salary_range_max = values.salary_range[1] * 100000;
      values.responsibilities = responsibility;
      values.minimum_requirements = minimumRequir;
      values.preferred_requirements = prefiredRequir;
      values.interviewer_inputs = interviewerinputs;

      if (values.application_closes_on) {
        values.application_closes_on = values.application_closes_on.format(
          "YYYY-MM-DD"
        );
      }

      console.log(
        "WWWWWOOOOORRRKK LLLLLLLOOOOOCCCCCAAAAAAAAATTTTTTIIIIOOOOONN",
        values.work_locations
      );
      console.log("form values = ", values);
      // console.log("JSON values = ", JSON.stringify(values));
      //  dispatch(addJobPosting(values));
      let valuesCopy = _.cloneDeep(values);
      onFinishJobPosting(valuesCopy);
      hideModal();


    },
    [responsibility, minimumRequir, prefiredRequir, draft, interviewerinputs]
  );

  var options;
  if (JSON.stringify(locationsList) !== "{}") {
    options = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  const selectProps1 = {
    style: {
      width: "100%",
    },
    options,
  };
  let req = true;
  const meta = {
    formItemLayout: null,
    columns: 2,
    fields: [
      {
        key: "employer",
        label: "Employer",
        widget: "select",
        options: empId,
        //required: true,
        required: true,
        colSpan: 2,
      },
    ],
  };
  console.log("jobPostingDetailsjobPostingDetailsjobPostingDetails", jobPostingDetails)

  useEffect(() => {

    if (editableForm === true) {



      console.log("jobPostingDetails.responsibilities", jobPostingDetails.responsibilities)
      let benefit;
      //  // console.log("edit form ====", jobPostingDetails.benefits)
      if (jobPostingDetails.benefits.length > 0 && jobPostingDetails.benefits != undefined) {
        benefit = jobPostingDetails.benefits.map(current => {
          return { points: current }
        })
      }
      setResponsibility(jobPostingDetails.responsibilities)
      setMinimumRequir(jobPostingDetails.minimum_requirements)
      setPrefiredRequir(jobPostingDetails.preferred_requirements)
      setInterviewerinputs(jobPostingDetails.interviewer_inputs)
      // setInterviewerinputs(jobPostingDetails.interviewer_inputss)

      // let salary_range=jobPostingDetails.salary_range.map(current =>{
      //   return {}
      // })
      // let salary_range_max=jobPostingDetails.salary_range_max;
      // let salary_range_min=jobPostingDetails.salary_range_min;          
      // console.log("responsibilities",jobPostingDetails.benefits.responsibility)
      // console.log("responsibilities",jobPostingDetails.responsibilities)
      // console.log("expirirnce",experience)
      // console.log("interview before --------",test)
      // setTest("I am working....")
      //  console.log("interview after--------",jobPostingDetails.salary_range_min)
      // setTest(test)
      // if(application_closes_on != null)
      // {
      //   application_closes_on=moment(jobPostingDetails.application_closes_on)
      // }

      //console.log("points:current",benefits)
      form.setFieldsValue({

        role: jobPostingDetails.role,
        job_title: jobPostingDetails.job_title,
        how_to_apply: jobPostingDetails.how_to_apply,
        total_exp: jobPostingDetails.total_exp,
        relevant_exp: jobPostingDetails.relevant_exp,
        tags: jobPostingDetails.tags,
        pri_tech_skills: jobPostingDetails.pri_tech_skills,
        sec_tech_skills: jobPostingDetails.sec_tech_skills,
        work_locations: jobPostingDetails.work_locations,
        non_tech_skills: jobPostingDetails.non_tech_skills,
        //application_closes_on: application_closes_on,
        // salary_range_min:jobPostingDetails.salary_range_min,
        // salary_range_max:salary_range_max,
        benefits: benefit,
        salary_range: [jobPostingDetails.salary_range_min / 100000, jobPostingDetails.salary_range_max / 100000],


        //responsibility: resp,
        //minimumRequir: jobPostingDetails.minimumRequir,
        // prefiredRequir: jobPostingDetails.prefiredRequir,
        // jobDescrption: jobPostingDetails.jobDescrption,
        employer: jobPostingDetails.employer,

      });
      // if(jobPostingDetails.benefits != null)
      // {

      // }
      if (jobPostingDetails.application_closes_on != null) {
        form.setFieldsValue({
          application_closes_on: moment(jobPostingDetails.application_closes_on, "YYYY-MM-DD"),
        });
      }

      showModal();
    }



  }, [])


  return (
    <>

      {!editableForm ?
        <>
          <Card title={cardTitle}>
            <Form
              onFinish={handleFinish}
              layout="vertical"
              initialValues={{
                salary_range: [12, 21],
                job_type: "full",
              }}
            >
              <Row justify="left">
                <Col span={14}>
                  <FormBuilder meta={meta} form={form} />

                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Job Title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* <Form.Item label="Role"  name="role" rules={[
                {required:true,
                  message:"Please input the Job role"},
                ]}> */}

                  <RoleSelectForm
                    value={JobRole}
                    name={"role"}
                    label={"Role"}
                    required={true}
                  />
                  {/* </Form.Item> */}

                  <Form.Item label="Description">
                    <div
                      style={{
                        border: "1px solid #dcdfe3",
                        borderRadius: 5,
                        padding: 20,
                        marginBottom: 20,
                      }}
                    >
                      <Form.Item label="Responsibility">
                        <RichTextEditors setValue={setResponsibility} value={responsibility} />
                      </Form.Item>
                      <Form.Item label="Minimum requirement">
                        <RichTextEditors setValue={setMinimumRequir} value={minimumRequir} />
                      </Form.Item>
                      <Form.Item label="Preferred requirement">
                        <RichTextEditors setValue={setPrefiredRequir} value={prefiredRequir} />
                      </Form.Item>
                    </div>
                  </Form.Item>
                  {experience ? (
                     <Form.Item label="Interviewers Input">
                     <RichTextEditors setValue={setInterviewerinputs} value={interviewerinputs} />
                   </Form.Item>
                  ) : null}
                  {/* {experience ? (
                    <Form.Item name="interviewer_inputs" label="Interviewer Inputs">
                      <RichTextEditors
                        setValue={setInterviewerinputs} value={interviewerinputs}
                      />
                    </Form.Item>
                  ) : null} */}

                  <SkillsSelectForm
                    value={prim_skills}
                    label={"Primary Technical Skills"}
                    name={"pri_tech_skills"}
                    required={false}
                    multiselect={true}
                  />

                  <SkillsSelectForm
                    value={other_tech_skills}
                    label={SECONDARY_SKILLS}
                    name={"sec_tech_skills"}
                    multiselect={true}
                  />

                  <SkillsSelectForm
                    value={non_tech_skills}
                    label={"Non Technical Skills"}
                    name={"non_tech_skills"}
                    multiselect={true}
                  />

                  {experience ? (
                    <div>
                      <Form.Item
                        label="Total Experience"
                        name="total_exp"
                        rules={[
                          {
                            required: false,
                            message: "Please input your Total Experience!",
                          },
                        ]}
                      >
                        <Slider
                          tipFormatter={formatterYears}
                          marks={expirienced}
                          min={0}
                          max={CANDIDATE_MAX_EXP}
                        />
                        {/* //   <Slider marks={expirience} min={0} max={ CANDIDATE_MAX_EXP} /> */}
                      </Form.Item>
                      <Form.Item
                        label="Relevant Experience"
                        name="relevant_exp"
                        dependencies={["total_exp"]}
                        rules={[
                          {
                            required: false,
                            message: "Please input your Relevant Experience!",
                          },

                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              console.log(
                                " total_experience ==== rel exp value",
                                getFieldValue("total_exp"),
                                value
                              );
                              if (
                                value === undefined ||
                                getFieldValue("total_exp") >= value
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
                          marks={expirienced}
                          step={0.1}
                          min={0}
                          max={CANDIDATE_MAX_EXP}
                        // tooltipVisible="true"
                        // defaultValue={3}
                        />
                      </Form.Item>{" "}
                    </div>
                  ) : null}

                  <Form.Item label={salaryLabel} name="salary_range">
                    <Slider
                      tipFormatter={formatterLPA}
                      formate="LPA"
                      range
                      step={0.25}
                      min={1}
                      max={99}
                      marks={markLPA}
                      //tipFormatter={markLPA}
                      // tooltipVisible="true"
                      defaultValue={[12, 21]}
                    />
                  </Form.Item>

                  <Form.Item label="Work Locations">
                    <Form.List name="work_locations">
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
                              <Input.Group compact>
                                <Form.Item
                                  style={{ width: 400 }}
                                  name={[name, "location_id"]}
                                  {...restField}
                                >
                                  <Select
                                    {...selectProps1}
                                    style={{
                                      width: 400,
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item name={[name, "type"]}>
                                  <Select
                                    style={{
                                      width: 100,
                                    }}
                                  >
                                    <Option value="office">OFFICE</Option>
                                    <Option value="remote">REMOTE</Option>
                                    <Option value="hybrid">HYBRID</Option>
                                  </Select>
                                </Form.Item>
                              </Input.Group>

                              {console.log("fields", fields)}
                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Add WorkLocation
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  {jobType ? (
                    <Form.Item name="job_type" label="Job Type">
                      <Radio.Group>
                        <Radio value="full">Full time</Radio>
                        {/* <Radio value="part">Part time</Radio> */}
                        <Radio value="temp">Contract</Radio>
                      </Radio.Group>
                    </Form.Item>
                  ) : null}

                  <Form.Item label="Benefits">
                    <Form.List name="benefits" style={{ width: 1000 }}>
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
                                {...restField}
                                name={[name, "points"]}
                                style={{ width: 600 }}
                              >
                                <Input />
                              </Form.Item>
                              {console.log("fields", fields)}

                              <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Add Benefits
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                  <Form.Item name="how_to_apply" label="How to apply">
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="application_closes_on"
                    label="Applications close on"
                  >
                    <DatePicker
                      disabled={!application_closes_on}
                      placeholder="Available From"
                      disabledDate={(current) => {
                        return current && current < moment().startOf("day");
                      }}
                    />
                  </Form.Item>

                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item>
                      <Button onClick={() => setDraft(true)} htmlType="submit">
                        Save as draft
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => setDraft(false)}
                      >
                        Post job
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card>
        </> : <>

          <Modal
            maskClosable={false}
            visible={modalVisible}
            footer={null}
            title={"Update JobPosting"}
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
              <Form
                onFinish={handleFinish}
                layout="vertical"
                initialValues={{
                  salary_range: [12, 21],
                  job_type: "full",
                }}
                form={form}
              >
                <Row >
                  <Col span={18}>
                    <FormBuilder meta={meta} form={form} />

                    <Form.Item
                      label="Job Title"
                      name="job_title"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Job Title!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    {/* <Form.Item label="Role"  name="role" rules={[
                {required:true,
                  message:"Please input the Job role"},
                ]}> */}

                    <RoleSelectForm
                      value={JobRole}
                      name={"role"}
                      label={"Role"}
                      required={true}
                    />
                    {/* </Form.Item> */}

                    <Form.Item label="Description">
                      <div
                        style={{
                          border: "1px solid #dcdfe3",
                          borderRadius: 5,
                          padding: 20,
                          marginBottom: 20,
                        }}
                      >
                        <Form.Item label="Responsibility">
                          <RichTextEditors setValue={setResponsibility} value={responsibility} />
                        </Form.Item>
                        <Form.Item label="Minimum requirement">
                          <RichTextEditors setValue={setMinimumRequir} value={minimumRequir} />
                        </Form.Item>
                        <Form.Item label="Preferred requirement">
                          <RichTextEditors setValue={setPrefiredRequir} value={prefiredRequir} />
                        </Form.Item>
                      </div>
                    </Form.Item>
                    {/* {experience ? (
                      <Form.Item name="interviewer_inputs" label="Interviewer Inputs" >
                        <RichTextEditors
                          setValue={setInterviewerinputs} value={interviewerinputs}

                        />
                      </Form.Item>
                    ) : null} */}
                     {experience ? (
                     <Form.Item label="Interviewers Input">
                     <RichTextEditors setValue={setInterviewerinputs} value={interviewerinputs} />
                   </Form.Item>
                  ) : null}


                    <SkillsSelectForm
                      value={prim_skills}
                      label={"Primary Technical Skills"}
                      name={"pri_tech_skills"}
                      required={false}
                      multiselect={true}
                    />

                    <SkillsSelectForm
                      value={other_tech_skills}
                      label={SECONDARY_SKILLS}
                      name={"sec_tech_skills"}
                      multiselect={true}
                    />

                    <SkillsSelectForm
                      value={non_tech_skills}
                      label={"Non Technical Skills"}
                      name={"non_tech_skills"}
                      multiselect={true}
                    />

                    {experience ? (
                      <div>
                        <Form.Item
                          label="Total Experience"
                          name="total_exp"
                          rules={[
                            {
                              required: false,
                              message: "Please input your Total Experience!",
                            },
                          ]}
                        >
                          <Slider
                            tipFormatter={formatterYears}
                            marks={expirienced}
                            min={0}
                            max={CANDIDATE_MAX_EXP}
                          />
                          {/* //   <Slider marks={expirience} min={0} max={ CANDIDATE_MAX_EXP} /> */}
                        </Form.Item>
                        <Form.Item
                          label="Relevant Experience"
                          name="relevant_exp"
                          dependencies={["total_exp"]}
                          rules={[
                            {
                              required: false,
                              message: "Please input your Relevant Experience!",
                            },

                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                console.log(
                                  " total_experience ==== rel exp value",
                                  getFieldValue("total_exp"),
                                  value
                                );
                                if (
                                  value === undefined ||
                                  getFieldValue("total_exp") >= value
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
                            marks={expirienced}
                            step={0.1}
                            min={0}
                            max={CANDIDATE_MAX_EXP}
                          // tooltipVisible="true"
                          // defaultValue={3}
                          />
                        </Form.Item>{" "}
                      </div>
                    ) : null}

                    <Form.Item label={salaryLabel} name="salary_range">
                      <Slider
                        tipFormatter={formatterLPA}
                        formate="LPA"
                        range
                        step={0.25}
                        min={1}
                        max={99}
                        marks={markLPA}
                        //tipFormatter={markLPA}
                        // tooltipVisible="true"
                        defaultValue={[12, 21]}
                      />
                    </Form.Item>

                    <Form.Item label="Work Locations">
                      <Form.List name="work_locations">
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
                                <Input.Group compact>
                                  <Form.Item
                                    style={{ width: 400 }}
                                    name={[name, "location_id"]}
                                    {...restField}
                                  >
                                    <Select
                                      {...selectProps1}
                                      style={{
                                        width: 400,
                                      }}
                                    />
                                  </Form.Item>
                                  <Form.Item name={[name, "type"]}>
                                    <Select
                                      style={{
                                        width: 100,
                                      }}
                                    >
                                      <Option value="office">OFFICE</Option>
                                      <Option value="remote">REMOTE</Option>
                                      <Option value="hybrid">HYBRID</Option>
                                    </Select>
                                  </Form.Item>
                                </Input.Group>

                                {console.log("fields", fields)}
                                <MinusCircleOutlined onClick={() => remove(name)} />
                              </Space>
                            ))}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                              >
                                Add WorkLocation
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    {jobType ? (
                      <Form.Item name="job_type" label="Job Type">
                        <Radio.Group>
                          <Radio value="full">Full time</Radio>
                          {/* <Radio value="part">Part time</Radio> */}
                          <Radio value="temp">Contract</Radio>
                        </Radio.Group>
                      </Form.Item>
                    ) : null}

                    <Form.Item label="Benefits">
                      <Form.List name="benefits" style={{ width: 1000 }}>
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
                                  {...restField}
                                  name={[name, "points"]}
                                  style={{ width: 600 }}
                                >
                                  <Input />
                                </Form.Item>
                                {console.log("fields", fields)}

                                <MinusCircleOutlined onClick={() => remove(name)} />
                              </Space>
                            ))}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                              >
                                Add Benefits
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    <Form.Item name="how_to_apply" label="How to apply">
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="application_closes_on"
                      label="Applications close on"
                    >
                      <DatePicker
                        disabled={!application_closes_on}
                        placeholder="Available From"
                        disabledDate={(current) => {
                          return current && current < moment().startOf("day");
                        }}
                      />
                    </Form.Item>

                    <div style={{ display: "flex", gap: 10 }}>
                      <Form.Item>
                        {/* <Button onClick={() => setDraft(true)} htmlType="submit">
                        Save as draft
                      </Button> */}
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() => setDraft(false)}
                        >
                          Post job
                        </Button>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
               </div>
               </Modal>

     </>
      }
 </>
  );
}

export default CreateJobPosting;
