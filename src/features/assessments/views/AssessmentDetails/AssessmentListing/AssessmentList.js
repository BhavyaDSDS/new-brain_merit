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
import { getAssessmentList } from "../../../assessmentSlice";
import { getEmployerList } from "../../../../employers/employerSlice";
import { objectLength } from "./../../../../components/utils/JavaScriptUtils";
import { useSelector, useDispatch } from "react-redux";
//import JobPosting from "../AddEmployers/JobPosting";
import { DRAWER_WIDTH } from "../../../../../constants";
import AssessmentInfo from "../AddAssessments/AssessmentInfo";
import AssessmentFilterPage from "../../../AssessmentFilterPage";


const { Search } = Input;

function AssessmentList() {
  const [form] = Form.useForm();
  const [recordKey, setRecordKey] = useState("");
  const [visible, setVisible] = useState(false);
  //const [TabOpenPending, setTabOpenPending] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [buttonName,setbuttonName]=useState("Clear");
  const [isTouched, setIsTouched] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const candidateList = useSelector((state) => state.candidate.fresherCandidateList);

  const employersList = useSelector((state) => state.employer.listEmployers);
  //const domainList = useSelector((state) => state.utils.domainList);
  //const employerData = useSelector((state) => state.employer);
  const assessmentList = useSelector((state) => state.assessment.listassessment);
  const skillList = useSelector((state) => state.utils.skillsList); 
  const rolesList = useSelector((state) => state.utils.roleList);
  const interviewerList = useSelector((state) => state.interviewer.interviewerList);
  const jobdiscriptionList = useSelector((state) => state.job.listJobPosting);
  // const tableCount = employersList.length;
  const pageSize = 5;


  var employers;
  if (JSON.stringify(employersList) !== "{}") {
    employers = employersList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var candidates;
  if (JSON.stringify(candidateList) !== "{}") {
    candidates = candidateList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  // console.log("*****",assessmentList)
  //  console.log("assessmentList ",assessmentList )
  //  console.log("skillList    ********################**********",assessmentList.skillList);
  var interviewers;
  if (JSON.stringify(interviewerList) !== "{}") {
    interviewers = interviewerList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var skillsName;
  if (JSON.stringify(skillList) !== "{}") {
    skillsName = skillList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  // console.log("SkillsName",  skillsName);

  var roleName;
  if (JSON.stringify(rolesList) !== "{}") {
    roleName = rolesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  // var jobDiscription;
  // if (JSON.stringify(jobdiscriptionList) !== "{}") {
  //   jobDiscription = jobdiscriptionList.map(function (obj) {
  //     return { label: obj.name, value: obj.id };
  //   });
  // }

  // console.log("RoleName", roleName);

  const dispatch = useDispatch();
  const history = useHistory();
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    dispatch(getAssessmentList());
  }, []);

  const showDrawer = () => {
    setVisible(true);
    // console.log("recordKey: visible " + recordKey + " " + visible);
  };

  const onShowNewRecord = (key) => {
    setRecordKey(key);
    // console.log("Record:" + key);
    //showDrawer();
  };

  const onclick = (key) => {
    setRecordKey(key);
    // console.log("Record:" + key);
    showDrawer();
  };

  const onClose = () => {
    setVisible(false);
  };

  let candidateName;
  let interviewerName;
  let employerName;
  let role;
  let skills;
  let jobDiscript;
  // console.log("Candidate name",candidateList);
  // console.log("Interviewer name",interviewerList);
  // console.log("Employer name",employersList);
  //console.log("Role name",rolesList);
  //console.log("Skill name",skillsList);

  //console.log("interviewer",interviewerName)
  //console.log(" list =", candidateList);
  const columns = [

    {
      title: "Candidate",
      dataIndex: "candidate",
      render: (_, record) =>
        record.candidate &&
        (candidateName = candidateList.find((o) => o.id == record.candidate)) && (
          // console.log("render in list ", candidateName),
          <p color="default">
            {candidateName != undefined && candidateName.first_name + " " + candidateName.last_name}
          </p>
        ),
    },
    {
      title: "Employer",
      dataIndex: "employer",
      render: (_, record) =>
        record.employer &&
        (employerName = employersList.find((o) => o.id == record.employer)) && (
          // console.log("render in list ", employerName),
          <p color="default">
            {employerName != undefined && employerName.name}
          </p>
        ),
    },
    {
      title: "Interviewer",
      dataIndex: "interviewer",
      render: (_, record) =>
        record.interviewer &&
        (interviewerName = interviewerList.find((o) => o.id == record.interviewer)) && (
          // console.log("render in list ",  interviewerName),
          <p color="default">
            {interviewerName != undefined && interviewerName.name}
          </p>
        ),
       },
    //console.log("Candidate name",candidateList);
    // {
    //   title: "Role To Be Assessed",
    //   dataIndex: "role_to_be_assessed",
    //   render: (_, record) =>
    //     record.role_to_be_assessed &&
    //     (role = roleName.find((o) => o.value == record.role_to_be_assessed)) && (
    //       //console.log("render in list ",   role),
    //       <p color="default">
    //         {role != undefined && role.label}
    //       </p>
    //     ),
    // },
    // {
    //   title: "Skills To Be Assessed",
    //   dataIndex: "skills_to_be_assessed",
    //   render: (_, record) =>
    //     record.skills_to_be_assessed.length > 0 &&
    //     ((skills = []),
    //       record.skills_to_be_assessed.map((info, idx) => {
    //         let skillsAssess = skillsName.find((o) => o.value == info);
    //         if (skillsAssess != undefined) {
    //           skills.push(skillsAssess.label);
    //         }
    //       })) &&
    //     skills.length > 0 &&
    //     skills.map((data) => {
    //       return <p color="blue">{data}</p>;
    //     }),
    // },
    {
      title: "Assessment Type",
      dataIndex: "assessment_type",
    },
    {
      title: "Meeting Link",
      dataIndex: "meeting_link",
      render:(_,record)=>
      <a href="">Link </a>      
    },
    {
      title: "Start Time",
      dataIndex: "schedule_start",
      render:(_,record)=>   
      record.schedule_start.substring(0,16).replace("T"," ") 
    },

    {
      title: "End Time",
      dataIndex: "schedule_end",

   render:(_,record)=>
    record.schedule_end.substring(0,16).replace("T"," ") 
    },

  ];

  function resetFormFields() {
    form.resetFields();
  }

  const handleFinish = useCallback((values) => {
   console.log("assessmentlist filter submit: ", values);
    hideModal();
    resetFormFields();
  });

  return (
    <>
      <Card>
        <Drawer
          width={DRAWER_WIDTH}
          closable={false}
          onClose={onClose}
          visible={visible}
          drawerStyle={{ background: "#F6F8FC" }}
        >
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
           </Col>
           <Col  xxl={8} xl={7} lg={10}>
              <Button
                type="primary"
                onClick={() => {
                  showModal();
                  resetFormFields();
                }}
              >
                Filters
              </Button>
           
          </Col>
          <Col xxl={10} xl={10} lg={10}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
            >
              <Button
                type="primary"
                onClick={() => history.push("/videoAppRoot")}
              >
                Video call
              </Button>
              <Button
                type="primary"
                onClick={() => history.push("/AddAssessments")}
              >
                Add assessments
              </Button>
            </Space>
          </Col>
        </Row>

        <Table bordered 
        columns={columns} 
        // dataSource={assessmentList} 
        size="small" scroll={{
          y: 600,
        }} />
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
            <Button   style={{ float: "left" }} onClick={()=>{ hideModal();}}>Cancel</Button>,
            <Button onclick={()=>{ form.setFieldsValue(filterIntial);}}>{buttonName}</Button>,
            // <Button 
            // onClick={()=>newCustomFilter()}
            // disabled={!customFilter || !isTouched}
            // >
            //   Save & Apply </Button>,
            <Button type="primary"
            onClick={() => form.submit()} disabled={!isTouched}>
              Apply</Button>,
          ]}
        >
          <Form form={form} onFinish={handleFinish}  onFieldsChange={() => {
            // add your additionaly logic here
            setIsTouched(true);
          }}
          layout="vertical">
            <AssessmentFilterPage/>
          </Form>
        </Modal>
      </Card>
    </>
  );
}
export default AssessmentList;


























