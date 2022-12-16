import React, { useState } from "react";
import {
  Form,
  DatePicker,
  Select,
  Slider,
  Input,
  Checkbox,
  Radio,
  Col,
} from "antd";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import RoleSelectForm from "../../../../components/form/RoleSelectForm";
import { CANDIDATE_MAX_EXP } from "../../../../../constants";
import { useSelector } from "react-redux";
import LocationSelectForm from "../../../../components/form/LocationSelectForm";

const { RangePicker } = DatePicker;


function ExpCandidatesFiltersPage(props) {
  const { setCustomFilter, setrelevantExpShow, relevantExpShow } = props;

  const roleList = useSelector((state) => state.utils.roleList);
  var options;

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

  const currentRole = (a) => {
      if(a===undefined){
        setrelevantExpShow(false)
      }else{
        setrelevantExpShow(true)
      }
  }

  const expMarks = {
    15: "15",
  };

  const ctcMarks = {
    0: "0",
    50: "50",
    100: "100",
  };

  const noticePMarks = {
    0: "0",
    45: "45",
    90: "90",
  };

  const CTCformatter = (value) => `${value} LPA`;
  const Expformatter = (value) => `${value} YRS`;
  const NPformatter = (value) => `${value} DAYS`;
  const ExpformatterGrt = (value) => `>= ${value} YRS`;

  // console.log("relevant_Exp status ===",relevant_Exp)

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

  const onChangeAddRel = (v) => {
    setrelevantExpShow(v.target.checked)
  }

  return (
    <>
      <SkillsSelectForm
        label={"Primary Skills"}
        name={"prim_skills"}
        multiselect={true}
      />

      <Form.Item label="Preferred Role">
        <RoleSelectForm checkBox={false} multiselect={true} name="pref_role" />
      </Form.Item>

      <Form.Item label="Total Experience - YRS" name="filter_total_exp">
        <Slider
          range
          tipFormatter={Expformatter}
          marks={expMarks}
          step={0.5}
          min={0}
          max={CANDIDATE_MAX_EXP}
          // defaultValue={[2, 8]}
        />
      </Form.Item>

      <Form.Item label="Current Role" name="cur_role" >
          <Select {...selectProps}
           allowClear 
           onChange={currentRole}
           showSearch
           optionFilterProp="children"
          filterOption={(input, options) => {
            //console.log("from search =",options)
            return options.label.toLowerCase().includes(input.toLowerCase());
          }}
           />
      </Form.Item>

      {relevantExpShow && 
        <Form.Item label="Relevant Experience - YRS" 
        name="filter_rel_exp"
        //dependencies={["filter_total_exp"]}
        // rules={[
        //   ({ getFieldValue }) => ({
        //     validator(_, value) {
        //       // console.log("total exp ==",getFieldValue("filter_total_exp")[1])
        //       // console.log(" total_experience ==== rel exp value",getFieldValue('total_experience'),value);
        //       if (getFieldValue("filter_total_exp")[1] >= value) {
        //         return Promise.resolve();
        //       }
        //       return Promise.reject(
        //         new Error("The relevant exp is more then total exp!")
        //       );
        //     },
        //   }),
        // ]}
        >
          <Slider
          getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")}
            tipFormatter={ExpformatterGrt}
            marks={expMarks}
            step={-0.5}
            min={0}
            max={CANDIDATE_MAX_EXP}
            included={false}
            // defaultValue={[2, 8]}
            tooltip={{
              open: true,
              placement:"right" 
            }}
          />
        </Form.Item>}
        


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

      <Form.Item label="Notice Period - DAYS" name="filter_notice_period">
        <Slider
          range
          tipFormatter={NPformatter}
          marks={noticePMarks}
          step={1}
          min={0}
          max={90}
          // defaultValue={[15, 30]}
        />
      </Form.Item>

      <Form.Item name="resigned_status">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="resigned">Resigned</Radio.Button>
          <Radio.Button value="not_resign">Not-Resigned</Radio.Button>
          <Radio.Button value="all">All</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="jobChange_status">
      <Checkbox.Group options={Options}/>
      </Form.Item>

    
      <LocationSelectForm multiselect={true} name="pre_loc" label="Preferred Location" />  


      {/* setCustomFilter(true) */}
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

export default ExpCandidatesFiltersPage;
