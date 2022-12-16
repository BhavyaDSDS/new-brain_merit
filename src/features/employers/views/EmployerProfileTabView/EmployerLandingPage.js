import React from 'react'
import { Card, Typography, Form } from "antd";

const { Title } = Typography;

function EmployerLandingPage({description}) {

  console.log(".....")

  return (
    <>
    {/* <Card  size="small" style={{ "margin": "0 16px 16px 0" }}> */}
    <Title level={5}></Title> 
       <p>{description}</p>

            
    {/* </Card> */}
    </>
  )
}

export default EmployerLandingPage