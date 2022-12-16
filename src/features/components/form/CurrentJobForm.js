import React, { useState, useCallback } from "react";
import {
  Form,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  InputNumber,
  Radio,
  Select,
  Input,
  Checkbox,
  DatePicker,
  Card,
  Empty,
  Slider,
} from "antd";
import RoleSelectForm from "./RoleSelectForm";
import moment from "moment";
import { useSelector } from "react-redux";

function CurrentJobForm(props) {
  const { resigned, onClickCallBack, noticePeriod } = props;

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const formatterYears = (value) => `${value} years`;
  const formatterDays = (value) => `${value} Days`;
  const formatterLPA = (value) => `${value} LPA`;

  const markYears = { 5: "5y", 10: "10y", 15: "15y", 20: "20y", 30: "30y" };
  const markdays = { 30: "30d", 45: "45d", 60: "60d", 90: "90d" };
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
      <Form.Item label="Total Experience - Years" name="total_experience"
      rules={[
        {
          required: true,
          message: 'Please input your Total Experience!',
        },
      ]}
      >
        <Slider
          tipFormatter={formatterYears}
          marks={markYears}
          step={.1}
          min={0}
          max={30}
          // tooltipVisible="true"
          defaultValue={5}
        />
      </Form.Item>

      <Form.Item label="Current Role" style={{ marginBottom: 0 }}>
        <RoleSelectForm
          checkBox={false}
          multiselect={false}
          name="current_role"
        />
      </Form.Item>

      <Form.Item
        label="Relevant Experience in Current role - Years"
        name="relevant_experience"
        dependencies={['total_experience']}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              // console.log(" total_experience ==== rel exp value",getFieldValue('total_experience'),value);
              if (getFieldValue('total_experience') >= value) {
                return Promise.resolve();
              }else{
              return Promise.reject(new Error('Relevant exp entered is more than total exp!'));
            }
            },
          }),
        ]}
      >
        <Slider
          tipFormatter={formatterYears}
          marks={markYears}
          step={.1}
          min={0}
          max={30}
          // tooltipVisible="true"
          defaultValue={3}
        />
      </Form.Item>
      
      <Form.Item name="current_ctc" label="Current CTC - LPA">
        <Slider
          tipFormatter={formatterLPA}
          marks={markLPA}
          step={0.25}
          min={1}
          max={99}
          // tooltipVisible="true"
          defaultValue={2.5}
        />
      </Form.Item>

      <Form.Item name="resigned" valuePropName="checked">
        <Checkbox onChange={(v) => onClickCallBack(v.target.checked,'setResigned')}>
          Resigned
        </Checkbox>
      </Form.Item>

      {resigned ? (
        <Form.Item
          name="date_of_joining"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your date of joining!",
          //   },
          // ]}
        >
          <DatePicker
            disabled={!resigned}
            placeholder="Available From"
            disabledDate={disabledDate}
          />
        </Form.Item>
      ) : (
        // <Form.Item label="Notice Period - Days" name="notice_period">
        //   <Slider
        //     tipFormatter={formatterDays}
        //     marks={markdays}
        //     range
        //     step={1}
        //     min={0}
        //     max={90}
        //     // tooltipVisible="true"
        //     defaultValue={10}
        //   />
        // </Form.Item>
        <Form.Item name="notice_period" label="Notice Period">
          <Select allowClear>
            <Option value="15">15 Days</Option>
            <Option value="30">30 Days</Option>
            <Option value="45">45 Days</Option>
            <Option value="60">60 Days</Option>
            <Option value="90">90 Days</Option>
          </Select>
        </Form.Item>
      )}

      {!resigned && (
        <>
          <Form.Item name="exit_type">
            <Radio.Group>
              <Radio
                value="non_negotiable"
                onChange={(v) => onClickCallBack(v.target.defaultChecked,'setNoticePeriod')}
              >
                Non-negotiable
              </Radio>
              <Radio
                value="buy_out"
                onChange={(v) => onClickCallBack(v.target.checked,'setNoticePeriod')}
              >
                Buyout
              </Radio>
              <Radio
                value="notice_period_negotiable"
                onChange={(v) => onClickCallBack(v.target.checked,'setNoticePeriod')}
              >
                Negotiable
              </Radio>
            </Radio.Group>
          </Form.Item>

          {/* <Form.Item name="Negotiable">
            <Slider
              tipFormatter={formatterDays}
              marks={markdays}
              range
              step={1}
              min={0}
              max={90}
              // tooltipVisible="true"
              defaultValue={10}
              disabled={!noticePeriod}
            />
          </Form.Item> */}

          <Form.Item name="notice_period_negotiable">
            <Select disabled={!noticePeriod} allowClear>
              <Option value="15">15 Days</Option>
              <Option value="30">30 Days</Option>
              <Option value="45">45 Days</Option>
              <Option value="60">60 Days</Option>
              <Option value="90">90 Days</Option>
            </Select>
          </Form.Item>
        </>
      )}

      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item> */}
    </>
  );
}

export default CurrentJobForm;
