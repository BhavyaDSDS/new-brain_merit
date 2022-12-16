import React, { useState, useCallback } from "react";
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
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import RoleSelectForm from "./RoleSelectForm";
import LocationSelectForm from "./LocationSelectForm";
import { useSelector } from "react-redux";
import { MAX_AVAILABLE_SLOT } from "../../../constants";
const { Option } = Select;

function PreferredJobForm(props) {
  const {
    fresher,
    job_status,
    onClickCallBack,
    any_role,
    any_location,
    onAnyLocationChanged,
    onAnyRoleChanged,
    exp_ctc,
    any_workType,
    available_slot,
    setAvailable_slot
  } = props;
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );

  const [open_for_job, setOpen_for_job] = useState(true);
  // const [available_slot, setAvailable_slot] = useState(1);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const formatterLPA = (value) => `${value} LPA`;

  const markLPA = {
    5: "5LPA",
    20: "20LPA",
    40: "40LPA",
    60: "60LPA",
    80: "80LPA",
    99: "99LPA",
  };
  
  return (
    <>
      <Form.Item label="Screening Comments" name="screening_comments">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Available slots for interview">
        <Form.List
          name="availablity_for_interview"
          initialValue={[{ day: "Monday", time: "" }]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item name={[name, "day"]}>
                    <Select
                      placeholder="Select day"
                      style={{
                        width: 150,
                      }}
                      allowClear
                    >
                      <Option value="Monday">Monday</Option>
                      <Option value="Tuesday">Tuesday</Option>
                      <Option value="Wednesday">Wednesday</Option>
                      <Option value="Thursday">Thursday</Option>
                      <Option value="Friday">Friday</Option>
                      <Option value="Saturday">Saturday</Option>
                      <Option value="Sunday">Sunday</Option>                      
                    </Select>
                  </Form.Item>

                  <Form.Item name={[name, "time"]}>
                    <TimePicker.RangePicker use12Hours format="h:mm a" allowClear />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(name);
                      setAvailable_slot(available_slot - 1);
                    }}
                  />
                </Space>
              ))}
              {available_slot < MAX_AVAILABLE_SLOT && (
                <Form.Item style={{ marginTop: "-10px" }}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      setAvailable_slot(available_slot + 1);
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add slots
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Form.Item>

      {fresher ? (
        <>
          <Form.Item
            name="open_for_job"
            valuePropName="checked"
            style={{ marginBottom: "0px" }}
          >
            <Checkbox
              checked={open_for_job}
              onChange={(v) => setOpen_for_job(v.target.checked)}
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
        </>
      ) : (
        <>
          <Form.Item
            label="Job change status"
            name="job_seakers_status"
            style={{ marginBottom: "8px" }}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button
                value="active"
                onClick={() => onClickCallBack(true, "setJobStatus")}
              >
                Active
              </Radio.Button>
              <Radio.Button
                value="casual"
                onClick={() => onClickCallBack(true, "setJobStatus")}
              >
                Casual
              </Radio.Button>
              <Radio.Button
                value="passive"
                onClick={() => onClickCallBack(false, "setJobStatus")}
              >
                Passive
              </Radio.Button>
              <Radio.Button
                value="dormant"
                onClick={() => onClickCallBack(true, "setJobStatus")}
              >
                Dormant
              </Radio.Button>
              <Radio.Button
                value="placed"
                onClick={() => onClickCallBack(true, "setJobStatus")}
              >
                Placed
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item name="timeline_to_follow_up">
            <Select placeholder="Select time-line" disabled={job_status} allowClear>
              <Option value="15">15 Days</Option>
              <Option value="30">1 Month</Option>
              <Option value="45">45 Days</Option>
              <Option value="60">2 Month</Option>
              <Option value="90">3 Month</Option>
            </Select>
          </Form.Item>
        </>
      )}
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

      <Form.Item
        name="expected_ctc_as_per_company_standards"
        valuePropName="checked"
        style={{ marginBottom: "8px" }}
      >
        <Checkbox
          checked={exp_ctc}
          onChange={(v) => onClickCallBack(v.target.checked, "setExp_ctc")}
        >
          Expected CTC as per the company standards - LPA
        </Checkbox>
      </Form.Item>
      
        {!exp_ctc && (
           <Form.Item name="expected_ctc">
           <Slider
             tipFormatter={formatterLPA}
             marks={markLPA}
             step={0.25}
             min={1}  
             max={99}
             // tooltipVisible="true"
             defaultValue={7}
             disabled={exp_ctc}
           />
         </Form.Item>
        )}
     

      <Form.Item label="Offer in hand CTC - LPA" name="offer_in_hand_ctc">
        <Slider
          tipFormatter={formatterLPA}
          marks={markLPA}
          step={0.25}
          min={1}
          max={99}
          // tooltipVisible="true"
          defaultValue={5}
        />
      </Form.Item>
      
      <Form.Item label="Preferred Work type" style={{marginBottom:'0px'}}>
      <Form.Item
        name="workType_any"
        valuePropName="checked"
        style={{ marginBottom: "0px" }}
      >
        <Checkbox
          checked={any_workType}
          onChange={(v) => onClickCallBack(v.target.checked, "setWorkType")}
        >
          Any
        </Checkbox>
      </Form.Item>

      <Form.Item name="work_type" >
        <Select mode="multiple" disabled={any_workType} allowClear>
          <Option value="on-site">On-Site</Option>
          <Option value="hybrid">Hybrid</Option>
          <Option value="remote">Remote</Option>
        </Select>
      </Form.Item>
      </Form.Item>

      <Form.Item name="job_type" label="Preferred Job type">
        <Select mode="multiple" allowClear>
          <Option value="full_time">Full time</Option>
          <Option value="part_time">Contract</Option>
        </Select>
      </Form.Item>

      <Form.Item name="relocation" valuePropName="checked">
        <Checkbox>Open to Relocate</Checkbox>
      </Form.Item>
    </>
  );
}

export default PreferredJobForm;
