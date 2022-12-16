import React, { useEffect, useState } from "react";
import { Form, Select, Checkbox } from "antd";
import { useSelector } from "react-redux";
import FormItem from "antd/es/form/FormItem";

function RoleSelectForm(props) {
  const {
    any_role,
    label,
    name,
    multiselect,
    onAnyRoleChanged,
    checkBox,
    required,
    value
  } = props;
  const roleList = useSelector((state) => state.utils.roleList);
  var options;
  // console.log("roleList: " + JSON.stringify(roleList));

  if (JSON.stringify(roleList) !== "{}") {
    options = roleList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  };

  function onCheckboxChange(e) {
    onAnyRoleChanged(e.target.checked);
    console.log(" onCheckboxChange", e.target.checked);
  }

  if (multiselect === true) {
    selectProps.mode = "multiple";
  }

  return (
    <>
   
    
   {checkBox===true ?   
      <Form.Item
      //  label={}
        name="any_role"        
        valuePropName="checked"
        style={{ marginBottom: "0px" }}
      >
     <Checkbox checked={any_role} onChange={onCheckboxChange}>
          Any Role
     </Checkbox> 
    </Form.Item> : null}

      {/* <Form.Item name={name}
      rules={[
        {
          required: true
        }
      ]}
                    >
        <Select
          {...selectProps}
          disabled={any_role}
          showSearch
          allowClear
          optionFilterProp="children"
          filterOption={(input, options) => {
            //console.log("from search =",options)
            return options.label.toLowerCase().includes(input.toLowerCase());
          }}
        />
      </Form.Item> */}
      <FormItem name={name} label={label} value={value}
     rules={[
      {
        required:required,
        message: "Please input roles!",
      }
    ]}>
    <Select
    {...selectProps}
    disabled={any_role}
    showSearch
    allowClear
    optionFilterProp="children"
    filterOption={(input, options) => {
      //console.log("from search =",options)
      return options.label.toLowerCase().includes(input.toLowerCase());
    }}
  /></FormItem>
    </>
  );
}

export default RoleSelectForm;
