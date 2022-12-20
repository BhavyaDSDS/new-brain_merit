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
} from "antd";
import { useHistory } from "react-router-dom";
import { getInternShipList,resetInternshipDetails,resetRefreshInternshipList,getInternshipFilterList } from "../../../internshipSlice";
// import InternshipListFilter from "../../../../Internship listing/InternshipListFilter";
import InternshipListFilter from "./InternshipListFilter";

import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import { useSelector, useDispatch } from "react-redux";
import InternshipProfileView from "../../InternshipProfileView/InternshipProfileView";
import { CheckOutlined } from "@ant-design/icons";
const { Search } = Input;
const filterIntial ={
  
  // stipend_fund:[0, 0],
  // company_name:[],
  // primary_tech_skill:[],
  // job_type:[],
  // work_type:[],
  // job_locations:[],
  // role:[]
  
}

function InternshipList() {
  const [form] = Form.useForm();
  const [filterActive, setFilterActive] = useState(false);

  const [recordKey, setRecordKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [newFilter, setNewFilter] = useState(false);
  const [customFilter, setCustomFilter] = useState(false);
  const [isTouched, setIsTouched] = useState();
  const [filterValue, setFilterValue] = useState(filterIntial);
  const [previousSearch, setPreviousSearch] = useState("is_deleted=false");

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [buttonName,setbuttonName]=useState("Clear");

  const stateInternShip = useSelector((state) => state.internship);

  const listInternShip = useSelector((state) => state.internship.internshipFilterList);
  const employerId = useSelector((state) => state.employer.listEmployers);
  const roleList = useSelector((state) => state.utils.roleList);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const skillsList = useSelector((state) => state.utils.skillsList);

console.log("Internship List",listInternShip)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInternShipList());
  }, []);

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

  var skillList;
  if (JSON.stringify(skillsList) !== "{}") {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  console.log("InternshipList data =", listInternShip);

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

  const onShowNewRecord = (key) => {
    setRecordKey(key);
    console.log("Record:" + key);
    //showDrawer();
  };

  const onClose = () => {
    setVisible(false);
  };
  
  let internshipDisplayList = _.cloneDeep(listInternShip);
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
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => (<Tag>{text}</Tag>)
    },
    {
      title: "Primary Technical Skills",
      dataIndex: "pri_tech_skills",
      render: (_,record) => (
        record.pri_tech_skills.map((text) => { return (<Tag color="default">{text}</Tag>)})
      ),
    },
    {
      title: "Stipend Fund",
      dataIndex: "salary_range",
    },
    {
      title: "Work Locations",
      dataIndex: "work_locations",
      render: (_,record) => (
        record.locArray.map((text) => { return (<Tag color="default">{text}</Tag>)})
      ),
      
    },
    {
      title: "Active",
      dataIndex: "active",
      render: (text) =>
        text == "true" ? (
          <Tag color="#87d068">{<CheckOutlined />}</Tag>
        ) : (
          <Tag color="default">No</Tag>
        ),
    },
  ];

  function resetFormFields() {
    form.resetFields();
  }

  const handleFinish = useCallback((values) => {

    console.log("values Intternships",values)
    let data = "is_deleted=false";

    if (values.company_name != undefined) {
      data = data + "&employer__in=" + values.company_name[0];
      if (values.company_name.length > 1) {
        values.company_name.map((item) => (data = data + "__" + item));
      }
     }
     if (values.job_locations != undefined) {
      data = data + "&location_id__in=" + values.job_locations[0];
      if (values.job_locations.length > 1) {
        values.job_locations.map((item) => (data = data + "__" + item));
      }
    }
    if (values.primary_tech_skill != undefined) {
      data = data + "&pri_tech_skills__in=" + values.primary_tech_skill[0];
      if (values.primary_tech_skill.length > 1) {
        values.primary_tech_skill.map((item) => (data = data + "__" + item));
      }
     }
     if (values.role != undefined) {
      data = data + "&role__in=" + values.role[0];
      if (values.role.length > 1) {
        values.role.map((item) => (data = data + "__" + item));
      }

    }
    if (values.stipend_fund != undefined) {
     // console.log("salary range",values.salary_range[0],values.salary_range[1])
      if (values.stipend_fund[0] > 0) {
        data = data + "&salary_range_min=" +values.stipend_fund[0] * 100000;
      }

     }
     if (values.stipend_fund != undefined) {
      //console.log("salary range",values.salary_range[0],values.salary_range[1])
      if (values.stipend_fund[0] > 0 || values.stipend_fund[1] > 0) {
        data = data + "&salary_range_max=" + values.stipend_fund[1] * 100000;
      }

     }
    // if (values.stipend_fund != undefined) {
    //   if (values.stipend_fund[0] > 0 || values.stipend_fund[1] > 0) {
    //     data = data + "&salary_range__range=" +values.stipend_fund[0] + "__" + values.stipend_fund[1];
    //   }

    //  }
    if (values.work_type != undefined) {
      data = data + "&type__in=" + values.work_type[0];
      if (values.work_type.length > 1) {
        values.work_type.map((item) => (data = data + "__" + item));
      }

    }


    // values.salary_range_min = values.salary_range[0] * 100000;
    //  values.salary_range_max = values.salary_range[1] * 100000;
    console.log("InternShipList filter submit: ",data);
    dispatch(getInternshipFilterList(data));
    setFilterActive(true);

    hideModal();
    resetFormFields();
  });
