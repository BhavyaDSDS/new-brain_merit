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
  Empty,
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
// import { getJobPosting } from "../../employerSlice";
import { getJobPosting,updateJobPosting,setRefreshJobPostingList } from "../../jobSlice";

import JobPostingLandingPage from "./JobPostingLandingPage";
// import {  } from "../../employerSlice";
import CreateJobPosting from "../../../components/form/CreateJobPosting";

const { Text, Title } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const {confirm}=Modal;

function JobPostingProfileView(props) {
  const { recordKey, onShowNextJobs,afterProfileDelete} = props;
  const [experience, setExperience] = useState(true);

  const [editPrimInfo, setEditPrimInfo] = useState(false);



  const jobPostingDetails = useSelector((state) => state.job.jobPostingDetail)


  console.log('qaqaqaqaqa',jobPostingDetails)
  
  
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
console.log('rtrt',recordKey)
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
  const dispatch = useDispatch();
console.log("jobPostingDetails",jobPostingDetails)
  useEffect(() => {
    console.log("use effect - recordkey in EmployerProfile: " + recordKey);
    dispatch(getJobPosting(recordKey));
    setTabKey("1");
  }, [recordKey]);

  const onChange = (key) => {
    setTabKey(key);
    console.log(key);
  };

  const handleButtonClick = (e) => {
    // message.info('Click on left button.');
    // console.log('click left button', e);

  };
  const handleDirButtonClick = (direction) => {
    onShowNextJobs(recordKey, direction);
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
        console.log("deleteConfirm",recordKey)
        dispatch(updateJobPosting(data));
        afterProfileDelete(recordKey);
       // dispatch(deleteEmployer(data));
       console.log("deleteConfirmdeleteConfirmdeleteConfirm")
        dispatch(setRefreshJobPostingList());

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
  console.log("jobsDetails info from jobPostingProfileView =",jobPostingDetails)
    
   let rolesName = roles.find((o) => o.value === jobPostingDetails.role)
   let companyName = empId.find((o) => o.value === jobPostingDetails.employer)

    let primarySkills = [] ;
    if(jobPostingDetails.pri_tech_skills !== undefined){
    primarySkills = jobPostingDetails.pri_tech_skills.map((skillData) => {
        let skills = skillList.find((o) => o.value === skillData)
        return skills.label
    })

  }
    // console.log("skills name =",primarySkills)

    let OtherSkills = [];
    if(jobPostingDetails.sec_tech_skills !== undefined){
      OtherSkills = jobPostingDetails.sec_tech_skills.map((skillData) => {
        let skills = skillList.find((o) => o.value === skillData)
        return skills.label
    })

  }
    // console.log("skills name =",OtherSkills)

    let NonTechSkills = [];
    if(jobPostingDetails.sec_tech_skills !== undefined){
      NonTechSkills = jobPostingDetails.sec_tech_skills.map((skillData) => {
        let skills = skillList.find((o) => o.value === skillData)
        return skills.label
    })

  }
    // console.log("skills name =",NonTechSkills)


    var workLocations = [];
    if(jobPostingDetails.work_locations !== undefined){
        workLocations = jobPostingDetails.work_locations.map((locData) => {
          let location = locationName.find((o) => o.value === locData.location_id)

            return {locName : location.label, locType : locData.type}
        })
    }
      //  console.log("worklocation info = ",workLocations)
  
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
  console.log("zzz",recordKey)

  const handleFinish = React.useCallback((values) => {
    console.log("value **#######*",values)
    if (recordKey) {
      console.log("zzz",recordKey)
      const data = [values, recordKey];
      
      dispatch(updateJobPosting(data));
      dispatch(setRefreshJobPostingList());
    //   dispatch(setRefreshEmployerList());
    //   console.log("setRefreshEmployerList() called");
     }
    setEditPrimInfo(false);
    console.log("jobPostingDetails.responsibilities",jobPostingDetails.responsibilities)

    // console.log("emp primary Edit info = ",values);
    console.log("emp primary Edit JSON info =",JSON.stringify(values));
  }, [recordKey]);

   

  return (
    <>
{/* {editJobPosting&&(
  <CreateJobPosting editableForm={true} onFinishJobPosting={}
)} */}

    {editPrimInfo && 
    <CreateJobPosting 
    experience={experience}
    editableForm={true}  
    jobPostingDetails={jobPostingDetails}
    onFinishJobPosting={handleFinish}
    onModalCancel={OnPrimInfoModalCancel}
    salaryLabel="Salary Range"
    />}


    <Row>
      <Col span={12}>
        <Row>
          <Col flex="auto" style={{ marginLeft: "16px" }}>
            <div display='inline-block'>
              
          <div>
           <Title level={3}>{`${jobPostingDetails.job_title} `} </Title>
           </div>
           <div>
            <span type="secondary">{`(${jobType} )`}</span>
            </div>
            </div>
        
          <span style={{fontWeight:'bold',fontSize:15}}>{rolename}</span><br />

            <span style={{fontWeight:'bold',fontSize:15}}>{companyname}</span>
          
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
          <Dropdown onClick={handleButtonClick} overlay={menu}>
          {/* <Dropdown overlay={menu}> */}
            <Button icon={<MoreOutlined />}></Button>
          </Dropdown>          
        </Space>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={16}>
        <Tabs activeKey={TabKey} onChange={onChange}>
          <TabPane tab="Overview" key="1">
            
             <JobPostingLandingPage  responsibility={jobPostingDetails.responsibilities}
             min_requirement={jobPostingDetails.minimum_requirements}
                Pre_requirement={jobPostingDetails.preferred_requirements}/>

              
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
              <h4 >
                  Salary : <b type='secondary'>{salary}</b>
                </h4>
                <h4>
                  Application Closes on : <b>{jobPostingDetails.application_closes_on}</b>
                </h4>
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
              <div>
                <Title level={5} type='secondary'>Work Locations</Title>
                {
                workLocations.map((data) => 
                <Tag color="default">{data.locName} | {data.locType}</Tag>
                )}
             
              </div>
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
                <Title level={5} type='secondary'>Other skills</Title>
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

export default JobPostingProfileView