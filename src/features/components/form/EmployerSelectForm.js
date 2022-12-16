import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

function EmployerSelectForm(props) {
  const { label, name, required, multiselect } = props;
  const employersList = useSelector((state) => state.employer.listEmployers);

  var options;
  if(JSON.stringify(employersList) !== '{}'){
    options = employersList.map(function (obj) {
      return { label: obj.name , value: obj.id };
    })
  }

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
    <Form.Item name={name} label={label} 
        rules={[
          {
            required: required,
          },
        ]}> 
        {<Select {...selectProps}  showSearch />}
        </Form.Item>         
  );  
}

export default EmployerSelectForm;