function newCustomFilter(){
  console.log("save and apply clicked!!");
  setNewFilter(true);
  form.submit();
}
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
      dispatch(getInterviewerList(data));
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
const onShowNextInternship =(id,direction)=>{
  listInternShip.map((interviewer, index)=>{
    if(interviewer.id === id){
      var newElement;
      if(direction ==='Left'){
        newElement = listInternShip[index -1];
        if(newElement === undefined){
          onPageChangeReq('previous')
        }
       } else if (direction ==='Right'){
          var newElement = listInternShip[index +1];
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
  listInternShip.map((inter, index)=>{
    var newEle
    if(inter.id === id){
      if(listInternShip.length-1> index){
        newEle=listInternShip[index+1];
        if(newEle === undefined){
          onPageChangeReq('next')
        }
      }else {
        newEle = listInternShip[index-1]
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


  console.log(
    "Refresh internship list  updateInternshipLoading***************",
    stateInternShip.updateInternshipLoading
  );
  function refreshInternshipList() {
    dispatch(getInternshipFilterList(previousSearch));
    console.log("Refreshing fresher list ****************************");
  }

  if (
    stateInternShip.updateInternshipLoading === "complete_success" ||
    stateInternShip.updateInternshipLoading === "complete_failure"
  ) {
    console.log(
      "Refresh employer list***************",
      stateInternShip.refreshInternshipList
    );
    if (stateInternShip.refreshInternshipList == true) {

     // dispatch(getInternShipList());
     refreshInternshipList();
    }
      // console.log(
      //   "Refreshing employer list calling dispatch***************",
      //   stateInternShip.refreshInternshipList
      // );
      dispatch(resetRefreshInternshipList());

      console.log("resetRefreshInternshipList() called");
    }
  
   

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
          <InternshipProfileView recordKey={recordKey} 
          onShowNextInternship={onShowNextInternship}
          afterProfileDelete={afterProfileDelete}
          />
        </Drawer>
        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
          <Col span={12}>
            <Space direction="horizontal">
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
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
                dispatch(getInternshipFilterList(data));
                setIsTouched(false);
                setbuttonName("Clear");
              }}>
                Reset

              </Button>
               )} 
            </Space>
          </Col>
          <Col span={12}>
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
                  dispatch(resetInternshipDetails()),
                  history.push("/internship");
                }}
              >
                Add JobPosting
              </Button>
            </Space>
          </Col>
        </Row> 

        {objectLength(internshipDisplayList) > 0 &&
          internshipDisplayList.map((intern, index) => {
            let companyName = empId.find((o) => o.value === intern.employer)
            let role = roles.find((o) => o.value === intern.role)

            intern.salary_range_min = intern.salary_range_min / 100000 
            intern.salary_range_max = intern.salary_range_max / 100000 
            
            let Stipend = `${intern.salary_range_min} - ${intern.salary_range_max} KPM`;

            //converting boolean values into string
            intern.active = intern.active.toString()

        let first_flag = true;
        objectLength(intern.pri_tech_skills) > 0 &&
        intern.pri_tech_skills.map((skill,index) => {
          let skillName = skillList.find((o)=> o.value ==skill);

          if(skillName !== undefined){
            if(first_flag === true){
              intern.pri_tech_skills = [];
              first_flag = false;
            }
            intern.pri_tech_skills.push(skillName.label);
            // intern.pri_tech_skills.push(" ");
          }
        })
        // console.log("result array = ",intern.work_locations)
         intern.locArray = [];
        let second_flag = true;
              objectLength(intern.work_locations) > 0 && 
              intern.work_locations.map((loc,index) => {
                
                 let locName = citys.find((o) => o.value == loc.location_id);

                if(locName !== undefined){
                  if(second_flag === true) {
                    // intern.work_locations =[];
                    second_flag = false;
                  }
                  intern.locArray.push(locName.label);
                  
                }
                
              })

              console.log("result = ",intern.locArray)
              if(companyName !== undefined){
                intern.employer = companyName.label;
              }

              if(role !== undefined) {
                intern.role = role.label;
              }

              if (Stipend !== undefined){
                intern.salary_range = Stipend;
              }
              
          })}
      
      {console.log("InternshipList after data =", internshipDisplayList)}

      <Table bordered columns={columns} dataSource={internshipDisplayList}/>
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
            <Button   style={{ float: "left" }}
            onClick={()=>{ hideModal();}}
            >
              Cancel</Button>,
             <Button onClick={()=>{ form.setFieldsValue(filterIntial);}}>{buttonName}</Button>,
            // <Button  onClick={()=>newCustomFilter()}
            // disabled={!customFilter || !isTouched}
            // >Save & Apply </Button>,
            <Button type="primary"
            onClick={() => form.submit()} disabled={!isTouched}
            >Apply</Button>,
          ]}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            initialValues=
            //{filterIntial}
            {{stipend_fund:[0, 0],}}
           onFieldsChange={() => {
            // add your additionaly logic here
            setIsTouched(true);
          }}
          >
            <InternshipListFilter
              //  setCustomFilter={setCustomFilter}
               />
          </Form>
        </Modal>
      </Card>
    </>
  );
}

export default InternshipList;
