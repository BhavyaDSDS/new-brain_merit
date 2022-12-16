import React from "react";
import { Form, Select } from "antd";
import { useSelector } from "react-redux";

function DegreeSelectForm(props) {
  const { label, name, required, multiselect } = props;
  const degreesList = useSelector((state) => state.utils.degreesList);
  var options;
  if (JSON.stringify(degreesList) !== "{}") {
    options = degreesList.map(function (obj) {
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
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
        },
      ]}
    >
      <Select
        {...selectProps}
        showSearch
        allowClear
        optionFilterProp="children"
        filterOption={(input, options) => {
          //console.log("from search =",options)
          return options.label.toLowerCase().includes(input.toLowerCase());
        }}
      />
    </Form.Item>
  );
}

export default DegreeSelectForm;
