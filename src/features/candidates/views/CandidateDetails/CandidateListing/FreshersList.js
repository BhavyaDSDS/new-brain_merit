import React, { useEffect, useCallback, useState } from "react";
import moment from "moment";
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
  Badge,
  List,
  Popconfirm,
  AutoComplete,
  Typography
} from "antd";

import { useHistory } from "react-router-dom";
import CandidateProfile from "../CandidateProfileTabView/CandidateProfileView";
import { useSelector, useDispatch } from "react-redux";
import {
  getFresherCandidateFilterList,
  resetRefreshCandList,
} from "../../../candidateSlice";
import {
  addCustomFilter,
  getFresherCustomFilterList,
  updatecustomFilter,
  deleteFreshercustomFilter
} from "../../../../components/componentsSlice";
import FreshersFiltersPage from "./FreshersFiltersPage";
import { CheckOutlined, LeftOutlined, RightOutlined,SettingOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {
  objectLength,
  GetTimeLineFromMomentArray,
} from "../../../../components/utils/JavaScriptUtils";
import { DRAWER_WIDTH, IT_BRANCHES } from "../../../../../constants";
import * as _ from "lodash";
import Slider from "react-slick";
const { Text, Title } = Typography;
const { CheckableTag } = Tag;

const { Search } = Input;

const filterIntial = {
  branch_name : [],
  college_name: [],
  degree_name: [],
  filter_ctc: [0,0],
  jobChange_status:[],
  open_for_internship: undefined,
  percentage: 0,
  placement_ready: undefined,
  pre_loc: [],
  pref_role: [],
  prim_skills: [],
  save_filter: undefined,
  timeline:[]
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

function FreshersList() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [candidateKey, setcandidateKey] = useState("");
  const FresherCandidatesList = useSelector(
    (state) => state.candidate.listFresherCandidates
  );
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [TabOpenPending, setTabOpenPending] = useState(0);
  const [filterValue, setFilterValue] = useState(filterIntial);

  const [newFilter, setNewFilter] = useState(false);
  const [customFilterUpdate, setcustomFilterUpdate] = useState(false);
  // const [filterIntial,setFilterIntial] = useState(filterIntial)
  const [customFilter, setCustomFilter] = useState(false);
  const [customFilterId, setCustomFilterId] = useState();

  const locationsList = useSelector((state) => state.utils.locationsList);
  const degreesList = useSelector((state) => state.utils.degreesList);
  const branchsList = useSelector((state) => state.utils.branchsList);
  const institutesList = useSelector((state) => state.utils.instituteList);
  const skillsList = useSelector((state) => state.utils.skillsList);
  const tableCount = useSelector(
    (state) => state.candidate.fresherCandidateCount
  );
  const [previousSearch, setPreviousSearch] = useState("is_deleted=false&fresher=true");
  const [currPage, setCurrPage] = useState(1);
  const candidateData = useSelector((state) => state.candidate);
  const pageSize = 50;
  const customFilterList = useSelector((state) => state.utils.freshercustomFilterList);
  const [quickFilterStatus, setquickFilterStatus] = useState(0);
  const [filterSetting, setFilterSetting] = useState(false);
  const filterSettingShow = useCallback(() => setFilterSetting(true), [
    setFilterSetting,
  ]);
  const filterSettingHide = useCallback(() => setFilterSetting(false), [
    setFilterSetting,
  ]);
  const [filterActive, setFilterActive] = useState(false);
  const [value, setValue] = useState(null);
  const [isTouched, setIsTouched] = useState();
  const [buttonName, setbuttonName] = useState("Clear");

  var degreeList;
  if (JSON.stringify(degreesList) !== "{}") {
    degreeList = degreesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var instituteList;
  if (JSON.stringify(institutesList) !== "{}") {
    instituteList = institutesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var branchList;
  if (JSON.stringify(branchsList) !== "{}") {
    branchList = branchsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var skillList;
  if (JSON.stringify(skillsList) !== "{}") {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  var locations;
  if (objectLength(locationsList) > 0) {
    locations = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }
  let preferedLoc;
  var degreeName;
  var branchName;
  var instituteName;
  var pSkillsName;

  console.log("Candidate List ***************: ", FresherCandidatesList);

  // console.log("skillList ***************: " + JSON.stringify(skillList));

  useEffect(() => {
    var data = "is_deleted=false&fresher=true&page=1";
    setPreviousSearch(data);
    dispatch(getFresherCandidateFilterList(data));
    setCurrPage(1);
    dispatch(getFresherCustomFilterList());
  }, []);

  const showDrawer = () => {
    setVisible(true);
    console.log("candidateKey: visible " + candidateKey + " " + visible);
  };

  const onShowNewRecord = (key) => {
    setcandidateKey(key);
    console.log("Record:" + key);
    //showDrawer();
  };

  const onclick = (key) => {
    setcandidateKey(key);
    console.log("Record:" + key);
    showDrawer();
  };

  const onClose = () => {
    setVisible(false);
  };
  const history = useHistory();
  const onSearch = (value) => {
    console.log(value);
    let data = "is_deleted=false&fresher=true&name__wildcard=" + value + "*";
    setPreviousSearch(data);
    dispatch(getFresherCandidateFilterList(data));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name" + "last_name",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onclick(record.id)}>
            {record.first_name} {record.last_name}
          </a>
        </Space>
      ),
    },
    {
      title: "Institute",
      dataIndex: "institute",
      render: (_, record) =>
        record.academics != null &&
        (instituteName = instituteList.find(
          (o) => o.value === record.academics.institute
        )) && <Text>{instituteName != undefined && instituteName.label}</Text>,
    },

    {
      title: "Degree",
      dataIndex: "degree",
      render: (_, record) =>
        record.academics != null &&
        (degreeName = degreeList.find(
          (o) => o.value === record.academics.degree
        )) && <Text>{degreeName != undefined && degreeName.label}</Text>,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      render: (_, record) =>
        record.academics != null &&
        (branchName = branchList.find(
          (o) => o.value === record.academics.branch
        )) && <Text>{branchName != undefined && branchName.label}</Text>,
    },
    {
      title: "Percentage",
      dataIndex: "score",
      render: (_, record) =>
        record.academics != null && <Text>{record.academics.score} %</Text>,
    },
    {
      title: "Graduation Year",
      dataIndex: "passed_out_year",
      render: (_, record) =>
        record.academics != null && record.academics.to_date.slice(0, 4),
    },
    {
      title: "Primary Skills",
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
      title: "Open For Internship",
      dataIndex: "open_for_internship",
      render: (_, record) =>
      (record.open_for_internship) ? (

        (record.internship_from_date && record.internship_to_date) ? (
        <>
          <Tag>{moment(record.internship_from_date).format("MMM-YY")}</Tag>-{" "}
          <Tag>{moment(record.internship_to_date).format("MMM-YY")}</Tag>
        </>
        ) : 
        <Tag color="green">Immediate</Tag>
      ) : (
        <Tag color="default">No</Tag>
      ),
    },
    {
      title: "Open For Job",
      dataIndex: "open_for_job",
      render: (_, record) =>
        record.open_for_job ? (
          (record.date_of_joining) ?
          <Tag>{moment(record.date_of_joining).format("MMM-YY")}</Tag>
          :
          <Tag color="green">Immediate</Tag>
        ) : (
          <Tag color="default">No</Tag>)
    },

    {
      title: "Preferred Job Location",
      dataIndex: "preferred_locations",
      render: (_, record) =>

        record.preferred_locations.length > 0 ?
          ((preferedLoc = []),
            record.preferred_locations.map((info, idx) => {
              let preferedLocation = locations != undefined && locations.find((o) => o.value == info);
              if (preferedLocation != undefined) {
                preferedLoc.push(preferedLocation.label);
              }
            })) &&
          preferedLoc.length > 0 &&
          preferedLoc.map((data) => {
            return <Tag color="blue">{data}</Tag>;
          }) : <Tag>Any</Tag>,
    }

  ];
  function resetFormFields() {
    form.resetFields();
  }

  const customfilterEdit = (item) => {
    showModal();
    console.log("Filter id:  ", item.id);
    console.log("filter name:   ", item.filters.name);
    console.log("filter values: ", item.filters.values);
    setCustomFilterId(item.id);
    setcustomFilterUpdate(true);
    setNewFilter(false);
    form.setFieldsValue(item.filters.values);
    setFilterValue(item.filters.values);
    console.log("EditCustom filter ==%%==");
  };

  const handleFinish = useCallback((values) => {
    console.log("submit values before : ",values);
    let data = previousSearch;
    if (data.includes("&page=")) {
      data = data.substring(0, data.lastIndexOf("&page=")) ;
    } 
    if (data.includes("&name__wildcard=")){        
      let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
        data= "is_deleted=false&fresher=true&";
        if(data1.includes("&")){
            data= data+ data1.substring(0, data1.indexOf("&"));
        }else{
          data= data+ data1;
        }
    }else{
      data="is_deleted=false&fresher=true";
    }

    if (values.degree_name != undefined) {
      if (values.degree_name.length > 0) {
        data = data + "&degree__in=" + values.degree_name[0];
        if (values.degree_name.length > 1) {
          values.degree_name.map((item) => (data = data + "__" + item));
        }
      }
    }
    if (values.college_name != undefined) {
      if (values.college_name.length > 0) {
        data = data + "&institute__in=" + values.college_name[0];
        if (values.college_name.length > 1) {
          values.college_name.map((item) => (data = data + "__" + item));
        }
      }
    }
    if (values.branch_name != undefined) {
      if (values.branch_name.length > 0) {
        data = data + "&branch__in=" + values.branch_name[0];
        if (values.branch_name.length > 1) {
          values.branch_name.map((item) => (data = data + "__" + item));
        }
      }
    }
    if (values.prim_skills != undefined) {
      if (values.prim_skills.length > 0) {
        data = data + "&p_tech_skills__in=" + values.prim_skills[0];
        if (values.prim_skills.length > 1) {
          values.prim_skills.map((item) => (data = data + "__" + item));
        }
      }
    }
    if(values.filter_ctc != undefined) {
      if (values.filter_ctc[0] > 0 || values.filter_ctc[1] > 0) {
        data =
          data +
          "&expected_ctc__range=" +
          values.filter_ctc[0] * 100000 +
          "__" +
          values.filter_ctc[1] * 100000;
      }
    }
    if (values.pref_role != undefined) {
      if (values.pref_role.length > 0) {
        data = data + "&preferred_roles__in=" + values.pref_role[0];
        if (values.pref_role.length > 1) {
          values.pref_role.map((item) => (data = data + "__" + item));
        }
      }
    }
    if (values.timeline != undefined) {
      if (values.timeline[0] > 0 || values.timeline[1] > 0) {
        
        data =
          data +
          "&to_date__range=" +
          values.timeline[0].format("YYYY") +
          "__" +
          values.timeline[1].format("YYYY");
      }
    }
    if (values.percentage != undefined) {
      if(values.percentage > 0)
      // if (values.percentage[0] > 0 || values.percentage[1] > 0) {
        {
        data =
          data +
          "&score__gte=" +
          values.percentage
          // "&score__lte=" +
          // values.percentage[1];
      // }
        }
    }
    if (values.jobChange_status.length > 0) {
      data = data + "&job_seakers_status__in=" + values.jobChange_status[0];
      if (values.jobChange_status.length > 1) {
        values.jobChange_status.map((item) => (data = data + "__" + item));
      }
    }
    if (values.pre_loc != undefined) {
      if (values.pre_loc.length > 0) {
        data = data + "&preferred_locations__in=" + values.pre_loc[0];
        if (values.pre_loc.length > 1) {
          values.pre_loc.map((item) => (data = data + "__" + item));
        }
      }
    }
    if (values.placement_ready != undefined) {
      data = data + "&open_for_job=" + values.placement_ready;
    }
    if (values.open_for_internship != undefined) {
      data = data + "&open_for_internship=" + values.open_for_internship;
    }
    console.log("Search url: " + data);
    setPreviousSearch(data);
    dispatch(getFresherCandidateFilterList(data));
    console.log("newFilter: " + newFilter);

    if (newFilter) {
      if (customFilterUpdate) {
        var data1 = {
          filters: { name: values.save_filter, query: data, values: values},
        };
        console.log("update custom filter...: ", JSON.stringify(data1));
        var data2 = [data1, customFilterId];
        console.log("newFilter function ");
        setNewFilter(false);
        if (customFilterId != undefined) {
          dispatch(updatecustomFilter(data2));
        }
        setcustomFilterUpdate(false);
      }else{
        var data1 = {
          filters: { name: values.save_filter, query: data, values: values},
          type:"fresher_cand"
        };
        console.log("newFilter function ");
        setNewFilter(false);
        dispatch(addCustomFilter(data1));
      }
      values.save_filter = "";
    }
   
 // clear all short filters which were set as new filter request is being sent.
    setquickFilterStatus(0);

    hideModal();
    setFilterActive(true);
    // resetFormFields();
    setCurrPage(1);
    setIsTouched(false);    
    setbuttonName("Clear & Reset");
    setFilterValue(values);
    setCustomFilter(false);

  },[newFilter,customFilterUpdate,previousSearch,customFilterId]);
  // let candidateDisplayList = [...FresherCandidatesList];

  const onPageChange = (pageNumber) => {
    console.log(
      "Page: ****************************" + pageNumber.current,
      pageNumber
    );
    // var data="is_deleted=false&fresher=true&page="+ pageNumber.current;
    var data = previousSearch;
    console.log("previousSearch.." + previousSearch);
    if (data.includes("page=")) {
      console.log(data.lastIndexOf("page="));
      data =
        data.substring(0, data.lastIndexOf("page=") + 5) + pageNumber.current;
    } else {
      data = data + "&page=" + pageNumber.current;
    }
    console.log(data);
    setCurrPage(pageNumber.current);
    setPreviousSearch(data);
    dispatch(getFresherCandidateFilterList(data));
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
        dispatch(getFresherCandidateFilterList(data));
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
      dispatch(getFresherCandidateFilterList(data));
      setTabOpenPending(2);
      // console.log("Tab open pending setting right***", TabOpenPending)
    }
  };

  const onShowNextCandidate = (id, direction) => {
    //Search the Experience list for curr id and fetch the next one also make sure to set cand id to new cand id
    FresherCandidatesList.map((candidate, index) => {
      if (candidate.id === id) {
        var newElement;
        if (direction === "Left") {
          newElement = FresherCandidatesList[index - 1];
          if (newElement === undefined) {
            onPageChangeReq("previous");
          }
        } else if (direction === "Right") {
          var newElement = FresherCandidatesList[index + 1];
          if (newElement === undefined) {
            onPageChangeReq("next");
          }
        }
        console.log(
          "new element to be displayed and index ",
          newElement,
          index
        );
        if (newElement !== undefined) {
          onShowNewRecord(newElement.id);
        }
      }
    });
  };

  const afterProfileDelete = (id) => {
    FresherCandidatesList.map((cand, index) => {
      var newEle;
      if (cand.id === id) {
        console.log(
          "Index,array length = ",
          index,
          FresherCandidatesList.length
        );
        if (FresherCandidatesList.length - 1 > index) {
          newEle = FresherCandidatesList[index + 1];
          if (newEle === undefined) {
            onPageChangeReq("next");
          }
        } else {
          newEle = FresherCandidatesList[index - 1];
          console.log("else condition-------");
          if (newEle === undefined) {
            onPageChangeReq("previous");
          }
        }
        if (newEle !== undefined) {
          onShowNewRecord(newEle.id);
        }
      }
    });
  };

  function refreshCandidateList() {
    dispatch(getFresherCandidateFilterList(previousSearch));
    console.log("Refreshing fresher list ****************************");
  }

  if (
    candidateData.updateCandidateLoading === "complete_success" ||
    candidateData.updateCandidateLoading === "complete_failure"
  ) {
    if (candidateData.refreshCandList == true) {
      refreshCandidateList();      
    }
    dispatch(resetRefreshCandList());
  }


  if (
    candidateData.getFresherCandidateListLoading === "complete_success" ||
    candidateData.getFresherCandidateListLoading === "complete_failure"
  ) {
    //  console.log("Tab open pending inside check ***", TabOpenPending)
    if (TabOpenPending > 0) {
      if (candidateData.getFresherCandidateListLoading === "complete_success") {
        if (TabOpenPending === 1) {
          let newElement = FresherCandidatesList[pageSize - 1];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        } else {
          let newElement = FresherCandidatesList[0];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        }
      }
      setTabOpenPending(0);
      // console.log("Tab open pending after ***", TabOpenPending)
    }
  }

  function newCustomFilter() {
    console.log("save and apply clicked!!");
    setNewFilter(true);
    form.submit();
  }

  function deleteConfirm(id) {
    console.log(id);
    dispatch(deleteFreshercustomFilter(id));
  };

  const handleSearch = (value) => {
    setValue(value);
    if(value.length >= 3){
      let data= previousSearch;
      if (data.includes("&page=")) {
        data = data.substring(0, data.lastIndexOf("&page=")) ;
      } 
      if (data.includes("&name__wildcard=")){        
        let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
          data= data.substring(0, data.lastIndexOf("&name__wildcard="));
          if(data1.includes("&")){
              data= data+ data1.substring(data1.indexOf("&"), data1.length);
          }
      }
      data = data + "&name__wildcard=" + value + "*";    setPreviousSearch(data);
      dispatch(getFresherCandidateFilterList(data));
      //  dispatch(getFresherCandidateList_auto(value));
    }
  };

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
        {visible && (
          <Drawer
            width={DRAWER_WIDTH}
            closable={false}
            onClose={onClose}
            visible={visible}
            drawerStyle={{ background: "#F6F8FC" }}
          >
            <CandidateProfile
              candidateKey={candidateKey}
              onShowNextCandidate={onShowNextCandidate}
              afterProfileDelete={afterProfileDelete}
            />
          </Drawer>
        )}

        <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>

          <Col xxl={5} xl={4} lg={4}>
              <AutoComplete
               value={value}
                dropdownMatchSelectWidth={252}
                style={{
                  width: "100%",
                }}
                onSearch={handleSearch}
              >
                <Input.Search
                  size="large"
                  placeholder="Search"
                  enterButton
                />
              </AutoComplete>
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
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page=")) ;
                    } 
                    if (data.includes("&name__wildcard=")){        
                      let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
                        data= "is_deleted=false&fresher=true&";
                        if(data1.includes("&")){
                            data= data+ data1.substring(0, data1.indexOf("&"));
                        }else{
                          data= data+ data1;
                        }
                    }else{
                      data="is_deleted=false&fresher=true";
                    }
                                    
                    data = data + "&open_for_internship=true";
                    if (quickFilterStatus === 1) {
                      data = "is_deleted=false&fresher=true&page=1";
                    }
                    else
                    {
                      setFilterActive(false);  
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    } 

                    setquickFilterStatus(quickFilterStatus === 1 ? 0 : 1);
                    setPreviousSearch(data);
                    dispatch(getFresherCandidateFilterList(data));
                    setCurrPage(1);
                  }}                >
                  Open For Internship
                </CheckableTag>
                <CheckableTag
                  checked={quickFilterStatus === 2 ? true : false}
                  onChange={() => {
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page=")) ;
                    } 
                    if (data.includes("&name__wildcard=")){        
                      let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
                        data= "is_deleted=false&fresher=true&";
                        if(data1.includes("&")){
                            data= data+ data1.substring(0, data1.indexOf("&"));
                        }else{
                          data= data+ data1;
                        }
                    }else{
                      data="is_deleted=false&fresher=true";
                    }
                                    
                    data = data + "&open_for_job=true";
                    if (quickFilterStatus === 2) {
                      data = "is_deleted=false&fresher=true&page=1";
                    }
                    else
                    {
                      setFilterActive(false);  
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    } 

                    setquickFilterStatus(quickFilterStatus === 2 ? 0 : 2);
                    setPreviousSearch(data);
                    dispatch(getFresherCandidateFilterList(data));
                    setCurrPage(1);
                  }}
                >
                  Open For Job
                </CheckableTag>
                <CheckableTag
                 checked={quickFilterStatus === 3 ? true : false}
                 onChange={() => {
                  let data = previousSearch;
                  if (data.includes("&page=")) {
                    data = data.substring(0, data.lastIndexOf("&page=")) ;
                  } 
                  if (data.includes("&name__wildcard=")){        
                    let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
                      data= "is_deleted=false&fresher=true&";
                      if(data1.includes("&")){
                          data= data+ data1.substring(0, data1.indexOf("&"));
                      }else{
                        data= data+ data1;
                      }
                  }else{
                    data="is_deleted=false&fresher=true";
                  }
                                  
                  data = data + "&branch__in="+IT_BRANCHES;
                   if (quickFilterStatus === 3) {
                     data = "is_deleted=false&fresher=true&page=1";
                   }
                   else
                   {
                     setFilterActive(false);  
                     setbuttonName("Clear");
                     form.setFieldsValue(filterIntial);
                   } 

                   setquickFilterStatus(quickFilterStatus === 3 ? 0 : 3);
                   setPreviousSearch(data);
                   dispatch(getFresherCandidateFilterList(data));
                   setCurrPage(1);
                 }}
                >
                  IT branch
                </CheckableTag>
                <CheckableTag
                 checked={quickFilterStatus === 4 ? true : false}
                 onChange={() => {
                  let data = previousSearch;
                  if (data.includes("&page=")) {
                    data = data.substring(0, data.lastIndexOf("&page=")) ;
                  } 
                  if (data.includes("&name__wildcard=")){        
                    let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
                      data= "is_deleted=false&fresher=true&";
                      if(data1.includes("&")){
                          data= data+ data1.substring(0, data1.indexOf("&"));
                      }else{
                        data= data+ data1;
                      }
                  }else{
                    data="is_deleted=false&fresher=true";
                  }
                                  
                  data = data + "&score__gte=70";
                   if (quickFilterStatus === 4) {
                     data = "is_deleted=false&fresher=true&page=1";
                   }
                   else
                   {
                     setFilterActive(false);  
                     setbuttonName("Clear");
                     form.setFieldsValue(filterIntial);
                   } 

                   setquickFilterStatus(quickFilterStatus === 4 ? 0 : 4);
                   setPreviousSearch(data);
                   dispatch(getFresherCandidateFilterList(data));
                   setCurrPage(1);
                 }}
                >
                  Above 70%
                </CheckableTag>

                {objectLength(customFilterList) > 0 &&
                  customFilterList.map((info, idx) => {
                    // console.log("index*********",5+idx)

                    return (
                      <CheckableTag
                        key={info.id}
                        checked={quickFilterStatus === 5 + idx ? true : false}
                        onChange={() => {
                          let data = previousSearch;
                          if (data.includes("&page=")) {
                            data = data.substring(0, data.lastIndexOf("&page=")) ;
                          } 
                          if (data.includes("&name__wildcard=")){        
                            let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
                              data= "is_deleted=false&fresher=true&";
                              if(data1.includes("&")){
                                  data= data+ data1.substring(0, data1.indexOf("&"));
                              }else{
                                data= data+ data1;
                              }
                          }else{
                            data="is_deleted=false&fresher=true";
                          }
                                          
                          data = data + "&" + info.filters.query;
                          if (quickFilterStatus === 5 + idx) {
                            data = "is_deleted=false&fresher=true&page=1";
                          }
                          else
                          {
                            setFilterActive(false);  
                            setbuttonName("Clear");
                            form.setFieldsValue(filterIntial);
                          } 
      
                          setquickFilterStatus(
                            quickFilterStatus === 5 + idx ? 0 : 5 + idx
                          );
                          setPreviousSearch(data);
                          dispatch(getFresherCandidateFilterList(data));
                          setCurrPage(1);
                        }}
                      >
                        {info.filters.name}
                      </CheckableTag>
                    );
                  })}
              </Slider>
            </div>
          </Col>

          <Col xxl={8} xl={7} lg={10}>
            <Space>
            <Badge 
             dot={filterActive} 
            color={"blue"} offset={[-5, 2]}>
            <Button
                onClick={() => {
                  showModal();
                  // resetFormFields();
                }}
              >
                Filters
              </Button>
              </Badge>
              <Button
                icon={<SettingOutlined style={{ fontSize: 11 }} />}
                style={{ width: "1.5rem", marginLeft: -9 }}
                onClick={() => filterSettingShow()}
              />  
              {filterActive && (
              <Button
                  size="small"
                  type="text"
                  onClick={() => {
                    setquickFilterStatus(0);
                    setFilterActive(false);
                    var data = "is_deleted=false&fresher=true&page=1";
                    setPreviousSearch(data);
                    dispatch(getFresherCandidateFilterList(data));
                    setCurrPage(1);
                    setValue(null);
                    form.setFieldsValue(filterIntial);
                    console.log("Reset Clicked..");
                    setIsTouched(false);
                    setbuttonName("Clear");
                  }}
                >
                  Reset
                </Button>
              )}
              </Space>
          </Col>



          <Col xxl={4} xl={4} lg={4}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right" }}
            >
              <Button onClick={() => window.open("/ProfileView", "_blank")}>
                Profile View
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  history.push({
                    pathname: "/AddCandidates",
                    state: { fresher: true },
                  })
                }
              >
                Add candidate
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          dataSource={FresherCandidatesList}
          size="small"
          onChange={onPageChange}
          pagination={{
            pageSize: pageSize,
            total: tableCount,
            current: currPage,
          }}
          scroll={{
            y: 600,
          }}
        />
        
        {filterActive && !isTouched && (form.setFieldsValue(filterValue)) }

        <Modal
          maskClosable={false}
          style={{ top: 0 }}
          title="Filters"
          destroyOnClose={true}
          visible={modalVisible}
          onOk={() => form.submit()}
          onCancel={() => {
            hideModal();
          }}
          footer={[
            <Button
              style={{ float: "left" }}
              type="text"
              onClick={() => {
                if(filterActive)
                {
                  setquickFilterStatus(0);
                  setFilterActive(false);
                  var data = "is_deleted=false&fresher=true&page=1";
                  setPreviousSearch(data);
                  dispatch(getFresherCandidateFilterList(data));
                  setCurrPage(1);
                  setValue(null);
                  form.setFieldsValue(filterIntial);
                  setFilterValue(filterIntial);
                  setCustomFilter(false);
                  console.log("Reset Clicked..");
                  setIsTouched(false);
                  setbuttonName("Clear");
                }
                else
                {
                  form.setFieldsValue(filterIntial);
                  setIsTouched(false);
                }
              }}
            >              
              {buttonName}
            </Button>,
            <Button
              onClick={() => {
                setCustomFilter(false);
                setNewFilter(false);
                setcustomFilterUpdate(false);
                hideModal();
                if(isTouched)
                {
                  setIsTouched(false);
                  form.setFieldsValue(filterIntial);
                }  
              }}
            >
              Cancel
            </Button>,
            
            <Button 
            onClick={() => newCustomFilter()} 
            disabled={!customFilter || !isTouched}
            >
              Save & Apply
            </Button>,

            <Button type="primary " onClick={() => form.submit()} disabled={!isTouched}>
              Apply
            </Button>,
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
             layout="vertical" 
             initialValues={filterIntial}
             onFieldsChange={() => {
              // add your additionaly logic here
              setIsTouched(true);
            }}>
              <FreshersFiltersPage setCustomFilter={setCustomFilter}
                />
            </Form>
          </div>
        </Modal>

        <Modal
          title="Manage Custom Filters"
          centered
          open={filterSetting}
          onCancel={() => filterSettingHide()}
          width={400}
          // footer={[<Button onClick={() => filterSettingHide()}>Cancel</Button>]}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={customFilterList}
            renderItem={(item, idx) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => customfilterEdit(item)}
                  />,
                  <Popconfirm
                    title={
                      <p>
                        Are you sure, do you want to delete {item.filters.name}{" "}
                        filter？
                      </p>
                    }
                    okText="Delete"
                    okType="danger"
                    cancelText="No"
                    onConfirm={() => deleteConfirm(item.id)}
                  >
                    {/* {console.log("&&&&&&",item)} */}
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => console.log("filter delete is cliked")}
                    />
                  </Popconfirm>,
                ]}
              >
                <h3 key={idx}>{item.filters.name}</h3>
              </List.Item>
            )}
          />
        </Modal>
      </Card>
    </>
  );
}

export default FreshersList;