import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../../utils/JavaScriptUtils";

function CandidateSelectForm(props) {
  const { label, name, required, multiselect } = props;

  const candidateList = useSelector((state) => state.candidate.fresherCandidateList);
  var options;
//   if(JSON.stringify(employeList) !== '{}'){
//     options = employeList.map(function (obj) {
//       return { label: obj.name , value: obj.id };
//     })
//   }

//   console.log()
  if (objectLength(candidateList) > 0) {
    options = candidateList.map(function (obj) {
      return { label: obj.first_name+ " " +obj.last_name, value: obj.id };
    });
  }
//console.log("candidateId *******", candidateId);
  //console.log("listExperienceCandidatest options", options);

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
export default CandidateSelectForm;
