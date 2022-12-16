import React from "react";
import { Card, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../../../components/utils/JavaScriptUtils";
const { Text, Title } = Typography;

function EmployerInfo() {
  const employerDetails = useSelector((state) => state.employer.employerDetail);
  const domainList = useSelector((state) => state.utils.domainList);

  let domains;
  if (objectLength(domainList) > 0) {
    domains = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }


  let domainName;
  employerDetails.domain != null &&
    (domainName = domains.find((o) => o.value == employerDetails.domain));
    console.log('ttttttttttttt',employerDetails);
   
    let d = employerDetails.year_founded;

    let year;
    if(d != undefined){
     year = d.slice(0,4)

    }


    // if(employerDetails != undefined){

    //   year = employerDetails.year_founded.split("-");
    // }

    
  return (
    <div>
     
        <Card size="small">
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {employerDetails.business_entity != null && (
              <>
                <div>
                  <Text type="secondary">Business entity</Text>
                  <div>
                    <Text strong>{employerDetails.business_entity}</Text>
                  </div>
                </div>
              </>
            )}

            {employerDetails.company_size != null && (
              <>
                <div>
                  <Text type="secondary">Company size</Text>
                  <div>
                    <Text strong>{employerDetails.company_size}</Text>
                  </div>
                </div>
              </>
            )}
              
            {domainName != undefined && (
              <>
                <div>
                  <Text type="secondary">Domain</Text>
                  <div>
                    <Text strong>{domainName.label}</Text>
                  </div>
                </div>
              </>
            )}

            {year != undefined && (
              <>
                <div>
                  <Text type="secondary">Year founded</Text>
                  <div>
                    <Text strong>{year}</Text>
                  </div>
                </div>
              </>
            )}

            {employerDetails.company_type != null && (
              <>
                <div>
                  <Text type="secondary">Company type</Text>
                  <div>
                    <Text strong>{employerDetails.company_type}</Text>
                  </div>
                </div>
              </>
            )}
          </Space>
        </Card>
    </div>
  );
}

export default EmployerInfo;
