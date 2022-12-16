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
import moment from "moment";
import {
  CANDIDATE_RESIGNED,
  CANDIDATE_IMMEDIATE_JOIN,
  CANDIDATE_LWD,
  CANDIDATE_NOTICE_PERIOD,
  CANDIDATE_NEGOTIABLE_DAY,
  CANDIDATE_NON_NEGOTIABLE,
  CANDIDATE_BUYOUT,
} from "../../../constants";

function ResignedSelectForm(props) {
  const {
    name,
    setResigned,
    resigned,
    setJoinDate,
    joinDate,
    negotiable,
    setNegotiable,
    buyout,
    setBuyout,
  } = props;

  let noticePeriod;

  // const [resigned, setResigned] = useState(true);

  // const [joinDate, setJoinDate] = useState(false);

  // const [buyout, setBuyout] = useState(false);

  // const [negotiable, setNegotiable] = useState(false);

  // function showNoticePeriod(d) {
  //   setResigned(d), [setResigned];
  // }

  // console.log("resigned state value",resigned);

  function showNegotiable() {
    setNegotiable(false), setBuyout(false), [negotiable, buyout];
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  return (
    <>
      <Form.Item
        name={name}
        valuePropName="checked"
        style={{ marginBottom: 0 }}
      >
        <Checkbox onChange={(v) => setResigned(v.target.checked)}>
          {CANDIDATE_RESIGNED}
        </Checkbox>
      </Form.Item>

      {resigned ? (
        <>
          <Row>
            <Col span={9}>
              <Form.Item name="joining">
                <Radio.Group>
                  <Radio value="immediate" onClick={() => setJoinDate(false)}>
                    {CANDIDATE_IMMEDIATE_JOIN}
                  </Radio>
                  <Radio value="lwd" onClick={() => setJoinDate(true)}>
                    {CANDIDATE_LWD}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={13}>
              {joinDate && (
                <Form.Item
                  name="date_of_joining"
                  rules={[
                    {
                      required: true,
                      message: "Please input your date of joining!",
                    },
                  ]}
                >
                  <DatePicker
                    disabled={!resigned}
                    placeholder="Available From"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col span={24}>
              <Input.Group compact>
                <Form.Item
                  name="notice_period"
                  label={CANDIDATE_NOTICE_PERIOD}
                  style={{ width: "50%" }}
                  rules={[{ required: true, message: "Required!" }]}
                >
                  <Select
                    allowClear
                    placeholder="Select"
                    onChange={(d) => {
                      if (d != undefined) {
                        setNegotiable(true);
                      } else {
                        showNegotiable();
                      }
                      if(d != undefined) {
                         noticePeriod = d 
                      }
                    }}
                  >
                    <Option value="15">15 Days</Option>
                    <Option value="30">30 Days</Option>
                    <Option value="45">45 Days</Option>
                    <Option value="60">60 Days</Option>
                    <Option value="90">90 Days</Option>
                  </Select>
                </Form.Item>

                {negotiable && (
                  <Form.Item
                    name="notice_period_negotiable"
                    label={CANDIDATE_NEGOTIABLE_DAY}
                    style={{ width: "50%" }}
                    dependencies={["notice_period"]}
                    rules={
                      [{ required: true, message: "Required!" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if(value !== null && value !== undefined ) {     
                          if (value == "Non-negotiable" ||
                              value.slice(0, 2) <= getFieldValue("notice_period")
                             ) 
                          {
                            return Promise.resolve();
                          }
                          else
                          {
                          return Promise.reject(
                            new Error(
                              "Negotiable days to be lesser than notice period!"
                            )
                          );
                          }
                        }
                        else
                        {
                          return Promise.resolve();
                        }
                      }
                      }),
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="Select"
                      onChange={(d) => {
                        (d != "Non-negotiable" && d != undefined
                          ? setBuyout(true)
                          : setBuyout(false))
                        }
                        
                      }
                    >
                      <Option value="Non-negotiable">
                        {CANDIDATE_NON_NEGOTIABLE}
                      </Option>
                      <Option value="15 dys">15 Days</Option>
                      <Option value="30 dys">30 Days</Option>
                      <Option value="45 dys">45 Days</Option>
                      <Option value="60 dys">60 Days</Option>
                      <Option value="90 dys">90 Days</Option>
                    </Select>
                  </Form.Item>
                )}
              </Input.Group>
            </Col>
          </Row>
          <Row>
            <Col span={12} />
            <Col span={12}>
              {buyout && (
                <Form.Item
                  name="buy_out"
                  valuePropName="checked"
                  style={{ display:'block',position:'relative',bottom:'10px' }}
                >
                  <Checkbox>{CANDIDATE_BUYOUT}</Checkbox>
                </Form.Item>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ResignedSelectForm;
