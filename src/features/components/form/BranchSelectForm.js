import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

function BranchSelectForm(props) {
  const { label, name, required, multiselect } = props;
  const branchsList = useSelector((state) => state.utils.branchsList);  

  var options;
  if(JSON.stringify(branchsList) !== '{}'){
    options = branchsList.map(function (obj) {
      return { label: obj.name , value: obj.id };
    })
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
    <Select {...selectProps}  showSearch optionFilterProp="children" allowClear
        filterOption={(input, options) => {
          //console.log("from search =",options)
          return options.label.toLowerCase().includes(input.toLowerCase());
        }}/>
    </Form.Item>         
  );
}
export default BranchSelectForm;
