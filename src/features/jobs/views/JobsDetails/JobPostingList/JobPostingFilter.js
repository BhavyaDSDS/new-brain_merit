import React from "react";
import { Form, Input, Select, Slider } from "antd";
import { useSelector } from "react-redux";
import RoleSelectForm from "../../../../components/form/RoleSelectForm";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import LocationSelectForm from "../../../../components/form/LocationSelectForm";

function JobPostingFilter(props) {
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

  const formatterLPA = (value) => `${value} LPA`;
  const formatterYears = (value) => `${value} years`;

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

          <Form.Item label="Role" >
      <RoleSelectForm checkBox={false} multiselect={true} name="role" />
      </Form.Item>
      <Form.Item label=" Total Experience" name="total_exp">
        <Slider
        tipFormatter={formatterYears}
          range
          step={0.1}
          min={0}
          max={30}
          // tooltipVisible="true"
         // defaultValue={[0, 0]}
        />
      </Form.Item>
      <Form.Item label=" Relevent Experience" name="relevant_exp">
        <Slider
        tipFormatter={formatterYears}
          range
          step={0.1}
          min={0}
          max={30}
          // tooltipVisible="true"
          //defaultValue={[0, 0]}
        />
      </Form.Item>
     
      <Form.Item label="Location" >
        <LocationSelectForm
          checkBox={false}
          multiselect={true}
          name={"job_locations"}
        />
      </Form.Item>

      <Form.Item label="Salary range" name="salary_range">
        <Slider
          tipFormatter={formatterLPA}
          range
          step={.25}
          min={1}
          max={50}
          // tooltipVisible="true"
         // defaultValue={[0, 0]}
        />
      </Form.Item>

      <Form.Item name="work_type" label="Work type" >
        <Select mode="multiple">
          <Option value="office">Office</Option>
          <Option value="hybrid">Hybrid</Option>
          <Option value="remort">Remort</Option>
        </Select>
      </Form.Item>

      <Form.Item name="job_type" label="Job type" >
        <Select mode="multiple">
          <Option value="full_time">Full time</Option>
          <Option value="contract">Contract</Option>
         {/* // <Option value="temp/contract">Temp / Contract</Option> */}
        </Select>
      </Form.Item>

      
        <SkillsSelectForm
          multiselect={true}
          name="primary_tech_skill"
          label="Primary Technical Skills"
        />
      
        <Form.Item 
       name="save_filter"
       label="Save filter as"
       onChange={(a)=>{
        console.log("aaaaaaaaaaaaaaaaaaaaa",a.target)
        if(a.target.value===""){
          setCustomFilter(false);
        }
          else{
          setCustomFilter(true);
          }
        }
        
       }>
                <Input showCount maxLength={8} />

       </Form.Item>
      
    </>
  );
}

export default JobPostingFilter;
