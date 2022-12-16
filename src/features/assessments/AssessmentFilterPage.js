import React from "react";
import {Form,Input, Select,} from "antd";
import { useSelector } from "react-redux";
function AssessmentFilterPage(){
    const employerId = useSelector((state) => state.employer.listEmployers);
    var options;
    if (JSON.stringify(employerId) !== "{}") {
      options = employerId.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }
    const selectProps={
        style:{
            width: "100%",
        },
        options,
        };
        return(
            <>
            <Form.Item label="Employer" name="employer">
                <Select
                mode="multiple"
                {...selectProps}
                showSearch
                optionFilterProp="children"
                filterOption={(input, options) => {
                    //console.log("from search =",options)
                    return options.label.toLowerCase().includes(input.toLowerCase());
                  }}/>
            </Form.Item>
            </> 
        )
    }

   
export default AssessmentFilterPage;