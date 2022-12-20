import React, { useEffect, useCallback, useState } from "react";
import {
  Card,
  Space,
  Table,
  Button,
  Drawer,
  Input,
  Modal,
  Form,
  Tag,
  Row,
  Col,
  AutoComplete,
} from "antd";
import { useHistory } from "react-router-dom";
// import { getJobPostingList } from "../../../employerSlice";
// import { getJobPostingList } from "../../../employerSlice";
import { getJobPostingList,resetRefreshJobPostingList,resetJobPostingDetails, getJobPostingFilterList } from "../../../jobSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import JobPosting from "../AddJobs/JobPosting";
import { useSelector, useDispatch } from "react-redux";
// import JobPostingProfileView from "../../../../employers/views/EmployerDetails/JobPostingProfileView/JobPostingProfileView";
import Slider from "react-slick";

import JobPostingProfileView from "../../JobPostingProfileView/JobPostingProfileView";
import JobPostingFilter from "./JobPostingFilter";
import { CheckOutlined } from "@ant-design/icons";
import { YEARS } from "../../../../../constants";
import { LAKH } from "../../../../../constants";
import { refresh } from "less";
const {CheckableTag}=Tag;

const { Search } = Input;
// const filterIntial ={
//   total_exp: [0, 0],
//   relevant_exp:[0,0],
//   salary_range:[0, 0],
//   company_name:[],
//   primary_tech_skill:[],
//   job_type:[],
//   work_type:[],
//   job_locations:[],
//   role:[]
  
// }
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#3C4048" }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#3C4048" }}
      onClick={onClick}
    />
  );
}

