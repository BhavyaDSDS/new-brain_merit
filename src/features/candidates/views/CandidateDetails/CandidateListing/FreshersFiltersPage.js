import React from "react";
import { Form, DatePicker, Switch, Slider, Checkbox, Input,} from "antd";
import DegreeSelectForm from "../../../../components/form/DegreeSelectForm";
import CollegeSelectForm from "../../../../components/form/CollegeSelectForm";
import BranchSelectForm from "../../../../components/form/BranchSelectForm";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import RoleSelectForm from "../../../../components/form/RoleSelectForm";
import LocationSelectForm from "../../../../components/form/LocationSelectForm";
const { RangePicker } = DatePicker;
function FreshersFiltersPage(props) {
  const {setCustomFilter} = props
  const CTCformatter = (value) => `${value} LPA`;
  const PercformatterGrt = (value) => `>= ${value} %`;

  const ctcMarks = {
    0: "0",
    50: "50",
    100: "100",
  };
  const Options = [
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Casual',
      value: 'casual',
    },
    {
      label: 'Passive',
      value: 'passive',
    },
  ];


  return (
    <>
      <DegreeSelectForm
        name={"degree_name"}
        label={"Degree"}
        multiselect={true}
      />
      <CollegeSelectForm
        name={"college_name"}
        label={"College"}
        multiselect={true}
      />
      <BranchSelectForm
        name={"branch_name"}
        label={"Branch"}
        multiselect={true}
      />
      <SkillsSelectForm
        label={"Primary Skills"}
        name={"prim_skills"}
        multiselect={true}
      />

<Form.Item label="Passed Out Year" name="timeline" style={{marginTop:"-15px"}}>
        <RangePicker picker="year" placeholder={["From", "To"]} />
      </Form.Item>

      <Form.Item label="Percentage" name="percentage">
        <Slider
          getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")}
          tipFormatter={PercformatterGrt}          
          step={5}
          min={0}
          max={100}
          tooltip={{
            open: true,
            placement:"right" 
          }}
        />
      </Form.Item>

      <Form.Item label="Expected CTC - LPA" name="filter_ctc">
        <Slider
          range
          tipFormatter={CTCformatter}
          marks={ctcMarks}
          step={0.25}
          min={0}
          max={100}
          // defaultValue={[4, 20]}
        />
      </Form.Item>

      <Form.Item label="Preferred Role">
        <RoleSelectForm checkBox={false} multiselect={true} name="pref_role" />
      </Form.Item>


      <Form.Item name="jobChange_status" label="Job status">
      <Checkbox.Group options={Options}/>
      </Form.Item>

      <LocationSelectForm multiselect={true} name="pre_loc" label="Preferred Location" /> 

      {/* <Form.Item name="placement_ready" label="Open For Job" style={{ marginRight: "10px" }}> 
      <Switch defaultunChecked  />
      </Form.Item> */}

      <Form.Item
        name="placement_ready"
        valuePropName="checked"
      >
        <Checkbox>Open For Job</Checkbox>
      </Form.Item>
      
      {/* <Form.Item name="open_for_internship"  label="Open For Internship"style={{ marginRight: "10px" }}>   
      <Switch defaultunChecked  />
      </Form.Item> */}

      <Form.Item
        name="open_for_internship"
        valuePropName="checked"
        style={{marginTop:'-15px'}}
      >
        <Checkbox>Open For Internship</Checkbox>
      </Form.Item>

      <Form.Item
        name="save_filter"
        label="Save filter as"
        onChange={(a) => {
          if (a.target.value === "") {
            setCustomFilter(false);
          } else {
            setCustomFilter(true);
          }
        }}
      >
        <Input showCount maxLength={8} />
      </Form.Item>
    </>
  );
}

export default FreshersFiltersPage;

