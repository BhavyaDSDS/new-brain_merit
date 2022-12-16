import React from "react";
import { Card, Typography, Form, Empty } from "antd";

const { Title } = Typography;

function JobPostingLandingPage({
  responsibility,
  min_requirement,
  Pre_requirement,
}) {

console.log('zzz responsibility',typeof responsibility)
console.log('qqqqqqqaaaaa min_requirement',min_requirement)
console.log('qqqqqqqaaaaa Pre_requirement',Pre_requirement)


  return (
   <>
    <Card size="small" style={{ margin: "0 16px 16px 0" }}>
     <Title level={5}>Responsibility</Title>
     {responsibility != "" ? <div dangerouslySetInnerHTML={{ __html: responsibility }} /> : <p> <Empty description={false}/></p>}
       
    </Card>
        <Card size="small" style={{ margin: "0 16px 16px 0" }}>
        <Title level={5}>Minimum requirement</Title> 
        {
          min_requirement !='' ?  <div dangerouslySetInnerHTML={{ __html: min_requirement }} /> :<Empty description={false}/>
        }
     
       </Card> 
      <Card size="small" style={{ margin: "0 16px 16px 0" }}>
        <Title level={5}>Preferred requirement</Title>
        {
          Pre_requirement != '' ?  <div dangerouslySetInnerHTML={{ __html: Pre_requirement }} />:<Empty description={true}/>
        }
       
      </Card> 
 </>
  );
}

export default JobPostingLandingPage;
