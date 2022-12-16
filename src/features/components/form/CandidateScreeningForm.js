import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Form,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  Space,
  Radio,
  Select,
  Input,
  Checkbox,
  DatePicker,
  Card,
  TimePicker,
  Slider,
} from "antd";
import moment from "moment";
import RoleSelectForm from "./RoleSelectForm";
import LocationSelectForm from "./LocationSelectForm";
import ResignedSelectForm from "./ResignedSelectForm";
import {
  CANDIDATE_JOB_CHANGE_STATUS,
  CANDIDATE_AVAILABLE_SLOTS,
  CANDIDATE_MAX_EXP,
  CANDIDATE_IMMEDIATE_JOIN,
} from "../../../constants";
import CandidateInterviewAvailability from "./CandidateInterviewAvailability";
import CandidateJobChangeStatus from "./CandidateJobChangeStatus";
import CandidateScreeningComment from "./CandidateScreeningComment";
import CandidateCtcSlider from "./CandidateCtcSlider";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;
const { RangePicker } = DatePicker;

function CandidateScreeningForm(props, ref) {
  const { submitData, Editable, fresher } = props;
  const [any_role, setany_role] = useState(false);
  const [any_location, setany_location] = useState(false);
  const [any_workType, setWorkType] = useState(false);
  const [exp_ctc, setExp_ctc] = useState(false);
  const [resigned, setResigned] = useState(true);
  const [joinDate, setJoinDate] = useState(false);
  const [job_status, setJobStatus] = useState(true);
  const [negotiable, setNegotiable] = useState(false);
  const [buyout, setBuyout] = useState(false);
  const [placedDate, setPlacedDate] = useState(false);
  const [available_slot, setAvailable_slot] = useState(1);
  const [open_for_job, setopen_for_job] = useState(true);
  const [open_for_internship, setopen_for_internship] = useState(true);
  const [relevantExpShow, setrelevantExpShow] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const [form] = Form.useForm();

  const formIntialvalues = {
    any_role: any_role,
    // total_experience:0,
    // relevant_experience:0,
    current_ctc: 0,
    offer_in_hand_ctc: 0,
    expected_ctc_as_per_company_standards: !exp_ctc,
    expected_ctc: 0,
    any_location: any_location,
    relocation: true,
    resigned: resigned,
    joining: "immediate",
    notice_period_negotiable: "Non-negotiable",
    buy_out: false,
    workType_any: false,
    job_seakers_status: "active",
    open_for_job: true,
    open_for_internship: true,
  };

  const [formInit, setFormInit] = useState(formIntialvalues);

  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );

  // const candidateDetails = {}

  function onAnyRoleChanged(role) {
    setany_role(role);
  }

  // console.log("$$$$$$$$$$$$$",exp_ctc);

  function expCtcToggle(data) {
    console.log("check status =====", data);
    setExp_ctc(!data);
  }

  function onAnyLocationChanged(location) {
    setany_location(location);
  }

  function WorkType(data) {
    setWorkType(data);
  }

  const formatterYears = (value) => `${value} years`;
  const formatterLPA = (value) => `${value} LPA`;

  const markYears = { 5: "5y", 10: "10y", 15: "15y", 20: "20y", 30: "30y" };
  const markLPA = {
    5: "5LPA",
    20: "20LPA",
    40: "40LPA",
    60: "60LPA",
    80: "80LPA",
    99: "99LPA",
  };

  console.log("******************************************************");

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  const resetForm = () => {
    setExp_ctc(false);
    setany_role(false);
    setany_location(false);
    setJobStatus(true);
    setResigned(true);
    setJoinDate(false);
    setWorkType(false);
    setNegotiable(false);
    setBuyout(false);
    setPlacedDate(false);
    form.resetFields();
  };

  console.log("details of candidate..&&&&.", candidateDetails);

  const roleList = useSelector((state) => state.utils.roleList);
  var options;

  if (JSON.stringify(roleList) !== "{}") {
    options = roleList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  };

  const currentRole = (a) => {
    if (a === undefined) {
      setrelevantExpShow(false);
    } else {
      setrelevantExpShow(true);
    }
  };

  const onChangeAddRel = (v) => {
    setrelevantExpShow(v.target.checked);
  };

  const handleFinish = React.useCallback((values) => {
    console.log("from on edit clicked ********************", values);

    let date = new Date();
    let today = new Date().toISOString().slice(0, 10);
    values.screening_date = today;

    values.joining === "immediate" && (values.date_of_joining = date);

    if (values.timeline_to_follow_up != undefined) {
      values.timeline_to_follow_up = parseInt(values.timeline_to_follow_up);
      date.setDate(date.getDate() + values.timeline_to_follow_up);
      let followUpDate = date.toISOString().slice(0, 10);
      values.timeline_to_follow_up = followUpDate;
    }

    if(values.availablity_for_interview != undefined && values.availablity_for_interview != null){

      values.availablity_for_interview = values.availablity_for_interview.map((info) => {
        return {
          day: info.day.format("YYYY-MM-DD"),
          time: info.time.map((t) => {return t.format("HH:mm")}),
          type: "Available"
        }
      })
    }
    
    //console.log("from on edit clicked ********************", values);

    if (!candidateDetails.fresher) {
      if (values.joining === "immediate") {
        values.date_of_joining = today;
      } else {
        values.date_of_joining != undefined &&
          (values.date_of_joining = values.date_of_joining.format(
            "YYYY-MM-DD"
          ));
      }
    } else {
      if (!values.open_for_job) {
        values.date_of_joining = null;
      } else {
        values.date_of_joining != undefined &&
          (values.date_of_joining = values.date_of_joining.format(
            "YYYY-MM-DD"
          ));
      }
    }

    values.status_changed_date != undefined &&
      (values.status_changed_date = values.status_changed_date.format(
        "YYYY-MM-DD"
      ));

    if (values.internship_start_date && values.open_for_internship) {
      values.internship_from_date = values.internship_start_date[0].format(
        "YYYY-MM-01"
      );
      values.internship_to_date = values.internship_start_date[1].format(
        "YYYY-MM-01"
      );
    } else {
      values.internship_from_date = null;
      values.internship_to_date = null;
    }

    values.current_ctc != undefined &&
      (values.current_ctc = values.current_ctc * 100000);
    values.expected_ctc != undefined &&
      (values.expected_ctc = values.expected_ctc * 100000);
    values.offer_in_hand_ctc != undefined &&
      (values.offer_in_hand_ctc = values.offer_in_hand_ctc * 100000);

    console.log("Screening elements ====", values);
    resetForm();
    submitData(values);
    hideModal();
  }, []);

  const onEdit = () => {
    console.log("edit candidate details before ====", candidateDetails);

    if (candidateDetails.any_role != false) {
      setany_role(true);
    }

    if (candidateDetails.expected_ctc_as_per_company_standards != true) {
      setExp_ctc(true);
    }

    if (candidateDetails.any_location != false) {
      setany_location(true);
    }

    let work;
    if (candidateDetails.work_type[0] != "Any") {
      setWorkType(false);
    }

    // if (candidateDetails.work_type.length === 0) {
    //   work = true;
    //   setWorkType(true);
    // }

    if (candidateDetails.job_seakers_status === "passive") {
      setJobStatus(false);
    } else if (candidateDetails.job_seakers_status === "placed") {
      setPlacedDate(true);
    }

    let status;
    let today = new Date().toISOString().slice(0, 10);

    if (today >= candidateDetails.date_of_joining) {
      status = "immediate";
    } else {
      status = "lwd";
      setJoinDate(true);
    }

    if (!candidateDetails.resigned) {
      setResigned(false);
    }

    if (candidateDetails.notice_period != undefined) {
      setNegotiable(true);
    }

    if (
      candidateDetails.notice_period_negotiable != "Non-negotiable" &&
      candidateDetails.notice_period_negotiable != undefined
    ) {
      setBuyout(true);
    }



    let interviewSlot;
    if (candidateDetails.availablity_for_interview != null) {
      interviewSlot = candidateDetails.availablity_for_interview.map(
        (a, idx) => {
          return {
            day: moment(a.day,"YYYY-MM-DD"),
            time: a.time.map((b) => {
              return moment(b, "h:mm a");
            }),
          };
        }
      );
      setAvailable_slot(candidateDetails.availablity_for_interview.length);
    }

    console.log("edit candidate details after ====", candidateDetails);

    form.setFieldsValue({
      any_role: candidateDetails.any_role,
      preferred_roles: candidateDetails.preferred_roles,
      total_experience: candidateDetails.total_experience,
      current_role: candidateDetails.current_role,
      relevant_experience: candidateDetails.relevant_experience,
      current_ctc: candidateDetails.current_ctc / 100000,
      offer_in_hand_ctc: candidateDetails.offer_in_hand_ctc / 100000,
      expected_ctc_as_per_company_standards:
        candidateDetails.expected_ctc_as_per_company_standards,
      expected_ctc: candidateDetails.expected_ctc / 100000,
      any_location: candidateDetails.any_location,
      preferred_locations: candidateDetails.preferred_locations,
      relocation: candidateDetails.relocation,
      resigned: candidateDetails.resigned,
      joining: status,
      // date_of_joining: moment(candidateDetails.date_of_joining, "YYYY-MM-DD"),
      notice_period: candidateDetails.notice_period,
      notice_period_negotiable: candidateDetails.notice_period_negotiable,
      buy_out: candidateDetails.buy_out,

      job_type: candidateDetails.job_type,
      workType_any: work,
      work_type: candidateDetails.work_type,
      job_seakers_status: candidateDetails.job_seakers_status,
      timeline_to_follow_up: candidateDetails.timeline_to_follow_up,
      // status_changed_date: moment(
      //   candidateDetails.status_changed_date,
      //   "YYYY-MM-DD"
      // ),
      availablity_for_interview: interviewSlot,
      screening_comments: candidateDetails.screening_comments,
      open_for_internship: candidateDetails.open_for_internship,
      open_for_job: candidateDetails.open_for_job,
      // internship_to_date:moment(candidateDetails.open_for_internship,"YYYY-MM")
    });

    if (
      candidateDetails.internship_from_date &&
      candidateDetails.internship_to_date
    ) {
      form.setFieldsValue({
        internship_start_date: [
          moment(candidateDetails.internship_from_date, "YYYY-MM"),
          moment(candidateDetails.internship_to_date, "YYYY-MM"),
        ],
      });
    }

    if (
      candidateDetails.job_seakers_status === "placed" ||
      candidateDetails.status_changed_date != null
    ) {
      form.setFieldsValue({
        status_changed_date: moment(
          candidateDetails.status_changed_date,
          "YYYY-MM-DD"
        ),
        // date_of_joining: moment(candidateDetails.date_of_joining, "YYYY-MM-DD"),
      });
    }

    if (candidateDetails.date_of_joining != null) {
      form.setFieldsValue({
        date_of_joining: moment(candidateDetails.date_of_joining, "YYYY-MM-DD"),
      });
    }

    showModal();
  };

  return (
    <>
      {!Editable && (
        <Modal
          title="Screening Form"
          visible={modalVisible}
          onOk={() => {
            form.submit();
          }}
          onCancel={() => {
            hideModal();
            // form.resetFields();
          }}
          centered
          width={700}
          okText={"Save"}
          destroyOnClose={true}
        >
          {/* <div
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          > */}
          <Form
            form={form}
            layout="vertical"
            initialValues={formInit}
            onFinish={handleFinish}
            scrollToFirstError
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          >
            <RoleSelectForm
              any_role={any_role}
              name={"preferred_roles"}
              label={"Preferred Job Role"}
              multiselect={true}
              onAnyRoleChanged={onAnyRoleChanged}
              checkBox={true}
            />

            {!fresher && (
              <>
                {" "}
                <Form.Item
                  label="Total Experience - Years"
                  name="total_experience"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Total Experience!",
                    },
                  ]}
                  style={{ marginTop: -10 }}
                >
                  <Slider
                    tipFormatter={formatterYears}
                    marks={markYears}
                    step={0.1}
                    min={0}
                    max={CANDIDATE_MAX_EXP}
                    // tooltipVisible="true"
                    // defaultValue={5}
                  />
                </Form.Item>

                <Form.Item label="Current Role" name="current_role">
                  <Select
                    {...selectProps}
                    allowClear
                    onChange={currentRole}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, options) => {
                      //console.log("from search =",options)
                      return options.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  />
                </Form.Item>
                
                {relevantExpShow && 
                <Form.Item
                  label="Relevant Experience in Current role - Years"
                  name="relevant_experience"
                  dependencies={["total_experience"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your relevant experience!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // console.log(" total_experience ==== rel exp value",getFieldValue('total_experience'),value);
                        if (getFieldValue("total_experience") >= value) {
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
                    marks={markYears}
                    step={0.1}
                    min={0}
                    max={CANDIDATE_MAX_EXP}
                    // tooltipVisible="true"
                    // defaultValue={3}
                  />
                </Form.Item> }

                <div style={{ paddingTop: 30 }}>
                  <CandidateCtcSlider
                    label="Current CTC - LPA"
                    step={0.25}
                    min={1}
                    max={99}
                    // defaultValue={2.5}
                    name="current_ctc"
                    formate="LPA"
                  />
                </div>{" "}
              </>
            )}

            <div style={{ marginTop: -20 }}>
              <CandidateCtcSlider
                label="Offer in hand CTC - LPA"
                step={0.25}
                min={1}
                max={99}
                // defaultValue={5}
                name="offer_in_hand_ctc"
                formate="LPA"
              />
            </div>

            <Form.Item
              name="expected_ctc_as_per_company_standards"
              valuePropName="checked"
              style={{ marginBottom: "8px", marginTop: -20 }}
            >
              <Checkbox
                checked={exp_ctc}
                onChange={(v) => expCtcToggle(v.target.checked)}
              >
                Expected CTC as per the company standards - LPA
              </Checkbox>
            </Form.Item>

            {exp_ctc && (
              <Form.Item
                name="expected_ctc"
                rules={[
                  {
                    required: true,
                    message: "Please input your Expected CTC!",
                  },
                ]}
                style={{ marginTop: -15 }}
              >
                <Slider
                  tipFormatter={formatterLPA}
                  marks={markLPA}
                  step={0.25}
                  min={1}
                  max={99}
                  // tooltipVisible="true"
                  // defaultValue={7}
                />
              </Form.Item>
            )}

            <div style={{ paddingTop: 30 }}>
              <LocationSelectForm
                any_location={any_location}
                name={"preferred_locations"}
                label={"Preferred Job Location"}
                multiselect={true}
                onAnyLocationChanged={onAnyLocationChanged}
                checkBox={true}
              />
            </div>

            <Form.Item
              name="relocation"
              valuePropName="checked"
              style={{ marginTop: -20 }}
            >
              <Checkbox>Open to Relocate</Checkbox>
            </Form.Item>

            {!fresher ? (
              <div style={{ paddingTop: 20 }}>
                <ResignedSelectForm
                  name="resigned"
                  resigned={resigned}
                  setResigned={setResigned}
                  joinDate={joinDate}
                  setJoinDate={setJoinDate}
                  negotiable={negotiable}
                  setNegotiable={setNegotiable}
                  buyout={buyout}
                  setBuyout={setBuyout}
                />
              </div>
            ) : (
              <div>
                <Form.Item
                  name="open_for_job"
                  valuePropName="checked"
                  style={{ marginBottom: "0px" }}
                >
                  <Checkbox
                    checked={open_for_job}
                    onChange={(e) => setopen_for_job(e.target.checked)}
                  >
                    Open for Job
                  </Checkbox>
                </Form.Item>

                <Form.Item name="date_of_joining">
                  <DatePicker
                    disabled={!open_for_job}
                    placeholder="Available From"
                    disabledDate={(current) => {
                      return current && current < moment().endOf("day");
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="open_for_internship"
                  valuePropName="checked"
                  style={{ marginBottom: "0px" }}
                >
                  <Checkbox
                    checked={open_for_internship}
                    onChange={(e) => setopen_for_internship(e.target.checked)}
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
              </div>
            )}

            <div style={{ paddingTop: 20 }}>
              <Form.Item name="job_type" label="Preferred Job type">
                <Select mode="multiple" allowClear>
                  <Option value="full_time">Full time</Option>
                  <Option value="part_time">Contract</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Preferred Work type"
              style={{ marginBottom: "0px", marginTop: -15 }}
            >
              <Form.Item
                name="workType_any"
                valuePropName="checked"
                style={{ marginBottom: "0px", marginTop: -10 }}
              >
                <Checkbox
                  checked={any_workType}
                  onChange={(v) => WorkType(v.target.checked)}
                >
                  Any
                </Checkbox>
              </Form.Item>

              <Form.Item name="work_type">
                <Select mode="multiple" disabled={any_workType} allowClear>
                  <Option value="on-site">On-Site</Option>
                  <Option value="hybrid">Hybrid</Option>
                  <Option value="remote">Remote</Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <div style={{ paddingTop: 20 }}>
              <CandidateJobChangeStatus
                label={CANDIDATE_JOB_CHANGE_STATUS}
                name="job_seakers_status"
                job_status={job_status}
                setJobStatus={setJobStatus}
                setPlacedDate={setPlacedDate}
                placedDate={placedDate}
              />
            </div>

            <CandidateInterviewAvailability
              label={CANDIDATE_AVAILABLE_SLOTS}
              name="availablity_for_interview"
              setAvailable_slot={setAvailable_slot}
              available_slot={available_slot}
            />

            <CandidateScreeningComment
              label="Screening Comments"
              name="screening_comments"
            />
          </Form>
          {/* </div> */}
        </Modal>
      )}

      {Editable && (
        <>
          <Button
            type="link"
            onClick={() => {
              resetForm();
              onEdit();
            }}
            style={{ float: "right", justifyContent: "flex-end" }}
          >
            Edit
          </Button>
          <Modal
            title="Screening Form"
            visible={modalVisible}
            onOk={() => {
              form.submit();
            }}
            onCancel={() => {
              hideModal();
              // form.resetFields();
            }}
            centered
            width={700}
            okText={"Save"}
          >
            <div
              style={{
                height: "65vh",
                paddingRight: "16px",
                overflowY: "auto",
              }}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={formInit}
                onFinish={handleFinish}
                scrollToFirstError
                style={{
                  height: "65vh",
                  paddingRight: "16px",
                  overflowY: "auto",
                }}
              >
                <RoleSelectForm
                  any_role={any_role}
                  name={"preferred_roles"}
                  label={"Preferred Job Role"}
                  multiselect={true}
                  onAnyRoleChanged={onAnyRoleChanged}
                  checkBox={true}
                />

                {!fresher && (
                  <>
                    <Form.Item
                      label="Total Experience - Years"
                      name="total_experience"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Total Experience!",
                        },
                      ]}
                      style={{ marginTop: -10 }}
                    >
                      <Slider
                        tipFormatter={formatterYears}
                        marks={markYears}
                        step={0.1}
                        min={0}
                        max={CANDIDATE_MAX_EXP}
                        // tooltipVisible="true"
                        // defaultValue={5}
                      />
                    </Form.Item>
                   <Form.Item label="Current Role" name="current_role">
                  <Select
                    {...selectProps}
                    allowClear
                    onChange={currentRole}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, options) => {
                      //console.log("from search =",options)
                      return options.label
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  />
                </Form.Item>
                
                {relevantExpShow && 
                <Form.Item
                  label="Relevant Experience in Current role - Years"
                  name="relevant_experience"
                  dependencies={["total_experience"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your relevant experience!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        // console.log(" total_experience ==== rel exp value",getFieldValue('total_experience'),value);
                        if (getFieldValue("total_experience") >= value) {
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
                    marks={markYears}
                    step={0.1}
                    min={0}
                    max={CANDIDATE_MAX_EXP}
                    // tooltipVisible="true"
                    // defaultValue={3}
                  />
                </Form.Item> }
                    <div style={{ paddingTop: 30 }}>
                      <CandidateCtcSlider
                        label="Current CTC - LPA"
                        step={0.25}
                        min={1}
                        max={99}
                        // defaultValue={2.5}
                        name="current_ctc"
                        formate="LPA"
                      />
                    </div>{" "}
                  </>
                )}

                <div style={{ marginTop: -20 }}>
                  <CandidateCtcSlider
                    label="Offer in hand CTC - LPA"
                    step={0.25}
                    min={1}
                    max={99}
                    // defaultValue={5}
                    name="offer_in_hand_ctc"
                    formate="LPA"
                  />
                </div>

                <Form.Item
                  name="expected_ctc_as_per_company_standards"
                  valuePropName="checked"
                  style={{ marginBottom: "8px", marginTop: -20 }}
                >
                  <Checkbox
                    checked={exp_ctc}
                    onChange={(v) => expCtcToggle(v.target.checked)}
                  >
                    Expected CTC as per the company standards - LPA
                  </Checkbox>
                </Form.Item>

                {exp_ctc && (
                  <Form.Item
                    name="expected_ctc"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Expected CTC!",
                      },
                    ]}
                    style={{ marginTop: -15 }}
                  >
                    <Slider
                      tipFormatter={formatterLPA}
                      marks={markLPA}
                      step={0.25}
                      min={1}
                      max={99}
                      // tooltipVisible="true"
                      // defaultValue={7}
                    />
                  </Form.Item>
                )}

                <div style={{ paddingTop: 30 }}>
                  <LocationSelectForm
                    any_location={any_location}
                    name={"preferred_locations"}
                    label={"Preferred Job Location"}
                    multiselect={true}
                    onAnyLocationChanged={onAnyLocationChanged}
                    checkBox={true}
                  />
                </div>

                <Form.Item
                  name="relocation"
                  valuePropName="checked"
                  style={{ marginTop: -20 }}
                >
                  <Checkbox>Open to Relocate</Checkbox>
                </Form.Item>

                {!fresher ? (
                  <div style={{ paddingTop: 20 }}>
                    <ResignedSelectForm
                      name="resigned"
                      resigned={resigned}
                      setResigned={setResigned}
                      joinDate={joinDate}
                      setJoinDate={setJoinDate}
                      negotiable={negotiable}
                      setNegotiable={setNegotiable}
                      buyout={buyout}
                      setBuyout={setBuyout}
                    />
                  </div>
                ) : (
                  <div>
                    <Form.Item
                      name="open_for_job"
                      valuePropName="checked"
                      style={{ marginBottom: "0px" }}
                    >
                      <Checkbox
                        checked={open_for_job}
                        onChange={(e) => setopen_for_job(e.target.checked)}
                      >
                        Open for Job
                      </Checkbox>
                    </Form.Item>

                    <Form.Item name="date_of_joining">
                      <DatePicker
                        disabled={!open_for_job}
                        placeholder="Available From"
                        disabledDate={(current) => {
                          return current && current < moment().endOf("day");
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="open_for_internship"
                      valuePropName="checked"
                      style={{ marginBottom: "0px" }}
                    >
                      <Checkbox
                        checked={open_for_internship}
                        onChange={(e) =>
                          setopen_for_internship(e.target.checked)
                        }
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
                  </div>
                )}

                <div style={{ paddingTop: 20 }}>
                  <Form.Item name="job_type" label="Preferred Job type">
                    <Select mode="multiple" allowClear>
                      <Option value="full_time">Full time</Option>
                      <Option value="part_time">Contract</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  label="Preferred Work type"
                  style={{ marginBottom: "0px", marginTop: -15 }}
                >
                  <Form.Item
                    name="workType_any"
                    valuePropName="checked"
                    style={{ marginBottom: "0px", marginTop: -10 }}
                  >
                    <Checkbox
                      checked={any_workType}
                      onChange={(v) => WorkType(v.target.checked)}
                    >
                      Any
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="work_type">
                    <Select mode="multiple" disabled={any_workType} allowClear>
                      <Option value="on-site">On-Site</Option>
                      <Option value="hybrid">Hybrid</Option>
                      <Option value="remote">Remote</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <div style={{ paddingTop: 20 }}>
                  <CandidateJobChangeStatus
                    label={CANDIDATE_JOB_CHANGE_STATUS}
                    name="job_seakers_status"
                    job_status={job_status}
                    setJobStatus={setJobStatus}
                    setPlacedDate={setPlacedDate}
                    placedDate={placedDate}
                  />
                </div>

                <CandidateInterviewAvailability
                  label={CANDIDATE_AVAILABLE_SLOTS}
                  name="availablity_for_interview"
                  setAvailable_slot={setAvailable_slot}
                  available_slot={available_slot}
                />

                <CandidateScreeningComment
                  label="Screening Comments"
                  name="screening_comments"
                />
              </Form>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default forwardRef(CandidateScreeningForm);
