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

function CandidateCtcSlider(props) {
const {label,step,min,max,defaultValue,name,formate} = props

  let mark;  
  let formatter 
    if("LPA"=== formate){
        formatter = (value) => `${value} LPA`;
        mark = {
            5: "5LPA",
            20: "20LPA",
            40: "40LPA",
            60: "60LPA",
            80: "80LPA",
            99: "99LPA",
          };
    }else if("YEAR"=== formate){
        formatter = (value) => `${value} years`;
        mark = { 5: "5y", 10: "10y", 15: "15y", 20: "20y", 30: "30y" };
    }



  return (
    <>
    <Form.Item name={name} label={label} >
          <Slider
            tipFormatter={formatter}
            marks={mark}
            step={step}
            min={min}
            max={max}
            // tooltipVisible="true"
            defaultValue={defaultValue}
          />
    </Form.Item>
    </>
  )
}

export default CandidateCtcSlider