function JobPostingList() {
  const [form] = Form.useForm();
  const [recordKey, setRecordKey] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  const [visible, setVisible] = useState(false);
  const [TabOpenPending, setTabOpenPending] = useState(0);
  const [buttonName,setbuttonName]=useState("Clear");
  const [newFilter, setNewFilter] = useState(false);
  const [isTouched, setIsTouched] = useState();
  const [customFilter, setCustomFilter] = useState(false);
  const [quickFilterStatus, setquickFilterStatus] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [previousSearch, setPreviousSearch] = useState("is_deleted=false&fresher=true");


  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  //const jobPostingState=useSelector((state))=>state.job);
  const jobPostingState = useSelector((state) => state.job)

  const jobPostingListData = useSelector(
    (state) => state.job.jobPostingFilterList
  );
  console.log('jjjooo',jobPostingListData)
  const locationsList = useSelector((state) => state.utils.locationsList);
  const employerId = useSelector((state) => state.employer.listEmployers);
  const roleList = useSelector((state) => state.utils.roleList);
  const skillsList = useSelector((state) => state.utils.skillsList);
    const jobPostingDetails = useSelector((state) => state.job.jobPostingDetail);

console.log("JobPostingFilterList",jobPostingListData)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobPostingList());
  }, []);

  // console.log("List from JobPostingList =",jobPostingListData);
  // console.log("jobpostingdetails",jobPostingDetails)
 // console.log("List from locationsList =",locationsList);
  
  var citys;
  if (JSON.stringify(locationsList) !== "{}") {
    citys = locationsList.map(function (obj) {
      return {
        label: obj.city,
        value: obj.id,
        state: obj.state,
        country: obj.country,
      };
    });
  }
  // console.log("List from locationsList =",citys);
  var empId;
  if (JSON.stringify(employerId) !== "{}") {
    empId = employerId.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var roles;
  if (JSON.stringify(roleList) !== "{}") {
    roles = roleList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var skillList;
  if (JSON.stringify(skillsList) !== "{}") {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var companyWork;
  if (JSON.stringify(skillList) !== "{}") {
    companyWork = skillList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  

  console.log("Job posting list =", jobPostingListData);
  const history = useHistory();
  const onSearch = (value) => console.log(value);

  const showDrawer = () => {
    setVisible(true);
    console.log("recordKey: visible " + recordKey + " " + visible);
  };



  const onclick = (key) => {
    setRecordKey(key);
    console.log("Record:" + key);
    showDrawer();
  };

  const onClose = () => {
    setVisible(false);
  };
let pSkillsName;
let empName=undefined;
let roleName;
let salary;
let workLocation;
  
  const columns = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onclick(record.id)}>{record.job_title}</a>
        </Space>
      ),
    },
    {
      title: "Employer Name",
      dataIndex: "employer",
      render: (_, record) =>
      record.employer != null &&
      (empName = empId.find(
        (o) => o.value === record.employer
      )) && <p>{empName != undefined && empName.label}</p>,

    },
    {
      title: "Total experience",
      dataIndex: "total_exp",
      render: (_,record) => 
      record.total_exp > 0?
      record.total_exp+" "+YEARS:" " 
    },
    {
      title: "Role",
      dataIndex: "role",
      //render: (text) => (<Tag>{text}</Tag>)
      render: (_, record) =>
      record.role &&
      (roleName= roles.find(
        (o) => o.value == record.role
      )) && (
        <Tag color="default">
          {roleName != undefined && roleName.label}
        </Tag>
      ),
    },
    {
      title: "Relevant Experience",
      dataIndex: "relevant_exp",
      render: (_, record) =>
        record.relevant_exp > 0 &&
        record.relevant_exp + " " + YEARS,
    },
    {
      title: "Primary Technical Skills",
      dataIndex: "pri_tech_skills",
      // render: (_,record) => (
      //   record.pri_tech_skills.map((text) => { return (<Tag color="default">{text}</Tag>)})
      // ),
      render: (_, record) =>
      record.pri_tech_skills.length > 0 &&
      ((pSkillsName = []),
      record.pri_tech_skills.map((info, idx) => {
        let pSkills = skillList.find((o) => o.value == info);
        if (pSkills != undefined) {
          pSkillsName.push(pSkills.label);
        }
      })) &&
      pSkillsName.length > 0 &&
      pSkillsName.map((data) => {
        return <Tag color="blue">{data}</Tag>;
      }),
    },
    // {
    //   title: "Total Experience",
    //   dataIndex: "total_exp",
    // },
    // {
    //   title: "Relevant Experience",
    //   dataIndex: "relevant_exp",
    // },
   
  
    {
      title: "Salary Range",
      dataIndex: "salary_range",
      render: (_, record) =>
    // salary= record.salary_range > 0 && record.salary_range / LAKH + " " + LPA,
      record.salary_range_min/LAKH+"-"+record.salary_range_max/LAKH + " " + "LPA",
    },
    // render: (_, record) =>
    //     record.candidate &&
    //     (candidateName = candidateList.find((o) => o.id == record.candidate)) && (
    //       // console.log("render in list ", candidateName),
    //       <p color="default">
    //         {candidateName != undefined && candidateName.first_name + " " + candidateName.last_name}
    //       </p>
    //     ),
    {
      title: "Work Locations",
       dataIndex: "work_locations",
       render: (_, record) =>

      
      //  record.work_locations &&
      //  (workLocation = citys.find((o) => o.value == record.work_locations)) && (
      //    //console.log("render in list ",   role),
      //    <p color="default">
      //      {workLocation != undefined && workLocation.label}
      //    </p>
      //  ),






      // console.log("work_locations ********###################********",record.work_locations),

        record.work_locations.length > 0 &&
      ((workLocation = []),
       record.work_locations.map((info, idx) => {
        console.log("DATA *******################*********",info)
        //  console.log("DATA  o.value *******################*********",citys)
           let workLocat =citys.find((o) => o.value == info.location_id);
         // console.log("DATA  o.value *******################*********",citys)
            // console.log("DATA *******################*********",workLocat)

           if ( workLocat != undefined)
            {
            workLocation.push( workLocat.label);
           // console.log("DATA 123 *******################*********",workLocation)
           }
         })) &&
         workLocation.length > 0 &&
         workLocation.map((data) => {
         return <Tag>{data}</Tag>;
        // console.log("DATA *******################*********",{data})
       }),
     },

    //  render: (_,record) => (
      // console.log("Location name =",record.work_locations),
      // record.work_locations.map((text) => { return (<Tag color="default">{text}</Tag>)})
      
   // ),
 

    // render: (_, record) =>
    // record.role_to_be_assessed &&
    // (role = roleName.find((o) => o.value == record.role_to_be_assessed)) && (
    //   //console.log("render in list ",   role),
    //   <p color="default">
    //     {role != undefined && role.label}
    //   </p>
    // ),
    // {
    //   title: "Job Type",
    //   dataIndex: "job_type",
    //   render: (text) => (<Tag>{text}</Tag>)
    // },
    {
      title: "Active",
      dataIndex: "active",
      render: (record) =>
      record === true ? (
          <Tag color="#87d068">{<CheckOutlined />}</Tag>
        ) : (
          <Tag color="default">No</Tag>
        ),
    },
  ];

  function resetFormFields() {
    form.resetFields();
  }

 
  function newCustomFilter(){
    console.log("save and apply clicked!!");
    setNewFilter(true);
    form.submit();
  
  }
  const onShowNewRecord = (key) => {
    setRecordKey(key);
    console.log("Record:" + key);
   
  };
  

  const onPageChangeReq = (type) => {
    let total_pages = Math.ceil(tableCount / pageSize);
    console.log(
      "Page: **********" +
        currPage +
        "Type***********" +
        type +
        "No Of Pages" +
        total_pages
    );

    if (type === "previous") {
      if (currPage - 1 > 0) {
        var new_page = currPage - 1;
        setCurrPage(new_page);
        //      var data = "is_deleted=false&fresher=true&page=" + new_page;
        var data = previousSearch;
        console.log("previousSearch.." + previousSearch);
        if (data.includes("page=")) {
          console.log(data.lastIndexOf("page="));
          data = data.substring(0, data.lastIndexOf("page=") + 5) + new_page;
        } else {
          data = data + "&page=" + new_page;
        }
        console.log(data);
        setPreviousSearch(data);
        dispatch(getJobPostingList(data));
        setTabOpenPending(1);
        // console.log("Tab open pending setting left***", TabOpenPending)
      }
    } else if (currPage + 1 <= total_pages) {
      var new_page = currPage + 1;
      setCurrPage(new_page);
      //      var data = "is_deleted=false&fresher=true&page=" + new_page;
      var data = previousSearch;
      console.log("previousSearch.." + previousSearch);
      if (data.includes("page=")) {
        console.log(data.lastIndexOf("page="));
        data = data.substring(0, data.lastIndexOf("page=") + 5) + new_page;
      } else {
        data = data + "&page=" + new_page;
      }
      console.log(data);
      setPreviousSearch(data);
      dispatch(getInterviewerList(data));
      setTabOpenPending(2);
      // console.log("Tab open pending setting right***", TabOpenPending)
    }
  };
   const onShowNextJobs =(id,direction)=>{
    jobPostingListData.map((interviewer, index)=>{
      if(interviewer.id === id){
        var newElement;
        if(direction ==='Left'){
          newElement = jobPostingListData[index -1];
          if(newElement === undefined){
            onPageChangeReq('previous')
          }
         } else if (direction ==='Right'){
            var newElement = jobPostingListData[index +1];
            if(newElement === undefined){
              onPageChangeReq('next')
            }
          }
          console.log('newwwww',newElement,index)
          if(newElement !=undefined){
            onShowNewRecord(newElement.id)
          }
      }
    })
  }

  const afterProfileDelete =(id) =>{
    jobPostingListData.map((inter, index)=>{
      var newEle
      if(inter.id === id){
        if(jobPostingListData.length-1> index){
          newEle=jobPostingListData[index+1];
          if(newEle === undefined){
            onPageChangeReq('next')
          }
        }else {
          newEle = jobPostingListData[index-1]
          if(newEle === undefined){
            onPageChangeReq('previous')
          }
        }
        if(newEle !== undefined){
          onShowNewRecord(newEle.id)
        }
      }
    })
  }
  const handleFinish = useCallback((values) => {

    
   console.log("jobPostingList filter submit: ", values);
    let data = "is_deleted=false";
   
    if (values.company_name != undefined) {
      data = data + "&employer__in=" + values.company_name[0];
      if (values.company_name.length > 1) {
        values.company_name.map((item) => (data = data + "__" + item));
      }

    }
    if (values.primary_tech_skill != undefined) {
      data = data + "&pri_tech_skills__in=" + values.primary_tech_skill[0];
      if (values.primary_tech_skill.length > 1) {
        values.primary_tech_skill.map((item) => (data = data + "__" + item));
        console.log("primary_tech_skill",data)
      }

    }
    if (values.job_type != undefined) {
      data = data + "&job_type__in=" + values.job_type[0];
      if (values.job_type.length > 1) {
        values.job_type.map((item) => (data = data + "__" + item));
      }
    }
    if (values.total_exp != undefined) {
      if (values.total_exp[0] > 0 || values.total_exp[1] > 0) {
        data = data + "&total_exp__range=" + values.total_exp[0] + "__" + values.total_exp[1];
      }

    }
      if (values.relevant_exp != undefined) {
        if (values.relevant_exp[0] > 0 || values.relevant_exp[1] > 0) {
          data = data + "&relevant_exp__range=" + values.relevant_exp[0] + "__" + values.relevant_exp[1];
        }
  
      }
      if (values.work_type != undefined) {
        data = data + "&type__in=" + values.work_type[0];
        if (values.work_type.length > 1) {
          values.work_type.map((item) => (data = data + "__" + item));
        }
      }
      // if (values.salary_range != undefined) {
      //   console.log("salary range",values.salary_range[0],values.salary_range[1])
      //   if (values.salary_range[0] > 0 || values.salary_range[1] > 0) {
      //     data = data + "&salary_range__range=" +values.salary_range[0] * 100000 + "__" + values.salary_range[1] * 100000;
      //   }
  
      //  }
      if (values.salary_range != undefined) {
        console.log("salary range",values.salary_range[0],values.salary_range[1])
        if (values.salary_range[0] > 0 ) {
          data = data + "&salary_range_min=" +values.salary_range[0] * 100000;
        }
  
       }
       if (values.salary_range != undefined) {
        console.log("salary range",values.salary_range[0],values.salary_range[1])
        if (values.salary_range[0] > 0 || values.salary_range[1] > 0) {
          data = data + "&salary_range_max=" + values.salary_range[1] * 100000;
        }
  
       }
       if (values.role != undefined) {
        data = data + "&role__in=" + values.role[0];
        if (values.role.length > 1) {
          values.role.map((item) => (data = data + "__" + item));
        }
  
      }
      if (values.job_locations != undefined) {
        //console.log("job_locations",values.job_locations)
        data = data + "&location_id__in=" + values.job_locations[0];

        if (values.job_locations.length > 1) {
          values.job_locations.map((item) => (data = data + "__" + item)     
          );
          console.log("job_locations",data)
        }
        }
    //    values.salary_range_min = values.salary_range[0] * 100000;
    //  values.salary_range_max = values.salary_range[1] * 100000;
      dispatch(getJobPostingFilterList(data));
     // console.log("jobPostingList filter submit: ", data);


    setFilterActive(true);
    hideModal();
    resetFormFields();
    console.log("JobPosting Filter submit:",data)
  });

  function refreshJobpostingList() {
    dispatch(getJobPostingFilterList(previousSearch));
    console.log("Refreshing fresher list ****************************");
  }
  if (
    jobPostingState.updateJobPostingLoading === "complete_success" ||
    jobPostingState.updateJobPostingLoading === "complete_failure"
  ) {
    console.log(
      "Refresh jobPostingr list***************",
      jobPostingState.refreshJobPostingList
    );

    if (jobPostingState.refreshJobPostingList == true) {
      //   dispatch(getEmployerFilterList(previousSearch));
     // dispatch(getJobPostingList());
      // console.log(
      //   "Refreshing jobPosting list calling dispatch***************",
      //   jobPostingState.refreshJobPostingList
      // );
      refreshJobpostingList();
    }
      dispatch(resetRefreshJobPostingList());

      console.log("resetRefreshJobPostingList() called");
    }
  
  const settings = {
    // centerMode:true,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
   nextArrow: <SampleNextArrow />,
   prevArrow: <SamplePrevArrow />,
    // infinite:false,
    variableWidth: true,
  };

  return (
    <>
      <Card>
        <Drawer
          width={1000}
          closable={false}
          onClose={onClose}
          visible={visible}
          drawerStyle={{ background: "#F6F8FC" }}
        >
          <JobPostingProfileView recordKey={recordKey} 
             onShowNextJobs={onShowNextJobs}
            afterProfileDelete={afterProfileDelete}
             />
        </Drawer>

        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
          <Col xxl={5} xl={4} lg={4}>
            <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
                  width: "100%",
                }}>
                  <Input.Search
                  size="large"
                  placeholder="Search"
                  enterButton
                />
            </AutoComplete>

            {/* {/* <Space direction="horizontal">
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              /> </Space> */}
              </Col> 
               <Col xxl={7} xl={9} lg={6}>
            <div
              style={{
                width: "83%",
                display:'inline-block',
                position:'absolute',
                left:"21px",
                marginLeft:"11px",
                paddingTop:"7px",
                marginRight:"10px"
              }}
            >
              <Slider {...settings}>
                <CheckableTag
                checked={quickFilterStatus === 1 ? true : false}
                onChange={() => {                   
                   setquickFilterStatus(quickFilterStatus === 1 ? 0 : 1);
                }}

                >Frontend Developer</CheckableTag>
               <CheckableTag
                  checked={quickFilterStatus === 2 ? true : false}
                  onChange={() => {  
                    setquickFilterStatus(quickFilterStatus === 2 ? 0 : 2);
                  }}
   
               >Backend Developer</CheckableTag>
               <CheckableTag
                checked={quickFilterStatus === 3 ? true : false}
                onChange={() => {                   
                  setquickFilterStatus(quickFilterStatus === 3 ? 0 : 3);
                }}
                                >React</CheckableTag>
               <CheckableTag
                checked={quickFilterStatus === 4 ? true : false}
                onChange={() => {                   
                  setquickFilterStatus(quickFilterStatus === 4 ? 0 : 4);
                }}
               >Java</CheckableTag>
               <CheckableTag
               checked={quickFilterStatus === 5? true : false}
               onChange={() => {                   
                setquickFilterStatus(quickFilterStatus === 5 ? 0 : 5);
                }}
               >DevOps</CheckableTag>
               <CheckableTag
              checked={quickFilterStatus === 6 ? true : false}
              onChange={() => {                   
                 setquickFilterStatus(quickFilterStatus === 6 ? 0 : 6);
              }}

               >2-4{YEARS}</CheckableTag>
               <CheckableTag
                checked={quickFilterStatus === 7 ? true : false}
                onChange={() => {                   
                   setquickFilterStatus(quickFilterStatus === 7 ? 0 : 7);
                }}
               >4-6{YEARS}</CheckableTag>

               {/* <CheckableTag>First</CheckableTag>
               <CheckableTag>First</CheckableTag> */}
               </Slider>
               </div>
               </Col>
               <Col  xxl={8} xl={7} lg={10}>
              <Button
                type="primary"
                onClick={() => {
                  showModal();
                }}
              >
                Filters
              </Button>
              {filterActive &&(
              <Button
              size="small"
              type="text"
              onClick={() => {
                setFilterActive(false);
                var data = "is_deleted=false";
                dispatch(getJobPostingFilterList(data));
                setIsTouched(false);
                setbuttonName("Clear");
              }}>
                Reset

              </Button>
               )} 
              </Col>
            {/* </Space>
          </Col> */}
          <Col xxl={4} xl={4} lg={4}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
            >
              <Button
                type="primary"
                style={{
                  marginBottom: 16,
                  float: "right",
                }}
                onClick={() => {
                  dispatch(resetJobPostingDetails()),
              history.push("/jobPosting");
            }}
              >
                Add Job
              </Button>
            </Space>
          </Col>
        </Row>

  

        <Table bordered columns={columns} dataSource={jobPostingListData} />
        <Modal
          style={{ top: 0 }}
          title="Filters"
          destroyOnClose={true}
          visible={modalVisible}
          onOk={() => form.submit()}
          onCancel={() => {
            hideModal();
            resetFormFields();
          }}
          footer={[
            <Button style={{ float: "left" }}
            onClick={()=>{
              hideModal();
            }} >Cancel</Button>,
            <Button
            // onClick={()=>{form.setFieldsValue(filterIntial);}}
             >{buttonName}</Button>,
            <Button  onClick={()=>newCustomFilter()}
            disabled={!customFilter || !isTouched }
            >Save & Apply </Button>,
            <Button type="primary"
            onClick={() => form.submit()} disabled={!isTouched}
            >Apply</Button>,
          ]}
        >
           <div
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          >
          <Form
            form={form}
            onFinish={handleFinish}
           // initialValues={filterIntial}
            layout="vertical"
           
            initialValues={{total_exp: [0, 0],
                relevant_exp:[0,0],
                salary_range:[0, 0],}
              //filterIntial

            }
            onFieldsChange={() => {
              // add your additionaly logic here
              setIsTouched(true);
            }}
          >
            <JobPostingFilter 
             setCustomFilter={setCustomFilter}
            />
          </Form>
          </div>
        </Modal>
      </Card>
    </>
  );
}

export default JobPostingList;
