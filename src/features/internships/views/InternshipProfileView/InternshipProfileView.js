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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
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
  ExclamationCircleOutlined,
  handleDirButtonClick
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getInternship,updateInternship,setRefreshInternshipList } from "../../internshipSlice";
import InternshipLandingPage from "./InternshipLandingPage";// import {  } from "../../employerSlice";
import CreateJobPosting from "../../../components/form/CreateJobPosting";
import moment from "moment";
const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const {confirm}=Modal;

function InternshipProfileView(props) {
  const { recordKey,onShowNextInternship, afterProfileDelete} = props;
 
  const [editPrimInfo, setEditPrimInfo] = useState(false);


  const jobPostingDetails = useSelector((state) => state.internship.internshipDetail)
  const listInternShip = useSelector((state) => state.internship.listInternShip)

//console.log("jobPostingDetail",jobPostingDetail)

  
  
  
  const [TabKey, setTabKey] = useState("1");
  const roleList = useSelector((state) => state.utils.roleList);
  const employerId = useSelector((state) => state.employer.listEmployers);
  const skillsList = useSelector((state) => state.utils.skillsList);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const ntskillsList = useSelector((state) => state.utils.ntskillsList);

//   console.log("use effect - recordkey in EmployerProfile: ", recordKey);
//console.log("use effect - recordkey in EmployerProfile: ", listInternShip);
//console.log("use effect - recordkey in EmployerProfile: ", skillsList);
//console.log("use effect - recordkey in EmployerProfile: ", locationsList);
// console.log("jobPostingDetail **########**",listInternShip)
console.log("jobPostingDetailsjobPostingDetailsjobPostingDetails",jobPostingDetails)
  var roles;
  if (JSON.stringify(roleList) !== "{}") {
    roles = roleList.map(function (obj) {
        console.log("use effect - recordkey in EmployerProfile:  ", roles);

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
  var nonTechSkill
  if (JSON.stringify(ntskillsList) !== "{}") {
    nonTechSkill = ntskillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var locationName;
  if (JSON.stringify(locationsList) !== "{}") {
    locationName = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }
  const dispatch = useDispatch();
console.log("listInternShip  kfdshfks",listInternShip)

  useEffect(() => {
    //console.log("use effect - recordkey in EmployerProfile: " + recordKey);
    dispatch(getInternship(recordKey));
    setTabKey("1");
  }, [recordKey]);

  const onChange = (key) => {
    setTabKey(key);
    console.log(key);
  };

  // const handleButtonClick = (e) => {
  //   message.info('Click on left button.');
  //   console.log('click left button', e);
  // };
  const handleDirButtonClick = (direction) => {
    onShowNextInternship(recordKey, direction);
  };
  const deleteConfirm=()=>{
    confirm({
      title:"Are you sure delete this profile",
      icon:<ExclamationCircleOutlined/>,
      okText:'Delete',
      okType:'danger',
      cancelText:'cancel',
      onOk(){
        // const data= recordKey
        const values = { is_deleted: true };
        const data = [values, recordKey];
        dispatch(updateInternship(data));
       afterProfileDelete(recordKey);
        dispatch(setRefreshInternshipList());
        console.log("setRefreshInternshipList() called");

       

      }
    });
  };


  
  const handleMenuClick = (e) => {
   // message.info('Click on menu item.');
    console.log('click', e);
    if(e.key==="2"){
      deleteConfirm();
    }
    
      else if(e.key==="1"){
        setEditPrimInfo(true);
      }
    
  };

  

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Edit Profile',
          key: '1',
          icon: <EditOutlined />
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
  console.log("jobsDetails info from jobPostingProfileView =",listInternShip.role)
    
   let rolesName = roles.find((o) => o.value === listInternShip.role)
   console.log("rolesName",roles)
   let companyName = empId.find((o) => o.value === listInternShip.employer)

    let primarySkills = [] ;
    if(jobPostingDetails.pri_tech_skills !== undefined){
    primarySkills = jobPostingDetails.pri_tech_skills.map((skillData) => {

        let skills = skillList.find((o) => o.value === skillData)
        return skills.label
    })


  }
    console.log("skills name =",primarySkills)

    let OtherSkills = [];
    if(jobPostingDetails.sec_tech_skills !== undefined){
      OtherSkills = jobPostingDetails.sec_tech_skills.map((skillData) => {
        let skills = skillList.find((o) => o.value === skillData)
        return skills.label
    })

console.log("ininin",jobPostingDetails)
  }
    console.log("skills name =",OtherSkills)

    let NonTechSkills = [];
    if(jobPostingDetails.non_tech_skills !== undefined){
      NonTechSkills = jobPostingDetails.non_tech_skills.map((skillData) => {
        let skills = nonTechSkill.find((o) => o.value === skillData)
        return skills.label
    })

  }
    console.log("skills name =",NonTechSkills)


    var workLocations = [];
    if(jobPostingDetails.work_locations !== undefined){
        workLocations = jobPostingDetails.work_locations.map((locData) => {
          let location = locationName.find((o) => o.value === locData.location_id)

            return {locName : location.label, locType : locData.type}
        })
    }
       console.log("worklocation info = ",workLocations)
  
    let jobType ;
    jobPostingDetails.job_type == "full"? jobType = "Full time" : jobType = "Contract"

   let salMax,salMin
   salMax = jobPostingDetails.salary_range_min / 100000 
   salMin = jobPostingDetails.salary_range_max / 100000 

   if(jobPostingDetails.total_exp){
      var text = "LPA"
   }else{
    var text = "KPM"
   }
   let salary = `${salMin} - ${salMax} ${text}`;

      
   

      
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

  function OnPrimInfoModalCancel() {
    setEditPrimInfo(false);
  }
  console.log("zzz ZZZZZZZZZZZZZZZZ",recordKey)

  const handleFinish = React.useCallback((values) => {
    if (recordKey) {
      console.log("zzz",recordKey)

      const data = [values, recordKey];
      dispatch(updateInternship(data));
      dispatch(setRefreshInternshipList());
      console.log("setRefreshInternshipList() called");
    }
    setEditPrimInfo(false);

    // console.log("emp primary Edit info = ",values);
    // console.log("emp primary Edit JSON info =",JSON.stringify(values));
  }, [recordKey]);

   const dates =(jobPostingDetails.application_closes_on)
   {
    moment(dates).format('DD MMM YYYY')
   }

  return (
    <>
{/* {editJobPosting&&(
  <CreateJobPosting editableForm={true} onFinishJobPosting={}
)} */}

    {editPrimInfo && 
    <CreateJobPosting 
    editableForm={true}  
   // jobPostingDetails={jobPostingDetails}
   onFinishJobPosting={handleFinish}
    onModalCancel={OnPrimInfoModalCancel}
    jobPostingDetails={jobPostingDetails}
    salaryLabel={"Stipend Fund Range"}
    />}
{
console.log("jobPostingDetails.job_title",jobPostingDetails.job_title)
}
    <Row>
      <Col span={12}>
        <Row>
          <Col flex="auto" style={{ marginLeft: "12px" }}>
          <div>
           <Title style={{display:'inline', fontSize:24}}>{`${jobPostingDetails.job_title} `}</Title>
           <span type="secondary">{`(${jobType})`}</span>
           </div>
          <span>{rolename}</span><br />

            <span style={{fontWeight:'bold',fontSize:18}}>{companyname}</span>
          
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
          <RightOutlined /></Button>
          <Button><ShareAltOutlined />Share</Button>
          <Button><StarOutlined />Shortlist</Button>             
          {/* //<Dropdown onClick={handleButtonClick} overlay={menu}> */}
          <Dropdown overlay={menu}>
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>                
        </Space>
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <Tabs activeKey={TabKey} onChange={onChange}>
          <TabPane tab="Overview" key="1">
            <InternshipLandingPage
               responsibility={jobPostingDetails.responsibilities}
              min_requirement={jobPostingDetails.minimum_requirements}
              Pre_requirement={jobPostingDetails.preferred_requirements}
            />
          </TabPane>
        </Tabs>
      </Col>

      <Col span={8} style={{ marginTop: "21px" }}>
        <Divider style={{ marginBottom: "16px" }} />
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <div>
              <h4>
                  Salary : <b>{salary}</b>
                </h4>
               
                  {jobPostingDetails.application_closes_on !=null?(
                    <>
                     <h4>
                      Application Closes on : <b>{moment(dates).format('DD MMM YYYY')}</b>
                      {
                        console.log('jooob',jobPostingDetails)
                      }
                    </h4>
                  
                  </>): null}
                 
                {jobPostingDetails.total_exp?
                <>
                <h4>
                  Total experience : <b>{jobPostingDetails.total_exp} years</b>
                </h4> 
                <h4>
                  Relevant experience :<b> {jobPostingDetails.relevant_exp} years</b>
                </h4> 
                </> : null}
              </div>
            </Space>
          </Card>

          <Card size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              
                {jobPostingDetails.workLocations !=null ?(
                  <>    
                  <div>             
                   <Title level={5} type='secondary'>Work Locations</Title>
                    {
                    workLocations.map((data) => 
                    <Tag color="default">{data.locName} | {data.locType}</Tag>
                  
                    )}

                    {
                     console.log('wwwooo',jobPostingDetails.workLocations )
                    }
                    </div>
                 </>
                 
                   ):null
                }
              
             
              
            </Space>
          </Card>

     {primarySkills.length > 0 || OtherSkills.length > 0 || NonTechSkills.length > 0   ?  
      <Card size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
             {primarySkills.length > 0? <div>
                <Title level={5} type='secondary'>Primary skills</Title>
                {primarySkills.map((data) => 
                <Tag color="default">{data}</Tag>
                )}
              </div>: null}
              {OtherSkills.length > 0?  <div>
                <Title level={5} type='secondary'>Secondary skills</Title>
                {OtherSkills.map((data) => 
                <Tag color="default">{data}</Tag>
                )}
              </div>: null}
            {NonTechSkills.length > 0?<div>
                <Title level={5} type='secondary'>Non-tech skills</Title>
                {NonTechSkills.map((data) => 
                <Tag color="default">{data}</Tag>
                )}
              </div>:null}  
              
            </Space>
          </Card> 
          : null } 

          { jobPostingDetails.benefits !== undefined && jobPostingDetails.benefits.length > 0 ?
          <Card size="small">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <div>
                <Title level={5} type='secondary'>Benefits</Title>
                  {jobPostingDetails.benefits.map((data,idx) => {
                    return <Tag key={idx}>{data}</Tag>
                  })}
              </div>
              
            </Space>
          </Card> 
          : null}
        </Space>
      </Col>
    </Row>   
    </>

   )
 }

export default InternshipProfileView