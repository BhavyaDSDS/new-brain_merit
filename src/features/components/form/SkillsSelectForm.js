import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../utils/JavaScriptUtils"

function SkillsSelectForm(props) {
  const { label, name, required, multiselect,placementTop,maxSixSkills } = props;
  const skillsList = useSelector((state) => state.utils.skillsList);
  const ntskillsList = useSelector((state) => state.utils.ntskillsList);

  var options;
  if ("non_tech_skills" != name) {
    if (objectLength(skillsList) > 0) {
      options = skillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
  } else {
    if (objectLength(ntskillsList) > 0) {
      options = ntskillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
  }

  // console.log("skillsList", skillsList);
  // console.log("skillsList options", options);

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  };

  if (multiselect === true) {
    selectProps.mode = "multiple";
  }

   
  
  if(placementTop === true){
    selectProps.placement = "topRight";
  }

  return (
    <>
    {!maxSixSkills  ? 
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
        }
      ]}
    >
      <Select
        {...selectProps}
        listHeight={120}
        showSearch
        allowClear
        optionFilterProp="children"
        filterOption={(input, options) => {
          //console.log("from search =",options)
          return options.label.toLowerCase().includes(input.toLowerCase());
        }}   
      />
    </Form.Item> :

    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
        },{
          validator(_, value){
                if( value === undefined || value.length <= 6){
                  return Promise.resolve();
                }else{
                  return Promise.reject(
                            new Error("You can select up to 6 skills!")
                          );
                }
          }
        }
        
      ]}
    >
      <Select
        {...selectProps}
        listHeight={120}
        showSearch
        allowClear
        optionFilterProp="children"
        filterOption={(input, options) => {
          //console.log("from search =",options)
          return options.label.toLowerCase().includes(input.toLowerCase());
        }}   
      />
    </Form.Item>}
    </>
  );
}
export default SkillsSelectForm;
