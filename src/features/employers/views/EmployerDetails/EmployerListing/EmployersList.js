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
  Col
} from "antd";
import { useHistory } from "react-router-dom";
import { getEmployerList, setRefreshEmployerList, resetRefreshEmployerList, getEmployerFilterList } from "./../../../employerSlice";
import { objectLength } from "./../../../../components/utils/JavaScriptUtils";
import { useSelector, useDispatch } from "react-redux";
import EmployerProfileView from "../../EmployerProfileTabView/EmployerProfileView";
//import JobPosting from "../AddEmployers/JobPosting";
import EmployersFiltersPage from "./EmployersFiltersPage";
import { DRAWER_WIDTH } from "../../../../../constants";
import moment from "moment";
import Slider from "react-slick";
import { FormOutlined } from "@ant-design/icons";
const { Search } = Input;
const {CheckableTag}=Tag;
const filterIntial={
  // company_size:undefined,
  // domain:[],
  // technologies:[],
  // work_type:[],
  // job_locations:[],
  // year_founded:undefined,
}


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

function EmployersList() {
  const [form] = Form.useForm();
  const [filterActive, setFilterActive] = useState(false);

  const [recordKey, setRecordKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [TabOpenPending, setTabOpenPending] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [buttonName,setbuttonName]=useState("Clear");
  const [newFilter, setNewFilter] = useState(false);
  const [isTouched, setIsTouched] = useState();
  const [filterValue, setFilterValue] = useState(filterIntial);

  const [customFilter, setCustomFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const employersList = useSelector((state) => state.employer.employerFilterList);
  const domainList = useSelector((state) => state.utils.domainList);

  const employerState = useSelector((state) => state.employer)

  const employerData = useSelector((state) => state.employer.employerDetail);
  const techLang = useSelector((state) => state.utils.skillsList);
  // const tableCount = employersList.length;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getEmployerList());
  // }, []);

  console.log("Eployer List", employersList);

  console.log("Eployer ListData", employerData);
  const pageSize = 5;

  var cityOptions;
  if (JSON.stringify(locationsList) !== "{}") {
    cityOptions = locationsList.map(function (obj) {
      return {
        label: obj.city,
        value: obj.id,
        state: obj.state,
        country: obj.country,
      };
    });
  }

  var domains;
  if (JSON.stringify(domainList) !== "{}") {
    domains = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }


  let techLangName;
  if (objectLength(techLang) > 0) {
    techLangName = techLang.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  // var employers;
  // if (JSON.stringify(employersList) !== "{}") {
  //   employers = employersList.map(function (obj) {
  //     return { label: obj.name, value: obj.id };
  //   });
  // }


  const dispatch = useDispatch();


  const history = useHistory();
  const onSearch = (value) => console.log(value);

  useEffect(() => {
    dispatch(getEmployerFilterList("is_deleted=false"));
  }, []);

  const showDrawer = () => {
    setVisible(true);
    console.log("recordKey: visible " + recordKey + " " + visible);
  };

  const onShowNewRecord = (key) => {
    setRecordKey(key);
    console.log("Record:" + key);
    //showDrawer();
  };

  const onclick = (key) => {
    setRecordKey(key);
    console.log("Record:" + key);
    showDrawer();
  };

  const onClose = () => {
    setVisible(false);
  };
  let tech;
  // console.log("RECORD *************###############**********", employersList[15].specialities)
  //console.log("employer list =", employersList[11].work_type);
  const columns = [
    {
      title: "Brand Name",
      dataIndex: "name",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onclick(record.id)}>{record.name}</a>
        </Space>
      ),
    },

    // {
    //   title: "Organization",
    //   dataIndex: "b2x",  

    //  render: (_, record) =>(
    //<p>record.b2x+" "record.name</p>),
    //   record.organize &&
    //   (candidateName = candidateList.find((o) => o.id == record.candidate)) && (
    //     // console.log("render in list ", candidateName),
    //     <p color="default">
    //       {candidateName != undefined && candidateName.first_name + " " + candidateName.last_name}
    //     </p>
    //   ),
    //   },

    // {
    //   title: "Candidate",
    //   dataIndex: "candidate",
    //   render: (_, record) =>
    //     record.candidate &&
    //     (candidateName = candidateList.find((o) => o.id == record.candidate)) && (
    //       // console.log("render in list ", candidateName),
    //       <p color="default">
    //         {candidateName != undefined && candidateName.first_name + " " + candidateName.last_name}
    //       </p>
    //     ),
    // },
    {
      title: "Company size",
      dataIndex: "company_size",
    },

    {
      title: "Year founded",
      dataIndex: "year_founded",
      render:(_,record)=>
      record.year_founded!=null?
        record.year_founded.slice(0,4):null
      

    },


    {
      title: "Industry / Sector",
      dataIndex: "domain",
    },

    {
      title: "Specialities",
      dataIndex: "specialities",
      render: (_, record) =>

        record.specialities != null && <Tag>{record.specialities}</Tag>

    },


    {
      title: "Work type",
      dataIndex: "work_type",
      render: (_, record) =>

        record.work_type != null && <Tag>{record.work_type}</Tag>

    },
    {
      title: "Location",
      dataIndex: "location_id",
      
    },
    {
      title: "Total funding",
      dataIndex: "total_fund",
     // render: (_, record) =>{
       // console.log("record",record)
      //  if(record.total_fund != null){
      //       if(record.total_fund_type === 'B'){
      //         return <p>{record.total_fund/1000000000}{record.total_fund_type}</p>
      //       } else if(record.total_fund_type === 'M'){
      //         return <p>{record.total_fund/1000000}{record.total_fund_type}</p>
      //       } else {
      //         return <p>{record.total_fund/1000}{record.total_fund_type}</p>
      //       }
      // }
     // }    
    },
    {
      title: "Technologies used",
      dataIndex: "technologies",

      render: (_, record) =>
        record.technologies.length > 0 &&
        ((tech = []),
          record.technologies.map((info, idx) => {
            let techUsed = techLangName != undefined && techLangName.find((o) => o.value == info);
            if (techUsed != undefined) {
              tech.push(techUsed.label);
            }
          })) &&
        tech.length > 0 &&
        tech.map((data) => {
          return <Tag color="blue">{data}</Tag>;
        }),
    },





    // {
    //   title: "Company type",
    //   dataIndex: "company_type",
    // },
    // {
    //   title: "Phone number",
    //   dataIndex: "phone_number",
    // },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    // },
    // {
    //   title: "Year founded",
    //   dataIndex: "year_founded",
    // },
    // {
    //   title: "City",
    //   dataIndex: "city",
    // },
  ];

  function resetFormFields() {
    form.resetFields();
  }

  const handleFinish = useCallback((values) => {
   console.log("empList filter submit: ", values);
    // values.year_founded &&
    //     (values.year_founded = year_founded.value + "-01-01");
       // values.year_founded=moment().values.year_founded._i;
      // console.log("values.year_founded",moment(values.year_founded._d,"YYYY-MM-DD"));


      // if (values.year_founded) {
      //   values.year_founded_from = values.year_founded[0].format(
      //     "YYYY-MM-01"
      //   );
      //   values.year_founded_to = values.year_founded[1].format(
      //     "YYYY-MM-01"
      //   );
      //}
      let data = "is_deleted=false";
      if (values.company_size != undefined) {
        data = data + "&company_size=" + values.company_size;
      }
      if (values.domain != undefined) {
        data = data + "&domain__in=" + values.domain[0];
        if (values.domain.length > 1) {
          values.domain.map((item) => (data = data + "__" + item));
        }
      }
      if (values.technologies != undefined) {
        data = data + "&technologies__in=" + values.technologies[0];
        if (values.technologies.length > 1) {
          values.technologies.map((item) => (data = data + "__" + item));
        }
  
      }
      // if (values.total_fund_from.number != undefined && values.total_fund_from.type) {
      //   data = data + "&total_fund_from=" + values.total_fund_from.number;
  
      // }
      // if (values.total_fund_to.number != undefined && values.total_fund_to.type) {
      //   data = data + "&total_fund_to=" + values.total_fund_to.number;
  
      // }

      if (values.work_type != undefined) {
        data = data + "&work_type__in=" + values.work_type[0];
        if (values.work_type.length > 1) {
          values.work_type.map((item) => (data = data + "__" + item));
        }
      }
      // if (values.job_locations != undefined) {
      //   data = data + "&location_id__in=" + values.job_locations[0];
      //   if (values.job_locations.length > 1) {
      //     values.job_locations.map((item) => (data = data + "__" + item));
      //   }
      // }
      // if (values.year_founded != undefined) {
      //   if (values.year_founded[0] > 0 || values.year_founded[1] > 0) {
          
      //     data =
      //       data +
      //       "&to_date__range=" +
      //       values.year_founded[0].format("YYYY") +
      //       "__" +
      //       values.year_founded[1].format("YYYY");
      //   }
      // }

      console.log("empList filter submit: ",data)

dispatch(getEmployerFilterList(data));


      // else {
      //   values.internship_from_date = null;
      //   values.internship_to_date = null;
      // }
      console.log("empList filter submit: ", values);

          console.log("values.year_founded,values.year_founded")
          setFilterActive(true);

    hideModal();
    resetFormFields();
  });

  //   const onPageChangeReq = (type) => {
  //     let total_pages = Math.ceil(tableCount/pageSize);

  //     if(type === "previous")  
  //     {
  //       if((currPage-1) > 0)
  //       {
  //         var new_page= currPage-1;
  //         setCurrPage(new_page);
  //         var data=new_page;
  // //        var data="fresher=true&page="+ new_page;
  //         dispatch(getFresherCandidateFilterList(data));
  //         setTabOpenPending(1);
  //         // console.log("Tab open pending setting left***", TabOpenPending)
  //       }      
  //     }
  //     else if((currPage+1) <= (total_pages))
  //     {
  //       var new_page= currPage+1;
  //       setCurrPage(new_page);
  //       var data="fresher=true&page="+ new_page;
  //       dispatch(getFresherCandidateFilterList(data));
  //       setTabOpenPending(2);
  //       // console.log("Tab open pending setting right***", TabOpenPending)
  //     }
  //   };


function newCustomFilter(){
  console.log("save and apply clicked!!");
  setNewFilter(true);
  form.submit();

}


  const onShowNextCandidate = (id, direction) => {

    employersList.map((candidate, index) => {
      if (candidate.id === id) {
        var newElement;
        if (direction === "Left") {
          newElement = employersList[index - 1];
          // if(newElement === undefined)
          // {
          //   onPageChangeReq("previous");
          // }
        }
        else if (direction === "Right") {
          var newElement = employersList[index + 1];
          // if(newElement === undefined)
          // {
          //   onPageChangeReq("next");
          // }            
        }
        console.log("new element to be displayed and index ", newElement, index);
        if (newElement !== undefined) {
          onShowNewRecord(newElement.id);
        }
      }
    });
  }
  const afterProfileDelete = (id) => {
    employersList.map((emp, index) => {
      var newEle;
      if (emp.id === id) {
        console.log(
          "Index,array length = ",
          index,
          employersList.length
        );
        if (employersList.length - 1 > index) {
          newEle = employersList[index + 1];
          // if (newEle === undefined) {
          //   onPageChangeReq("next");
          // }
        } else {
          newEle = employersList[index - 1];
          console.log("else condition-------");
          // if (newEle === undefined) {
          //   onPageChangeReq("previous");
          // }
        }
        if (newEle !== undefined) {
          onShowNewRecord(newEle.id);
        }
      }
    });
  };
  if (employerData.getEmployerListLoading === "complete_success" || employerData.getEmployerListLoading === "complete_failure") {
    if (TabOpenPending > 0) {
      if (employerData.getEmployerListLoading === "complete_success") {
        if (TabOpenPending === 1) {
          let newElement = employersList[(pageSize - 1)];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        }
        else {
          let newElement = employersList[0];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        }
      }
      setTabOpenPending(0);
      // console.log("Tab open pending after ***", TabOpenPending)      
    }

  }

  console.log(
    "Refresh employer list  updateEmployerLoading***************",
    employerState.updateEmployerLoading
  );

  if (
    employerState.updateEmployerLoading === "complete_success" ||
    employerState.updateEmployerLoading === "complete_failure"
  ) {
    console.log(
      "Refresh employer list***************",
      employerState.refreshEmployerList
    );
    if (employerState.refreshEmployerList == true) {
      //   dispatch(getEmployerFilterList(previousSearch));
      dispatch(getEmployerList());
      console.log(
        "Refreshing employer list calling dispatch***************",
        employerState.refreshEmployerList
      );
      dispatch(resetRefreshEmployerList());

      console.log("resetRefreshEmployerList() called");
    }
  }


  let employerDisplayList = _.cloneDeep(employersList);
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
          width={DRAWER_WIDTH}
          closable={false}
          onClose={onClose}
          visible={visible}
          drawerStyle={{ background: "#F6F8FC" }}
        >
          <EmployerProfileView recordKey={recordKey} onShowNextCandidate={onShowNextCandidate}
           afterProfileDelete={ afterProfileDelete}/>
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
                dispatch(getEmployerFilterList(data));
                setIsTouched(false);
              
               // initialValues={filterIntial}
                 setbuttonName("Clear");
              }}>

                Reset

              </Button>
               )} 
            </Space>
          </Col>
            {/* <div
              style={{
                width: "83%",
                display:'inline-block',
                position:'absolute',
                left:"21px",
                marginLeft:"11px",
                paddingTop:"7px",
                marginRight:"10px"
              }} */}
           {/* > */}
              {/* <Slider {...settings}>
                <CheckableTag>First</CheckableTag>
               <CheckableTag>Second</CheckableTag>
               <CheckableTag>Third</CheckableTag>
               <CheckableTag>Four</CheckableTag>

               {/* <CheckableTag>First</CheckableTag>
               <CheckableTag>First</CheckableTag> */}
               {/* </Slider> */}
               {/* </div> */}
               {/* </Col> */}
               {/* <Col  xxl={8} xl={7} lg={10}>
              <Button
                type="primary"
                onClick={() => {
                  showModal();
                  resetFormFields();
                }}
              >
                Filters
              </Button>
              </Col> */}
            {/* </Space> */}
          {/* </Col> */}
          <Col span={12}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
            >
              <Button
                type="primary"
                onClick={() => history.push("/employerDetails")}
              >
                Add Employers
              </Button>
            </Space>
          </Col>
        </Row>

        {objectLength(employerDisplayList) > 0 &&
          employerDisplayList.map((employer, index) => {
            let location = cityOptions.find((o) => o.value === employer.city);
            // console.log("location from employersList =", employerDisplayList);
            let domainName = domains.find((o) => o.value == employer.domain);


            if (location !== undefined) {
              employer.city = location.label;
            }

            if (domainName !== undefined) {
              employer.domain = domainName.label;
            }
          })}

        <Table bordered columns={columns} dataSource={employerDisplayList} size="small" scroll={{
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
            <Button   style={{ float: "left" }} 
            onClick={()=>{ hideModal();}}>Cancel</Button>,
            <Button onclick={()=>{ 
              if(filterActive){
                console.log("filterActive")
             // form.setFieldsValue(filterIntial);
             // setFilterValue(filterIntial);
              setbuttonName("Clear");

              }
              else{
              //  form.setFieldsValue(filterIntial);

              }
            }}>
                {buttonName}</Button>,
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
          <div
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          >
          <Form form={form} 
          onFinish={handleFinish} 
          layout="vertical"
         // initialValues={filterIntial}

          initialValues={{
            total_fund_type:{type:"M"}

          }}
          onFieldsChange={() => {
            // add your additionaly logic here
            setIsTouched(true);
          }}
          >
            <EmployersFiltersPage
              // setCustomFilter={setCustomFilter}
                            />
          </Form>
          </div>
        </Modal>
      </Card>
    </>
  );
}

export default EmployersList;
