import React from "react";
import { Form, Input, Select, Slider,Checkbox } from "antd";
import { useSelector } from "react-redux";
import CompaniesSelectForm from "../../../../components/form/CompaniesSelectForm";
import DomainSelectForm from "../../../../components/form/DomainSelectForm";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import WorkDomain from "../../../../components/form/WorkDomain";
function InterviewersFilter() {
  const formatterYears = (value) => `${value} years`;
  const formatterRs = (value) => `Rs ${value}`;
  return (
    <>
      <CompaniesSelectForm
        title="Companies work for"
        name="companies_worked_for"
        multiselect={true}
      />

      <WorkDomain name="domains" multiselect={true} />

      <SkillsSelectForm
        label="Primary Technical Skills"
        name="pri_tech_skills"
        multiselect={true}
      />

      <Form.Item label="Total experience" name="total_exp">
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

      <Form.Item label="Relevant Experience" name="relevant_experience">
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

      <Form.Item
        label="No.of Interviews conducted"
        name="no_of_interviews_conducted"
      >
        <Slider
          //tipFormatter={formatterYears}
          range
          step={1}
          min={0}
          max={100}
          // tooltipVisible="true"
         // defaultValue={[0, 0]}
        />
      </Form.Item>

      {/* <Form.Item label="Cost per interviews" name="cost_per_interview">
        <Slider
          tipFormatter={formatterRs}
          range
          step={100}
          min={200}
          max={2000}
          // tooltipVisible="true"
          defaultValue={[0, 0]}
        />
      </Form.Item> */}

      <Form.Item name="active" valuePropName="checked">
        <Checkbox>Active</Checkbox>
      </Form.Item>
    </>
  );
}

export default InterviewersFilter;
