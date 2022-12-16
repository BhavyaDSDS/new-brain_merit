import React from 'react'
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

function CandidateScreeningComment(props) {

  const {label,name} = props;

  return (
    <>
    <Form.Item label={label} name={name} 
      
    >
          <Input.TextArea rows={4} />
        </Form.Item>
    </>
  )
}

export default CandidateScreeningComment