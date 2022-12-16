import React, { useState, useEffect } from "react";
import {
  Tabs,
  Collapse,
  Avatar,
  List,
  Col,
  Row,
  Card,
  Space,
  Upload,
  Tag,
  Image,
  Typography,
  Divider,
  Button,
  Dropdown,
  Menu,
  Modal,
  Empty
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  IssuesCloseOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  ShareAltOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
  MoreOutlined,
  CarryOutOutlined,
  getTwoToneColor,
  handleDirButtonClick,
  LinkedinFilled,
  PhoneOutlined ,
  MailOutlined,
  ConsoleSqlOutlined,
  CheckCircleTwoTone,
  
  
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import AddInterviewersDetail from "../InterviewersDetails/AddInterviewers/AddInterviewersDetail";
import DotSeparator from '../../../components/utils/DotSeparator';
// import { getJobPosting } from "../../../employerSlice";

import { getInterviewerDetail, deleteInterviewer, updateInterviewer,setRefreshInterviewerList } from "../../interviewerSlice";
import { objectLength } from "../../../components/utils/JavaScriptUtils";
// import SkillsView from "../../../components/view/SkillsView";

// import JobSeekerStatusView from "../../../../components/view/JobSeekerStatusView";

import InterviewersHeadLine from "./InterviewersHeadLine";
import { times } from "lodash";
import { data } from "browserslist";
const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { confirm } = Modal;

function InterviewersProfile(props) {
  const { recordKey, onShowNextInterviewer,afterProfileDelete} = props;
  console.log('record',recordKey)
     
  const [editInterviewers, setEditInterviewers] = useState(false);
  // const {name,multiselect,label} = props



  const interviewersDetails = useSelector((state) => state.interviewer.interviewerDetail)
  const employersList = useSelector((state) => state.employer.listEmployers);
  const domainList = useSelector((state) => state.utils.candDomainList);
  const [screenComment, setScreenComment] = useState(false);
  const [screenSlot, setScreenSlot] = useState(false);
  console.log('ddddd',domainList)
 

  const [TabKey, setTabKey] = useState("1");
    const roleList = useSelector((state) => state.utils.roleList);
    const employerId = useSelector((state) => state.employer.listEmployers);
    const skillsList = useSelector((state) => state.utils.skillsList);
    const locationsList = useSelector((state) => state.utils.locationsList);

    var roles;
    if (JSON.stringify(roleList) !== "{}") {
      roles = roleList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }

    var empId;
    if (JSON.stringify(employerId) !== "{}") {
      empId = employerId.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }

    var skillList;
    if (JSON.stringify(skillsList) !== "{}") {
      skillList = skillsList.map(function (obj) {
        return { label: obj.name, value: obj.id };
      });
    }

    var locationName;
    if (JSON.stringify(locationsList) !== "{}") {
      locationName = locationsList.map(function (obj) {
        return { label: obj.city, value: obj.id };
      });
    }
    var options;
    if(JSON.stringify(employersList) !== '{}'){
      console.log('jjjjjj',employersList)
      options = employersList.map(function (obj) {
        
        return { label: obj.name , value: obj.id };
        
      })
      console.log('ooooooo',options)
    }
    var domain;
    if(JSON.stringify(domainList) !='{}'){
      domain=domainList.map(function (obj){
        return{label:obj.name ,value:obj.id }
      })
    }
    // console.log('dodo',domain)
    // const selectProps={
    //   style:{
    //     width:'100%',
    //   },
    //   domain,
    // }

    // if(multiselect=== true)
    // {
    //   selectProps.MoreOutlined= 'multiple';
    // }


  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect - recordkey in EmployerProfile: " + recordKey);
    dispatch(getInterviewerDetail(recordKey));
    setTabKey("1");
  }, [recordKey]);

  const onChange = (key) => {
    setTabKey(key);
    console.log(key);
  };
  function OnInterviewerModalCancel() {
    setEditInterviewers(false);
  }
  const handleButtonClick = (e) => {
    //  message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleDirButtonClick=(direction)=>{
     
    onShowNextInterviewer(recordKey,direction);
    console.log('onnnn',recordKey)
  }

  const deleteConfirm = () => {
    confirm({
      title: "Are you sure delete this profile",
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'cancel',
      onOk() {
        // const data = recordKey
        const values = { is_deleted: true };
        const data = [values, recordKey];
        dispatch(updateInterviewer(data));
        afterProfileDelete(recordKey);
        //dispatch(deleteInterviewer(data));
        dispatch(setRefreshInterviewerList());
        console.log("setRefreshInterviewerList called");

      }
    });
  };
  // const handleMenuClick = (e) => {
  //   message.info('Click on menu item.');
  //   console.log('click', e);
  // };

  const handleMenuClick = (e) => {
    // message.info('Click on menu item.');

    console.log('click', e);
    if (e.key === "2") {
      deleteConfirm();

    }

    else if (e.key === "1") {
      setEditInterviewers(true);
    }

  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Edit Profile',
          key: '1',
          icon: <EditOutlined />,
        },
        {
          label: 'Delete',
          key: '2',
          icon: <DeleteOutlined />,
        },
        // {
        //   label: '3rd menu item',
        //   key: '3',
        //   icon: <CheckOutlined />,
        // },
      ]}
    />
  );

  const propss = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  console.log("interviewersDetails info from profileView =", interviewersDetails)
    
   let optionsobj
   if(interviewersDetails.companies_worked_for !=null){
    optionsobj= options.find((o)=> o.value === interviewersDetails.companies_worked_for)
   }
    console.log('optopt',optionsobj)
  
    let domainobj=[]
    if (interviewersDetails.domains !=undefined) { 
      domainobj=interviewersDetails.domains.map((obj)=>{
        let dom= domain.find((o)=> o.value=== obj)
        return dom.label
      })
    }
     console.log('oobbjj',domainobj)


     let rolesName = roles.find((o) => o.value === interviewersDetails.role)
     let companyName = empId.find((o) => o.value === interviewersDetails.employer)




      let primarySkills = [] ;
      if(interviewersDetails.p_tech_skills !== undefined){
      primarySkills = interviewersDetails.p_tech_skills.map((skillData) => {
          let skills = skillList.find((o) => o.value === skillData)
          return skills.label
      })

    }
  console.log("skills name =",primarySkills)

      let OtherSkills = [];
      if(interviewersDetails.sec_tech_skills !== undefined){
        OtherSkills = interviewersDetails.sec_tech_skills.map((skillData) => {
          let skills = skillList.find((o) => o.value === skillData)
          return skills.label
      })

    }
  console.log("skills name =",OtherSkills)

      let NonTechSkills = [];
      if(interviewersDetails.sec_tech_skills !== undefined){
        NonTechSkills = interviewersDetails.sec_tech_skills.map((skillData) => {
          let skills = skillList.find((o) => o.value === skillData)
          return skills.label
      })

    }
  console.log("skills name =",NonTechSkills)
     if(interviewersDetails.total_exp){
        var text = "LPA"
     }else{
      var text = "KPM"
     }
     if(interviewersDetails.relevant_experience){
      var text = "LPA"
   }else{
    var text = "KPM"
   }
  //    let salary = `${salMin} - ${salMax} ${text}`;
  console.log("updateInterviewer recordKey**********#############******", recordKey)

  const handleFinish =(values) => {
console.log("Updated values",values)
  


    if (recordKey) {
      console.log("updateInterviewer recordKey**********#############******", recordKey)
      
      const data = [values, recordKey];
      console.log("updateInterviewer recordKey**********#############******", data)

      dispatch(updateInterviewer(data));
      dispatch(setRefreshInterviewerList());
      console.log("setRefreshInterviewerList() called *******#####****");
    }
    setEditInterviewers(false);
  }
    // console.log("emp primary Edit info = ",values);
    // console.log("emp primary Edit JSON info =",JSON.stringify(values));

    var rolename; 
    if(rolesName !== undefined)
    {
      rolename = rolesName.label
    }

    var companyname; 
    if(companyName !== undefined)
    {
      companyname = companyName.label
    }

   
    function getColor(name) {
      const colors = [
        "#91d5ff",
        "#1890ff",
        "#3f6600",
        "#b37feb",
        "#13c2c2",
        "#7cb305",
        "#096dd9",
      ];
      const firstChar = name.charCodeAt(0);
     // const secondChar = last_name.charCodeAt(0);
    
      return colors[(firstChar) % 7];
      //return colors[6];
    }
  
    const onClose = () => {
      setSchedular(false);
    };
    
  return (
    <>
      {editInterviewers && (
        <AddInterviewersDetail
          editableForm={true}
          onFinishInterviewersDetail={handleFinish}
          onModalCancel={OnInterviewerModalCancel}
          interviewersDetails={interviewersDetails}
        // employerDetails={employerDetails}
        />
      )}
      {
        console.log('tqtq',interviewersDetails)
      }


<Row>
<Col span={12}>
    <Row>
    <Col span={4}>
              {interviewersDetails.photo &&(
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                shape="square"
               src={interviewersDetails.photo}
              />
              )}
              {!interviewersDetails.photo && interviewersDetails.first_name &&(
                <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  shape="square"
                  style={{
                    backgroundColor: getColor(
                        interviewersDetails.first_name,
                        interviewersDetails.last_name
               ) ,
              }}>
                {interviewersDetails.first_name.charAt(0).toUpperCase()}{''}
                {interviewersDetails.last_name.charAt(0).toUpperCase()}
                 </Avatar>
              )}
    </Col>
      <Col span={20}>
          <Row>
          <Col>
                    <div style={{marginBottom:'-20px', marginLeft:'25px'}}>
                      <Title level={4}>
                        {interviewersDetails.first_name} {interviewersDetails.last_name}
                      </Title>
                      
                    </div>
          </Col>
                      <div style={{marginLeft:'5px'}}>
                    {interviewersDetails.active == true ?
                    // ( <Tag color="#87d068"><CheckCircleFilled/></Tag>):null
                        (<CheckCircleTwoTone twoToneColor="#54B435" />):null
                    }
                    </div> 
                     
          </Row>
          <Row>
          <Col style={{marginTop:'10px'}}>
                  <InterviewersHeadLine/>
          </Col>
          </Row>
          </Col>
          </Row>
        </Col>
            <Col span={12}>
                <Space
                  direction="horizontal"
                  style={{ width: "100%", justifyContent: "right" }}
                >
                  <Button
                    onClick={() => {
                      handleDirButtonClick("Left");
                    }}
                  >
                    <LeftOutlined />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDirButtonClick("Right");
                    }}
                  >
                    <RightOutlined />
                  </Button>
                  <Button>
                    <ShareAltOutlined />
                    Share
                  </Button>
                  <Button>
                    <StarOutlined />
                    Shortlist
                  </Button>
                  <Dropdown onClick={handleButtonClick} overlay={menu}>
                    <Button><MoreOutlined /></Button>
                  </Dropdown>
                </Space>
            </Col>
      </Row>


      
      <Row gutter={16}>
           <Col span={16}>
            
             
            <Tabs activeKey={TabKey} onChange={onChange}>
             <TabPane tab="Overview" key="1">
             <Row gutter={16}>
                      <Col span={24}>
                      <Card style={{marginTop:'2px'}}>
                      
                      <Title level={5}>Interview Preferences</Title>
                      {console.log('intrr',interviewersDetails.availablity_for_interview)}
                      {(interviewersDetails.availablity_for_interview != null && objectLength(interviewersDetails.availablity_for_interview) > 0) ?
                      <div style={{ marginBottom: 16 }}>
                        {console.log('avva hello i am here')}
                        <Text type="secondary">Interview Availability Slots</Text>
                        {interviewersDetails.availablity_for_interview.map(
                          (info, idx) => {
                           
                            return (
                              <Row>
                                <Col span={5}>
                                  <Text key={idx}>{info.day}</Text>
                                </Col>
                                <Col span={1} />
                                <Col span={18}>
                                  <Text>
                                    {info.time[0]} - {info.time[1]}
                                    {/* {timeConverter(info.time[0]) - timeConverter(info.time[1])} */}
                                  </Text>
                                </Col>
                              </Row>
                            );
                          }
                        )}
                          </div> : 
                            <>
                            <Empty description={false} />
                            </>
                        }
                </Card>
                      </Col> </Row>
                       </TabPane>
              </Tabs>
              </Col>

        <Col span={8} style={{ marginTop: "21px" }}>
          <Divider style={{ marginBottom: "16px" }} />
          
            <Card size="small">
              <Row>
                <Col>
                <Title level={5} style={{ fontWeight: 500, marginBottom:'10px' }}>
                      <b>Contact Info</b>
                    </Title>
                </Col>
              </Row>
                    
                    {interviewersDetails.phone_number !=null && interviewersDetails.phone_number.phone !=''&&(
                      <div>
                          <PhoneOutlined  style={{marginRight :'10px',marginBottom:'16px',fontSize:15}}/>
                          {interviewersDetails.phone_number.phone}
                      </div>
                    )}
                    {interviewersDetails.email != null &&(
                      <div>
                        <MailOutlined style={{marginRight :'10px', marginBottom:'16px',fontSize:15}}/>
                        {interviewersDetails.email}
                      </div>
                    )}
                     
                     {
                      console.log("linnnn",interviewersDetails.linkedin_profile)
                     }
                      {interviewersDetails.linkedin_profile !=0 && (
                        <div>
                          <a href={data.link} target="_blank">
                              {
                                <LinkedinFilled style={{color : "#69b8f0", fontSize:24 }}/>
                              }
                            </a>
                        </div>
                      )}
                    </Card>
                   
                   {primarySkills.length > 0 || OtherSkills.length > 0 || NonTechSkills.length > 0   ?  
                <Card size="small" style={{marginTop:'16px'}}>
                 
                  {primarySkills.length > 0? <div style={{marginBottom:'16px'}}>
                      <Title level={5}>Primary skills</Title>
                      {primarySkills.map((data) => 
                      <Tag color="blue">{data}</Tag>
                      )}
                    </div>: null}
                    {OtherSkills.length > 0?  <div style={{marginBottom:'16px'}}>
                      <Title level={5}>Secondary skills</Title>
                      {OtherSkills.map((data) => 
                      <Tag color="default">{data}</Tag>
                      )}
                    </div>: null}

                     {NonTechSkills.length > 0?<div style={{marginBottom:'16px'}}>
                      <Title level={5}>Non-tech skills</Title>
                      {NonTechSkills.map((data) => 
                      <Tag color="default">{data}</Tag>
                      )}
                      </div>:null}


                        {interviewersDetails.total_exp?
                      <div>
                      <Title level={5}>
                        Total experience : </Title> {interviewersDetails.total_exp} years
                      
                      <Title level={5}>
                        Relevant experience : </Title> {interviewersDetails.relevant_experience} years
                    
                    </div>:null}

                    {interviewersDetails &&( 
                      <div >
                    {optionsobj != undefined &&(
                      
                      <div style={{marginBottom:'16px'}}>
                       <Title level={5}>Companies worked for </Title>
                      <Tag>{optionsobj.label}</Tag> 
                       </div>
                       )}
                      {domainobj.length>0? <div style={{marginBottom:'16px'}}>
                        <Title level={5}>Domain</Title>
                        {
                          domainobj.map((data)=>
                          <Tag color="default">{data}</Tag>
                          )
                        }
                        </div>:null
                      }
                  
                    {interviewersDetails.no_of_interviews_conducted != undefined &&(
                      <div style={{marginBottom:'16px'}}>
                      <Title level={5}>Interviews Conducted</Title>
                      
                       {interviewersDetails.no_of_interviews_conducted}
                      </div>
                      )} 
                    </div>
                          )}
                      </Card> 
                 : null } 
                    </Col>
                      </Row>

                


                
                
             
              
         
          
          
    </>
  )
}

export default InterviewersProfile