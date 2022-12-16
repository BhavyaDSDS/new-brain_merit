import React from 'react'
import { Form, Select, Space, Checkbox } from "antd";
import { useSelector } from "react-redux";

function CompaniesSelectForm(props) {
    const {title,name,multiselect} = props

    const employerId = useSelector((state) => state.employer.listEmployers);

    var options;
  if (JSON.stringify(employerId) !== "{}") {
    options = employerId.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const selectProps = {
    style: {
      width: "100%",
    },
    options,
  }

  if (multiselect === true) {
    selectProps.mode = "multiple";
  }

  return (
    <>
    <Form.Item label={title} name={name}>
                <Select {...selectProps}/>
    </Form.Item>
    </>
  )
}

export default CompaniesSelectForm