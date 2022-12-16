import React from "react";
import { Card, Empty, Space,Typography } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../../../components/utils/JavaScriptUtils";
import {
  PhoneOutlined,
  MailOutlined,
  LinkOutlined,
  LinkedinFilled,
  GithubFilled,
  EnvironmentOutlined,
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled
} from "@ant-design/icons";
import { values } from "lodash";
const {Title}=Typography;

function EmployerContactInfo() {
  const employerDetails = useSelector((state) => state.employer.employerDetail);
  const location =
    objectLength(employerDetails.locations) > 0 &&
    employerDetails.locations.map((loc) => loc.city + " ");

    let phoneNumber
    if(employerDetails.phone_number != undefined){
       phoneNumber = employerDetails.phone_number.phone

    }
  return (
    <>
    <div>
        <Card size="small">
        <Title level={5}> Contact Info</Title>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            
            {employerDetails.phone_number != null && employerDetails.phone_number.phone != "" &&(
              <div>
                <PhoneOutlined style={{ marginRight: "10px", color: "grey" }} />
                {employerDetails.phone_number.phone}
              </div>
            )}
            {employerDetails.email != null && (
              <div>
                <MailOutlined style={{ marginRight: "10px", color: "grey" }} />
                {employerDetails.email}
              </div>
            )}
            {employerDetails.website != null && (
              <div>
                <LinkOutlined style={{ marginRight: "10px", color: "grey" }} />
                {employerDetails.website}
              </div>
            )}


            { employerDetails.email ==null && employerDetails.website == null && (phoneNumber === undefined || phoneNumber === "") && (
             
             <Empty description={false} />
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>

              {objectLength(employerDetails.links)>0 &&
              employerDetails.links.map((data)=> {

                if (data.Link!='')
                {
                  
                  if (data.LinkType == "GitHub")
                 {
                
                // console.log('qqwwwwwweeeeeee',data.Link) 

               
                    return  <a href={data.Link} target="_blank">
                              {
                                <GithubFilled
                                  style={{ fontSize: 24, color: "#69b8f0" }}
                                />
                              }
                            </a>
                          
                          
                }else if(data.LinkType=='LinkedIn')
                {
                  
                      
                  return <a href={data.Link} target="_blank">
                      {
                        <LinkedinFilled
                          style={{ fontSize: 24, color: "#69b8f0" }}
                        />
                      }
                    </a>
                  
                }else if(data.LinkType=='FaceBook')
                {
                 
                       
                   return <a href={data.Link} target="_blank">
                      {
                        <FacebookFilled
                          style={{ fontSize: 24, color: "#69b8f0" }}
                        />
                      }
                    </a>
                  
                }else if(data.LinkType=='Instagram')
                {
                 
                        
                    return <a href={data.Link} target="_blank">
                      {
                        <InstagramFilled
                          style={{ fontSize: 24, color: "#69b8f0" }}
                        />
                      }
                    </a>
                  
                }else  (data.LinkType=='Twitter')
                {
                  
                        
                    return<a href={data.Link} target="_blank">
                      {
                        <TwitterCircleFilled
                          style={{ fontSize: 24, color: "#69b8f0" }}
                        />
                      }
                    </a>
                  
                }
               
              }
              }
                
              )
            }

              
              
              



                   {/* {objectLength(employerDetails.links) > 0 &&
                    employerDetails.links.map((value) => {
                      return value.LinkType === "GitHub"
                        ? value.link != "" && (
                        
                            <a href={value.Link} target="_blank">
                              {
                                <GithubFilled
                                  style={{ fontSize: 24, color: "#69b8f0" }}
                                />
                              }
                            </a>
                          
                          )
                      : value.Link != "" && (
                            <a href={value.Link} target="_blank">
                              {
                                <LinkedinFilled
                                  style={{ fontSize: 24, color: "#69b8f0" }}
                                />
                              }
                            </a>
                          )
                         
                    })} */} 
                </div>
                  
              
               

            {/* {objectLength(employerDetails.locations) > 0 && (
              <div>
                <EnvironmentOutlined
                  style={{ marginRight: "4px", color: "grey" }}
                />
                {location}
              </div>
            )} */}
          </Space>
        </Card>
      
    </div>
    </>
  );
}

export default EmployerContactInfo;
