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
import { MAX_AVAILABLE_SLOT } from "../../../constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CandidateInterviewAvailability(props) {
  const { label, name, setAvailable_slot, available_slot, interviewer } = props;


  return (
    <>
      {interviewer ? (
        <Form.Item label={label} style={{ marginBottom: 0 }}>
          <Form.List
            name={name}
            initialValue={[
              { day: "Monday", time: null },
              { day: null, time: null },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 10 }}
                    align="baseline"
                  >
                    <Form.Item
                      name={[name, "day"]}
                      rules={[
                        {
                          required: true,
                          message: "Required day!",
                        },
                      ]}
                    >
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
                        {/* <Option value="Anyday">Anyday</Option> */}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={[name, "time"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm the time slots!",
                        },
                        ({ getFieldValue }) => ({
                          validator: (_, value) => {
                            // console.log("&&&&&&& val",value)
                            if (value !== null && value !== undefined) {
                              //console.log("&&&&&&& diff", value[1].diff(value[0], 'hours'), (value[1].diff(value[0], 'minutes') ))
                              if (
                                value[1].diff(value[0], "hours") > 0 ||
                                value[1].diff(value[0], "minutes") >= 59
                              ) {
                                // console.log("resolve")
                                return Promise.resolve();
                              } else {
                                // console.log("reject")
                                return Promise.reject(
                                  new Error(
                                    "Duration should be atleast One hour!"
                                  )
                                );
                              }
                            } else {
                              return Promise.resolve();
                            }
                          },
                          // validator: validateTime()
                        }),
                      ]}
                    >
                      <TimePicker.RangePicker
                        use12Hours
                        format="h:mm a"
                        allowClear
                        minuteStep={30}
                       
                        // status={error}
                      />
                    </Form.Item>

                    {available_slot > 2 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name);
                          setAvailable_slot(available_slot - 1);
                        }}
                      />
                    )}
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
      ) : (
        <Form.Item label={label} style={{ marginBottom: 0 }}>
          <Form.List name={name} 
          initialValue={[{ day: null , time: null }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 10 }}
                    align="baseline"
                  >
                    
                    <Form.Item 
                    name={[name, "day"]}
                    rules={[
                      {
                        required: true,
                        message: "Required day!",
                      },
                    ]}
                    >
                    <DatePicker 
                placeholder="Available"
                disabledDate={(current) => {
                  return current && current < moment().startOf("day");
                }}
               />
               </Form.Item>  

                    <Form.Item
                      name={[name, "time"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm the time slots!",
                        },
                        ({ getFieldValue }) => ({
                          validator: (_, value) => {
                            console.log("&&&&&&& val", value);
                            if (value !== null && value !== undefined) {
                              //console.log("&&&&&&& diff", value[1].diff(value[0], 'hours'), (value[1].diff(value[0], 'minutes') ))
                              if (
                                value[1].diff(value[0], "hours") > 0 ||
                                value[1].diff(value[0], "minutes") >= 59
                              ) {
                                // console.log("resolve")
                                return Promise.resolve();
                              } else {
                                // console.log("reject")
                                return Promise.reject(
                                  new Error(
                                    "Duration should be atleast One hour!"
                                  )
                                );
                              }
                            } else {
                              return Promise.resolve();
                            }
                          },
                          // validator: validateTime()
                        }),
                      ]}
                    >
                      <TimePicker.RangePicker
                        use12Hours
                        format="h:mm a"
                        allowClear
                        minuteStep={30}
                    
                        // status={error}
                      />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                        setAvailable_slot(available_slot - 1);
                      }}
                    />
                    {/* <span>hi i am working</span> */}
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
      )}
    </>
  );
}

export default CandidateInterviewAvailability;
