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
  Tooltip,
} from "antd";
import { useHistory } from "react-router-dom";
import { getInterviewerList, resetRefreshInterviewerList, resetInterviewerDetails, getInterviewerFilterList } from "../../../interviewerSlice";
//import JobPosting from "../AddEmployers/JobPosting";
import InterviewersFilter from "./InterviewersFilter";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import { useSelector, useDispatch } from "react-redux";
//import JobPostingProfileView from "../employers/views/EmployerDetails/JobPostingProfileView/JobPostingProfileView";
import { CheckOutlined, ConsoleSqlOutlined, LinkedinOutlined } from "@ant-design/icons";

import InterviewersProfile from "../../InterviewersProfileView/InterviewersProfile";
const { Search } = Input;
import { YEARS } from "../../../../../constants";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";
const filterIntial = {
  // active:undefined,
  // companies_worked_for:[],
  // cost_per_interview:[],
  // domains:[],
  // total_exp:[0,0],
  // relevant_experience:[0,0],
  // no_of_interviews_conducted:[0,0],
  //  pri_tech_skills:[]
}
function InterviewersList() {
  const [form] = Form.useForm();
  const [filterActive, setFilterActive] = useState(false);

  const [recordKey, setRecordKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [buttonName, setbuttonName] = useState("Clear");
  const [isTouched, setIsTouched] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const interviewerState = useSelector(
    (state) => state.interviewer
  );

  const interviewersList = useSelector(
    (state) => state.interviewer.interviewerFilterList
  );

  const [TabOpenPending, setTabOpenPending] = useState(0);
  const [previousSearch, setPreviousSearch] = useState("is_deleted=false");
  const [currPage, setCurrPage] = useState(1);
  const employerId = useSelector((state) => state.employer.listEmployers);
  //const domainList = useSelector((state) => state.utils.domainList);
  const domainList = useSelector((state) => state.utils.candDomainList);
  const skillsList = useSelector((state) => state.utils.skillsList);
  //console.log("DomainList **********###############********", domainList)
  // console.log("InterviewersList info = ", interviewersList);
  // console.log("InterviewersList info = ", employerId);

  console.log("stateInterviewer", interviewersList)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviewerList());
  }, []);

  var empId;
  if (JSON.stringify(employerId) !== "{}") {
    empId = employerId.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  //console.log("Employers **********##################************",empId)
  var domain;
  if (JSON.stringify(domainList) !== "{}") {
    domain = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
    //console.log("Domains +++++++++++++++++++++##################*******************8",domain)
  }

  var skillList;
  if (JSON.stringify(skillsList) !== "{}") {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

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

  let InterviewerDisplayList = _.cloneDeep(interviewersList);
  let domainName;
  let companysWork;
  var pSkillsName;
  const columns = [
    {
      title: "Name",
      dataIndex:"name",
      render: (_, record) => (
        //console.log("record",record)
        <Space size="middle">
          <a onClick={() => onclick(record.id)}>{record.name}</a>
        </Space>
      ),
    },
    {
      title: "Companies work for",
      dataIndex: "companies_worked_for",
       render: (_, record) =>
       
            record.companies_worked_for &&
            (companysWork = empId.find((o) => o.value == record.companies_worked_for)) && (
              //console.log("render in list ",   role),
              <p color="default">
                {companysWork != undefined && companysWork.label}
              </p>
            ),
      
    // //   record.companies_worked_for.length > 0 &&
    // //   ((companysWork = []),
    // //     record.companies_worked_for.map((info, idx) => {
    // //       let companysWorkFor = empId  != undefined && empId .find((o) => o.value == info);
    // //       if ( companysWorkFor  != undefined) {
    // //         companysWork.push( companysWorkFor.label);
    // //       }
    // //     })) &&
    // //   companysWork.length > 0 &&
    // //   companysWork.map((data) => {
    // //     return <p color="blue">{data}</p>;
    // //   }),

    },

    // render: (_, record) =>
    //console.log("Record ********#####################*************",record)
    //console.log("Companies work for *************####################***************",companies_worked_for)

    // record.companies_worked_for.length > 0 &&
    // ((companyWork = []),

    //   record.companies_worked_for.map((info, idx) => {
    //     let companyWorkFor = empId.find((o) => o.value == info);

    //     console.log("companyWorkFor ************##################***********",empId.value)
    //     console.log("companyWorkFor ********###########******",empId.info);
    //     if (companyWorkFor != undefined) {
    //       companyWork.push(companyWorkFor.label);
    //     }
    //   })) &&
    //   companyWork.length > 0 &&
    //   companyWork.map((data) => {
    //   return <p color="blue">{data}</p>;
    // }),

    // render: (_, record) =>
    //   record.companies_worked_for.map((text) => {
    //     return <Tag color="default">{text}</Tag>;
    //   }),


    {
      title: "Domain",
      dataIndex: "domains",

      render: (_, record) =>
        // console.log("Record ***************#####################***************",record)
        record.domains.length > 0 &&
        ((domainName = []),
          record.domains.map((info, idx) => {
            let domName = domain != undefined && domain.find((o) => o.value == info);
            // console.log("((((((((((((((((((((((((((((((",info)

            //  console.log("Dom ***********#################************",domName)
            if (domName != undefined) {
              domainName.push(domName.label);
            }
          })) &&
        domainName.length > 0 &&
        domainName.map((data) => {
          return <Tag>{data}</Tag>;

          //render: (_, record) =>
          // 
          // render: (_, record) =>
          //   record.domains.length > 0 &&
          //   ((dom = []),
          //     record.domains.map((info, idx) => {
          //       let domainsUsed = domain != undefined && domain.find((o) => o.value == info);
          //       if ( domainsUsed  != undefined) {
          //         dom.push( domainsUsed.label);
          //       }
          //     })) &&
          //  dom.length > 0 &&
          //   dom.map((data) => {
          //     return <p color="blue">{data}</p>;
          //   }),

          // record.domains.map((text) => {
          //  // <p> {record.domains}</p>})
          // return <Tag color="default">{text}</Tag>;
          //   console.log("Domain ******************##############*********",record.text)
        }),
    },
    {
      title: "Total experience",
      dataIndex: "total_exp",
      render: (text) =>
        //  console.log("text",text)
        text != null ? <span>{text} {YEARS}</span> : ""
      // <span>{text}{YEARS}</span>,

      //console.log("Total experience*****************################**********",record.total_exp)
    },
    {
      title: "Primary Technical Skills",
      dataIndex: "p_tech_skills",
      render: (_, record) =>
        record.p_tech_skills.length > 0 &&
        ((pSkillsName = []),
          record.p_tech_skills.map((info, idx) => {
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


    {
      title: "Relevant Experience",
      dataIndex: "relevant_experience",
      render: (_, record) =>
        record.relevant_experience > 0 &&
        record.relevant_experience + " " + YEARS
    },


    // {
    //   title: "Primary Technical Skills",
    //   dataIndex: "p_tech_skills",
    //   render: (_, record) =>
    //     record.p_tech_skills.map((text) => {
    //       return <Tag color="default">{text}</Tag>;
    //     }),
    // },
    {
      title: "Active",
      dataIndex: "active",
      render: (text) =>
        text ? (
          <Tag color="#87d068">{<CheckOutlined />}</Tag>
        ) : (
          <Tag color="default">No</Tag>
        ),
    },
    {
      title: "Linkedin",
      dataIndex: "linkedin_profile",
      render: (text) => {
        return (
          <a href={text}>
            {<LinkedinOutlined style={{ fontSize: 18, color: "#69b8f0" }} />}
          </a>
        );
      },
    },
    {
      title: "No.of Interviews conducted",
      dataIndex: "no_of_interviews_conducted",
    },
    // {
    //   title: "Cost per interviews",
    //   dataIndex: "cost_per_interview",
    //   render: (text) => <span>Rs {text}</span>,
    // },
    // {
    //   title: "Active",
    //   dataIndex: "active",
    //   render: (text) =>
    //     text ? (
    //       <Tag color="#87d068">{<CheckOutlined />}</Tag>
    //     ) : (
    //       <Tag color="default">No</Tag>
    //     ),
    // },
    // {
    //   title: "Linkedin",
    //   dataIndex: "linkedin_profile",
    //   render: (text) => {
    //     return (
    //       <a href={text}>
    //         {<LinkedinOutlined style={{ fontSize: 18, color: "#69b8f0" }} />}
    //       </a>
    //     );
    //   },
    // },
    // {
    //   title: "Total experience",
    //   dataIndex: "total_exp",
    //   render: (text) => <span>{text} years</span>,
    // },
    // {
    //   title: "Active",
    //   dataIndex: "active",
    //   render: (text) =>
    //     text ? (
    //       <Tag color="#87d068">{<CheckOutlined />}</Tag>
    //     ) : (
    //       <Tag color="default">No</Tag>
    //     ),
    // },
  ];
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
  const onShowNextInterviewer = (id, direction) => {
    interviewersList.map((interviewer, index) => {
      if (interviewer.id === id) {
        var newElement;
        if (direction === 'Left') {
          newElement = interviewersList[index - 1];
          if (newElement === undefined) {
            onPageChangeReq('previous')
          }
        } else if (direction === 'Right') {
          var newElement = interviewersList[index + 1];
          if (newElement === undefined) {
            onPageChangeReq('next')
          }
        }
        console.log('newwwww', newElement, index)
        if (newElement != undefined) {
          onShowNewRecord(newElement.id)
        }
      }
    })
  }

  const afterProfileDelete = (id) => {
    interviewersList.map((inter, index) => {
      var newEle
      if (inter.id === id) {
        if (interviewersList.length - 1 > index) {
          newEle = interviewersList[index + 1];
          if (newEle === undefined) {
            onPageChangeReq('next')
          }
        } else {
          newEle = interviewersList[index - 1]
          if (newEle === undefined) {
            onPageChangeReq('previous')
          }
        }
        if (newEle !== undefined) {
          onShowNewRecord(newEle.id)
        }
      }
    })
  }






















  function resetFormFields() {
    form.resetFields();
  }

  const handleFinish = useCallback((values) => {
    console.log("InterviewersFilters filter submit: ", values);
    let data = "is_deleted=false";
    if (values.active != undefined) {
      data = data + "&active=" + values.active;

    }
    if (values.companies_worked_for != undefined) {
      data = data + "&companies_worked_for__in=" + values.companies_worked_for[0];
      if (values.companies_worked_for.length > 1) {
        values.companies_worked_for.map((item) => (data = data + "__" + item));
      }

    }
    // if (values.cost_per_interview != undefined) {
    //   if (values.cost_per_interview[0] > 0 || values.cost_per_interview[1] > 0) {
    //     data = data + "&cost_per_interview__range=" + values.cost_per_interview[0] + "__" + values.cost_per_interview[1];
    //   }
    // }
    if (values.domains != undefined) {
      data = data + "&domains__in=" + values.domains[0];
      if (values.domains.length > 1) {
        values.domains.map((item) => (data = data + "__" + item));
      }
    }
    if (values.total_exp != undefined) {
      if (values.total_exp[0] > 0 || values.total_exp[1] > 0) {
        data = data + "&total_exp__range=" + values.total_exp[0] + "__" + values.total_exp[1];
      }

    }
    if (values.relevant_experience != undefined) {
      if (values.relevant_experience[0] > 0 || values.relevant_experience[1] > 0) {
        data = data + "&relevant_experience__range=" + values.relevant_experience[0] + "__" + values.relevant_experience[1];
      }

    }
    if (values.no_of_interviews_conducted != undefined) {
      if (values.no_of_interviews_conducted[0] > 0 || values.no_of_interviews_conducted[1] > 0) {
        data = data + "&no_of_interviews_conducted__range=" + values.no_of_interviews_conducted[0] + "__" + values.no_of_interviews_conducted[1];
      }


    }
    if (values.pri_tech_skills != undefined) {
      data = data + "&p_tech_skills__in=" + values.pri_tech_skills[0];
      if (values.pri_tech_skills.length > 1) {
        values.pri_tech_skills.map((item) => (data = data + "__" + item));
      }

    }
    console.log("InterviewersFilters filter submit: ", data)
    dispatch(getInterviewerFilterList(data));
    setFilterActive(true);
    hideModal();
    resetFormFields();
  });
  // console.log(
  //   "Refresh interviewer list  updateEmployerLoading***************",
  //   interviewerState.updateInterviewerLoading
  // );
  function refreshInterviewerList() {
    dispatch(getInterviewerFilterList(previousSearch));
    console.log("Refreshing fresher list ****************************");
  }
  if (
    interviewerState.updateInterviewerLoading === "complete_success" ||
    interviewerState.updateInterviewerLoading === "complete_failure"
  ) 
    // console.log(
    //   "Refresh interviewer list***************",
    //   interviewerState.refreshInterviewerList
    // );
    {
    if (interviewerState.refreshInterviewerList == true) {
      //   dispatch(getEmployerFilterList(previousSearch));
      refreshInterviewerList();
      //dispatch(getInterviewerList());
    }
      dispatch(resetRefreshInterviewerList());

      console.log("resetRefreshEmployerList() called");
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
          <InterviewersProfile recordKey={recordKey} 
                 onShowNextInterviewer={onShowNextInterviewer}
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
                dispatch(getInterviewerFilterList(data));
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
                  dispatch(resetInterviewerDetails()),
                    history.push("/interviewers")
                }
                }
              >
                Add Interviewers
              </Button>
            </Space>
          </Col>
        </Row>

        {/* {objectLength(InterviewerDisplayList) > 0 &&
          InterviewerDisplayList.map((intviewers, index) => {
            let first_flag = true;
            objectLength(intviewers.companies_worked_for) > 0 &&
              intviewers.companies_worked_for.map((cmpName, index) => {
                let companyName = empId.find((o) => o.value == cmpName);

                // console.log("result =",companyName);

                if (companyName !== undefined) {
                  if (first_flag === true) {
                    intviewers.companies_worked_for = [];
                    first_flag = false;
                  }
                  intviewers.companies_worked_for.push(companyName.label);
                }
              });


              

            let first_flag1 = true;
            // objectLength(intviewers.domains) > 0 &&
            //   intviewers.domains.map((domName, index) => {
            //     let DomainName = domains.find((o) => o.value == domName);

            //     // console.log("result =",DomainName);

            //     if (DomainName !== undefined) {
            //       if (first_flag1 === true) {
            //         intviewers.domains = [];
            //         first_flag1 = false;
            //       }
            //       intviewers.domains.push(DomainName.label);
            //     }
            //   });

            let first_flag2 = true;
            objectLength(intviewers.p_tech_skills) > 0 &&
              intviewers.p_tech_skills.map((skill, index) => {
                let skillName = skillList.find((o) => o.value == skill);

                if (skillName !== undefined) {
                  if (first_flag2 === true) {
                    intviewers.p_tech_skills = [];
                    first_flag2 = false;
                  }
                  intviewers.p_tech_skills.push(skillName.label);
                  // emp.p_tech_skills.push(" ");
                }
              });
          })} */}

        <Table bordered columns={columns} dataSource={InterviewerDisplayList} />
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
            <Button style={{ float: "left" }} onClick={()=>{ hideModal();}}
           >Cancel</Button>,
            <Button 
            onClick={() => { form.setFieldsValue(filterIntial);}}>{buttonName}</Button>,
            <Button type="primary"
              onClick={() => form.submit()} disabled={!isTouched}>Apply</Button>,

          ]}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            //initialValues={filterIntial}
            initialValues={{ total_exp:[0,0],
              relevant_experience:[0,0],
              no_of_interviews_conducted:[0,0],}}
            onFieldsChange={() => {
              // add your additionaly logic here
              setIsTouched(true);
            }}
          >
            <InterviewersFilter />
          </Form>
        </Modal>
      </Card>
    </>
  );
}

export default InterviewersList;
