import React from "react";
import { Form, Select, Space, Checkbox } from "antd";
import { useSelector } from "react-redux";

function LocationSelectForm(props) {
  const {
    value,
    any_location,
    label,
    name,
    multiselect,
    onAnyLocationChanged,
    checkBox,
  } = props;

  const locationsList = useSelector((state) => state.utils.locationsList);
  var options;
  if (JSON.stringify(locationsList) !== "{}") {
    options = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  const onCheckboxChange = (e) => {
    onAnyLocationChanged(e.target.checked);
  };

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
    <>
    <label>{label}</label>
      {checkBox ? (
        <Form.Item
          name="any_location"
          // label={label}
          valuePropName="checked"
          style={{ marginBottom: "0px" }}
        >
          <Checkbox checked={any_location} onChange={onCheckboxChange}>
            Any Location
          </Checkbox>
        </Form.Item>
      ) : null}

      <Form.Item name={name}>
        <Select
          {...selectProps}
          disabled={any_location}
          showSearch
          allowClear
          optionFilterProp="children"
          filterOption={(input, options) => {
            //console.log("from search =",options)
            return options.label.toLowerCase().includes(input.toLowerCase());
          }}
        />
      </Form.Item>
    </>
  );
}

export default LocationSelectForm;
