import React, { useState, useCallback, useEffect } from "react";
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
import {
  CANDIDATE_JOB_ACTIVE,
  CANDIDATE_JOB_CASUAL,
  CANDIDATE_JOB_PASSIVE,
  CANDIDATE_JOB_DORMANT,
  CANDIDATE_JOB_PLACED,
} from "../../../constants";
import moment from "moment";

function CandidateJobChangeStatus(props) {
  const { label, name, job_status, setJobStatus,placedDate,setPlacedDate } = props;

  // const [job_status, setJobStatus] = useState(true);

  return (
    <>
      <Form.Item label={label} name={name} style={{ marginBottom: "8px" }}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="active" onClick={() => {setJobStatus(true),setPlacedDate(false)}}>
            {CANDIDATE_JOB_ACTIVE}
          </Radio.Button>
          <Radio.Button value="casual" onClick={() => {setJobStatus(true),setPlacedDate(false)}}>
            {CANDIDATE_JOB_CASUAL}
          </Radio.Button>
          <Radio.Button value="passive" onClick={() => {setJobStatus(false),setPlacedDate(false)}}>
            {CANDIDATE_JOB_PASSIVE}
          </Radio.Button>
          <Radio.Button value="dormant" onClick={() => {setJobStatus(true),setPlacedDate(false)}}>
            {CANDIDATE_JOB_DORMANT}
          </Radio.Button>
          <Radio.Button value="placed" onClick={() => {setPlacedDate(true),setJobStatus(true)}}>
            {CANDIDATE_JOB_PLACED}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {!job_status && (
        <Form.Item
          name="timeline_to_follow_up"
          rules={[
            {
              required: true,
              message: "Please input your time-line!",
            },
          ]}
        >
          <Select placeholder="Select time-line" allowClear>
            <Option value="15">15 Days</Option>
            <Option value="30">1 Month</Option>
            <Option value="45">45 Days</Option>
            <Option value="60">2 Months</Option>
            <Option value="90">3 Months</Option>
          </Select>
        </Form.Item>
      )}

      {placedDate && 
      <Form.Item
        name="status_changed_date"
        rules={[
          {
            required: true,
            message: "Please input your placed date!",
          },
        ]}
      >
        <DatePicker
          placeholder="placed date"
          disabledDate={(current) => {return current && current > moment().endOf("day")}}
        />
      </Form.Item>}
    </>
  );
}

export default CandidateJobChangeStatus;
