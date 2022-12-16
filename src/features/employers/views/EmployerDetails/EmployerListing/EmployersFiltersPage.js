import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Select, InputNumber, Input, DatePicker, } from "antd";
import LocationSelectForm from "../../../../components/form/LocationSelectForm";
import DomainSelectForm from "../../../../components/form/DomainSelectForm";
import { objectLength } from "./../../../../components/utils/JavaScriptUtils";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import {Row,Col} from "antd";
import moment from "moment";
const technologies_used = "";
const { RangePicker } = DatePicker;
function EmployersFiltersPage(props) {
const {setCustomFilter}=props
  const techLang = useSelector((state) => state.utils.skillsList);
  let techLangName;
  //console.log("techLang", techLang)
  if (objectLength(techLang) > 0) {
    techLangName = techLang.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  return (
    <>

      <DomainSelectForm name={"domain"}
        label={"Industry / Sector"}
        multiselect={true}
      />
       <SkillsSelectForm
          // value={technologies_used}
          label={"Technologies used"}
          name={"technologies"}
          required={false}
          multiselect={true}
        />
      <Form.Item
        name="company_size"
        label="Company size"
      >
        <Select allowClear>
          <Option value="0-1 employees">0-1 employees</Option>
          <Option value="2-10 employees">2-10 employees</Option>
          <Option value="11-50 employees">11-50 employees</Option>
          <Option value="51-200 employees">51-200 employees</Option>
          <Option value="201-500 employees">201-500 employees</Option>
          <Option value="501-1,000 employees">501-1,000 employees</Option>
          <Option value="1,001-5,000 employees">1,001-5,000 employees</Option>
          <Option value="5,001-10,000 employees">5,001-10,000 employees</Option>
          <Option value="10,001+ employees">10,001+ employees</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="work_type"
        label="Work type"
        mode="multiple"
      // mode="multiple"

      //multiselect={true}
      >
        <Select allowClear mode="multiple">
          <Option value="on-site">on-site</Option>
          <Option value="hybrid">Hybrid</Option>
          <Option value="remort">Remort</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Location" >
        <LocationSelectForm
          checkBox={false}
          multiselect={true}
          name={"job_locations"}
        />
      </Form.Item>
      <Form.Item
        name="year_founded"
        label="Year founded"
      >
        <RangePicker picker="year"
          placeholder={["From", "To"]}
          disabledDate={(current) => {return current && current > moment().endOf("day")}}
        />
                  </Form.Item>

    <Row>
    {/* <Col span={12}>  */}
    <Form.Item label="Total funding">
    <Input.Group compact>
      <Col>
     <Form.Item
          // label="Total funding"
          style={{ width: "100%", marginBottom: -26 }}
        >
          <Input.Group compact>
            <Form.Item
              name={["total_fund_from", "number"]}
              style={{ width: 120}}
            >
             
              <InputNumber  placeholder="From" addonBefore="$" controls={false} />
            </Form.Item>
            <Form.Item name={["total_fund_from", "type"]} noStyle>
              <Select allowClear defaultValue="M">
                <Option value="M">M</Option>
                <Option value="B">B</Option>
                <Option value="K">K</Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        </Col> 
      {/* <Col span={12}> */}
      <Col>
        <Form.Item
          // label="Total funding"
          style={{ width: "200%", marginBottom: -26 }}
        >
          <Input.Group compact>
            <Form.Item
              name={["total_fund_to", "number"]}
              style={{ width: 120 }}
            >
              <InputNumber placeholder="To" addonBefore="$" controls={false} />
            </Form.Item>
            <Form.Item name={["total_fund_to", "type"]} noStyle>
              <Select allowClear defaultValue="M">
                <Option value="M">M</Option>
                <Option value="B">B</Option>
                <Option value="K">K</Option>
              </Select>
            </Form.Item>
          </Input.Group>
          
        </Form.Item>
        </Col>
        </Input.Group>
        </Form.Item>
        
         {/* </Col>  */}
        </Row>
        {/* // <Text type="secondary">eg:- $10.5M</Text> */}
     

       {/* <Form.Item 
       style={{marginTop:"20px"}}
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

       </Form.Item> */}
      
      </>
      );
}

      export default EmployersFiltersPage;
