import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../../utils/JavaScriptUtils";

function EmployeSelectForm(props) {
  const { label, name, required, multiselect } = props;

  const employerList = useSelector((state) => state.employer.listEmployers);
  var options;
//   if(JSON.stringify(employeList) !== '{}'){
//     options = employeList.map(function (obj) {
//       return { label: obj.name , value: obj.id };
//     })
//   }

  
  if (objectLength(employerList) > 0) {
    options = employerList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  // console.log("branchsList", branchsList);
  // console.log("branchsList options", options);

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  };

  if(multiselect === true)
  {
    selectProps.mode="multiple";
  }

  return (                    
    <Form.Item name={name}  label={label} 
    rules={[
      {
        required: required,
      },
    ]}> 
    <Select  allowClear {...selectProps}  showSearch optionFilterProp="children"
        filterOption={(input, options) => {
          //console.log("from search =",options)
          return options.label.toLowerCase().includes(input.toLowerCase());
        }}/>
    </Form.Item>         
  );
}
export default EmployeSelectForm;
