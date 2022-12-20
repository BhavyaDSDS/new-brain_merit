import React from "react";
import { Form, Input, Select, Slider } from "antd";
import { useSelector } from "react-redux";
import RoleSelectForm from "../../../../components/form/RoleSelectForm";

import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import LocationSelectForm from "../../../../components/form/LocationSelectForm";


function InternshipListFilter(props) {
  const {setCustomFilter}=props
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
  };

  const formatter = (value) => `${value} KPM`;

  return (
    <>
      <Form.Item label="Company Name" name="company_name">
        <Select
          mode="multiple"
          {...selectProps}
          showSearch
          optionFilterProp="children"
          filterOption={(input, options) => {
            //console.log("from search =",options)
            return options.label.toLowerCase().includes(input.toLowerCase());
          }}
        />
      </Form.Item>

      <Form.Item label="Role">
        <RoleSelectForm checkBox={false} multiselect={true} name="role" />
      </Form.Item>

      <Form.Item label="Location">
        <LocationSelectForm
          checkBox={false}
          multiselect={true}
          name={"job_locations"}
        />
      </Form.Item>

      <Form.Item label="Stipend Fund" name="stipend_fund">
        <Slider
          tipFormatter={formatter}
          range
          step={0.25}
          min={1}
          max={50}
          // tooltipVisible="true"
         // defaultValue={[0, 0]}
        />
      </Form.Item>

      <Form.Item name="work_type" label="Work type">
        <Select mode="multiple">
          <Option value="office">Office</Option>
          <Option value="hybrid">Hybrid</Option>
          <Option value="remote">Remote</Option>
        </Select>
      </Form.Item>

    
        <SkillsSelectForm
          multiselect={true}
          name="primary_tech_skill"
          label="Primary Technical Skills"
        />
    
      {/* <Form.Item
      style={{marginTop:"20px"}}
      name="save_filter"
      label="Save filter as"
      onChange={(a)=>{
        console.log("aaaaaaaaaaaaaaaaaaaaa",a.target.value)
         if(a.target.value===""){
          setCustomFilter(false);
         }
          else{
            setCustomFilter(true);
        }
      }}>
        <Input showCount MaxLength={8}/>

</Form.Item> */}
    </>
  );
}

export default InternshipListFilter;
