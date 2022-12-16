import React from "react";
import { Form, Select, Space, Checkbox } from "antd";
import { useSelector } from "react-redux";

function WorkDomain(props) {

    const {name,multiselect,label} = props

  const domainList = useSelector((state) => state.utils.candDomainList);

  var options;
  if (JSON.stringify(domainList) !== "{}") {
    options = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  };

  if (multiselect === true) {
    selectProps.mode = "multiple";
  }
  return (
    <Form.Item label={label? label : "Domain"} name={name}>
    <Select {...selectProps} 
    allowClear
     showSearch
     optionFilterProp="children"
     filterOption={(input, options) => {
       //console.log("from search =",options)
       return options.label.toLowerCase().includes(input.toLowerCase());
     }}
    />
  </Form.Item>
  )
}

export default WorkDomain