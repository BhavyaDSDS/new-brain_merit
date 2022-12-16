import React, { useEffect, useCallback, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Pagination } from "antd";
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
  Typography,
  Tooltip,
  Upload,
  message,
} from "antd";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import CandidateProfile from "../CandidateProfileTabView/CandidateProfileView";
import { useSelector, useDispatch } from "react-redux";
import {
  getExpCandidateFilterList,
  resetRefreshCandList,
} from "../../../candidateSlice";
import {
  addCustomFilter,
  getExpCustomFilterList,
  updatecustomFilter,
  deleteExpcustomFilter,
} from "../../../../components/componentsSlice";
import ExpCandidatesFiltersPage from "./ExpCandidatesFiltersPage";
import {
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { DRAWER_WIDTH, YEARS, LAKH, LPA, DAYS } from "../../../../../constants";
import {
  objectLength,
  GetTimeLineFromMomentArray,
} from "../../../../components/utils/JavaScriptUtils";
import * as _ from "lodash";
import JobSeekerStatusView from "../../../../components/view/JobSeekerStatusView";
import { get } from "lodash";
import UploadBulkToS3 from "../../../../components/utils/UploadBulkToS3";

const { CheckableTag } = Tag;
const { Search } = Input;
const { Text, Title } = Typography;

const filterIntial = {
  filter_rel_exp: [0],
  filter_total_exp: [0, 0],
  filter_ctc: [0, 0],
  filter_notice_period: [0, 0],
  jobChange_status: [],
  pre_loc: [],
  pref_role: [],
  prim_skills: undefined,
  resigned_status: "all",
  save_filter: undefined,
  cur_role: undefined,
  add_relevant_exp: false,
};

const { Dragger } = Upload;

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

function ExpCandidatesList() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [candidateKey, setcandidateKey] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const candidateData = useSelector((state) => state.candidate);
  const candidatesList = useSelector(
    (state) => state.candidate.listExperienceCandidates
  );
  const locationsList = useSelector((state) => state.utils.locationsList);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const [bulkUpload, setBulkUpload] = useState(false);
  const showBulkUpload = useCallback(() => setBulkUpload(true), [
    setBulkUpload,
  ]);
  const hideBulkUpload = useCallback(() => setBulkUpload(false), [
    setBulkUpload,
  ]);

  const [filterSetting, setFilterSetting] = useState(false);
  const filterSettingShow = useCallback(() => setFilterSetting(true), [
    setFilterSetting,
  ]);
  const filterSettingHide = useCallback(() => setFilterSetting(false), [
    setFilterSetting,
  ]);

  console.log("candidateDisplayList $$$$$$$", candidatesList);

  const fill = ["fullStack", "backend", "ios"];

  const skillsList = useSelector((state) => state.utils.skillsList);
  const rolesList = useSelector((state) => state.utils.roleList);
  const [previousSearch, setPreviousSearch] = useState(
    "is_deleted=false&fresher=false"
  );
  const [TabOpenPending, setTabOpenPending] = useState(0);

  const [quickFilterStatus, setquickFilterStatus] = useState(0);
  const [customFilterUpdate, setcustomFilterUpdate] = useState(false);

  const [customFilter, setCustomFilter] = useState(false);
  const [newFilter, setNewFilter] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [filterValue, setFilterValue] = useState(filterIntial);
  const [submitStatus, setSubmitStatus] = useState(false);

  const [relevantExpShow, setrelevantExpShow] = useState(false);

  const [value, setValue] = useState(null);
  const [customFilterId, setCustomFilterId] = useState();

  const tableCount = useSelector((state) => state.candidate.expCandidateCount);
  const pageSize = 50;
  const customFilterList = useSelector(
    (state) => state.utils.expcustomFilterList
  );
  const [isTouched, setIsTouched] = useState();
  const [buttonName, setbuttonName] = useState("Clear");

  const ellipsis = true;

  // console.log(
  //   "customFilters******************" + JSON.stringify(customFilterList)
  // );
  // console.log("Current page....." + currPage)
  // console.log("Tab open pending main ***", TabOpenPending);

  console.log("custom filters -----", customFilterList);

  var roleList;
  if (JSON.stringify(rolesList) !== "{}") {
    roleList = rolesList.map(function (obj) {
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

  // console.log("Candidate List ***************: " + JSON.stringify(candidatesList));
  // console.log("skillList ***************: " + JSON.stringify(skillList));

  useEffect(() => {
    var data = "is_deleted=false&fresher=false&page=1";
    setPreviousSearch(data);
    //console.log("previousSearch in useEffect.." + previousSearch);
    dispatch(getExpCandidateFilterList(data));
    setCurrPage(1);
    dispatch(getExpCustomFilterList());
  }, []);

  const showDrawer = () => {
    setVisible(true);
    console.log("candidateKey: visible " + candidateKey + " " + visible);
  };

  const onclick = (key) => {
    setcandidateKey(key);
    console.log("Record:" + key);
    showDrawer();
  };

  const onShowNewRecord = (key) => {
    setcandidateKey(key);
    console.log("Tab Record:" + key);
  };

  const onPageChangeReq = (type) => {
    let total_pages = Math.ceil(tableCount / pageSize);
    // console.log('Page: **********Type***********No Of Pages' + currPage, type, total_pages);

    if (type === "previous") {
      if (currPage - 1 > 0) {
        var new_page = currPage - 1;
        setCurrPage(new_page);
        //    var data = "is_deleted=false&fresher=false&page=" + new_page;
        var data = previousSearch;
        console.log("previousSearch.." + previousSearch);
        if (data.includes("page=")) {
          data = data.substring(0, data.lastIndexOf("page=") + 5) + new_page;
        } else {
          data = data + "&page=" + new_page;
        }
        console.log(data);
        setPreviousSearch(data);
        dispatch(getExpCandidateFilterList(data));
        setTabOpenPending(1);
        // console.log("Tab open pending setting left***", TabOpenPending)
      }
    } else if (currPage + 1 <= total_pages) {
      var new_page = currPage + 1;
      setCurrPage(new_page);
      //      var data = "is_deleted=false&fresher=false&page=" + new_page;
      var data = previousSearch;
      console.log("previousSearch.." + previousSearch);
      if (data.includes("page=")) {
        data = data.substring(0, data.lastIndexOf("page=") + 5) + new_page;
      } else {
        data = data + "&page=" + new_page;
      }
      console.log(data);
      setPreviousSearch(data);
      dispatch(getExpCandidateFilterList(data));
      setTabOpenPending(2);
      // console.log("Tab open pending setting right***", TabOpenPending)
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  const history = useHistory();

  const onSearch = (value) => {
    console.log(value);
    let data = "is_deleted=false&fresher=false&name__wildcard=" + value + "*";
    setPreviousSearch(data);
    dispatch(getExpCandidateFilterList(data));
  };

  let currentRole;
  var pSkillsName;
  let preferedLoc;
  var days;
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
      title: "Total Experience",
      dataIndex: "total_experience",
      render: (_, record) =>
        record.total_experience > 0 ? (
          <Tag> {record.total_experience + " " + YEARS} </Tag>
        ) : null,
    },
    {
      title: "Current Role",
      dataIndex: "current_role",
      render: (_, record) =>
        record.current_role &&
        (currentRole = roleList.find(
          (o) => o.value == record.current_role
        )) && (
          <Tooltip
            placement="top"
            title={currentRole != undefined && currentRole.label}
          >
            <Tag style={{ paddingRight: "0px" }}>
              <Text style={{ width: 85 }} ellipsis>
                {currentRole != undefined && currentRole.label}
              </Text>
              <Tag
                style={{
                  background: "#fff",
                  borderWidth: "0 0 0 1px",
                  marginRight: "0px",
                }}
              >
                {record.relevant_experience > 0 &&
                  record.relevant_experience + " " + "yrs"}
              </Tag>
            </Tag>
          </Tooltip>
        ),
    },

    {
      title: "Expected / Current CTC",
      dataIndex: "current_ctc",
      render: (_, record) => (
        <>
          <div>
            {record.expected_ctc > 0 &&
            record.expected_ctc_as_per_company_standards == false ? (
              <Text style={{ position: "relative", left: "48px" }}>
                {record.expected_ctc / LAKH + " " + LPA}
              </Text>
            ) : (
              <Tag style={{ position: "relative", left: "43px" }}>Flexible</Tag>
            )}
          </div>
          {/* <div>
            {
              <hr
                style={{
                  width: "30%",
                  border: "none",
                  backgroundColor: "rgba(0,0,0,0.15)",
                  height: "1px",
                  marginTop: "0",
                  marginBottom: "1px",
                }}
              />
            }
          </div> */}
          <div>
            {record.current_ctc > 0 ? (
              <Text
                style={{ position: "relative", left: "48px", fontSize: "12px" }}
              >
                {record.current_ctc / LAKH + " " + LPA}
              </Text>
            ) : (
              <Text style={{ position: "relative", left: "65px" }}>-</Text>
            )}
          </div>
        </>
      ),
    },

    {
      title: "Availability",
      dataIndex: "available",
      render: (_, record) =>
        record.resigned === true ? (
          <>
            <Badge
              count={"R"}
              style={{ backgroundColor: "#82CD47", marginRight: "10px" }}
            />
            <>
              {(days = moment(record.date_of_joining, "YYYY-MM-DD").diff(
                new Date(),
                "days"
              )) > 0 ? (
                <>
                  <Text>
                    {moment(record.date_of_joining).format("DD-MMM-YY")}
                  </Text>
                  <Text
                    style={{
                      display: "block",
                      // position: "absolute",
                      // left: "40px",
                      fontSize: "12px",
                      // bottom: "10px",
                      marginLeft:"31px"
                    }}
                  >
                    {days} days to go..
                  </Text>
                </>
              ) : (
                "Immediate"
              )}{" "}
            </>
          </>
        ) : (
          <>{record.notice_period > 0 && <Tag>NP{record.notice_period}</Tag>}</>
        ),
    },
    {
      title: "Preferred Job Locations",
      dataIndex: "preferred_locations",
      render: (_, record) =>
        record.preferred_locations.length > 0 ? (
          ((preferedLoc = []),
          record.preferred_locations.map((info, idx) => {
            let preferedLocation =
              locations != undefined && locations.find((o) => o.value == info);
            if (preferedLocation != undefined) {
              preferedLoc.push(preferedLocation.label);
            }
          })) &&
          preferedLoc.length > 0 &&
          preferedLoc.map((data) => {
            return <Tag>{data}</Tag>;
          })
        ) : (
          <Tag>Any</Tag>
        ),
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
      title: "Job Seeker Status",
      dataIndex: "job_seakers_status",
      render: (_, record) =>
        record.job_seakers_status && (
          <JobSeekerStatusView jobSeekerStatus={record.job_seakers_status} />
        ),
    },
  ];
  function resetFormFields() {
    form.resetFields();
  }

  function refreshExpCandidateList() {
    dispatch(getExpCandidateFilterList(previousSearch));
    console.log("Refreshing exp list ****************************");
  }

  const customfilterEdit = (item) => {
    showModal();
    setCustomFilterId(item.id);
    setcustomFilterUpdate(true);
    setNewFilter(false);
    form.setFieldsValue(item.filters.values);
    setFilterValue(item.filters.values);
    console.log("EditCustom filter ==%%==");
  };

  const handleFinish = useCallback(
    (values) => {
      console.log("Submit filter form value ==%%==", values);
      setSubmitStatus(true);
      let data = previousSearch;
      if (data.includes("&page=")) {
        data = data.substring(0, data.lastIndexOf("&page="));
      }
      if (data.includes("&name__wildcard=")) {
        let data1 = data.substring(
          data.lastIndexOf("name__wildcard="),
          data.length
        );
        data = "is_deleted=false&fresher=false&";
        if (data1.includes("&")) {
          data = data + data1.substring(0, data1.indexOf("&"));
        } else {
          data = data + data1;
        }
      } else {
        data = "is_deleted=false&fresher=false";
      }

      if (values.prim_skills != undefined) {
        if (values.prim_skills.length > 0) {
          data = data + "&p_tech_skills__in=" + values.prim_skills[0];
          if (values.prim_skills.length > 1) {
            values.prim_skills.map((item) => (data = data + "__" + item));
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
      if (values.pref_role != undefined) {
        if (values.pref_role.length > 0) {
          data = data + "&preferred_roles__in=" + values.pref_role[0];
          if (values.pref_role.length > 1) {
            values.pref_role.map((item) => (data = data + "__" + item));
          }
        }
      }
      if (values.filter_total_exp[0] > 0 || values.filter_total_exp[1] > 0) {
        data =
          data +
          "&total_experience__range=" +
          values.filter_total_exp[0] +
          "__" +
          values.filter_total_exp[1];
      }
      if (values.cur_role != undefined) {
        data = data + "&current_role=" + values.cur_role;
      }

      if (values.filter_rel_exp != undefined) {
        // if (values.filter_rel_exp[0] > 0 || values.filter_rel_exp[1] > 0) {
        data = data + "&relevant_experience__gte=" + values.filter_rel_exp;
        // "&relevant_experience__lte=" +
        // values.filter_rel_exp[1];
        // }
      }
      if (values.filter_ctc != undefined) {
        if (values.filter_ctc[0] > 0 || values.filter_ctc[1] > 0) {
          data =
            data +
            "&expected_ctc__range=" +
            values.filter_ctc[0] * 100000 +
            "__" +
            values.filter_ctc[1] * 100000;
        }
      }

      if (
        values.filter_notice_period[0] > 0 ||
        values.filter_notice_period[1] > 0
      ) {
        data =
          data +
          "&notice_period__range=" +
          values.filter_notice_period[0] +
          "__" +
          values.filter_notice_period[1];
      }
      if (values.resigned_status != "all") {
        if (values.resigned_status == "resigned")
          data = data + "&resigned=true";
        else data = data + "&resigned=false";
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
      console.log("Search url: " + data);

      setPreviousSearch(data);
      dispatch(getExpCandidateFilterList(data));
      console.log("newFilter: " + newFilter);

      if (newFilter) {
        if (customFilterUpdate) {
          var data1 = {
            filters: { name: values.save_filter, query: data, values: values },
          };
          console.log("update custom filter...: ", JSON.stringify(data1));
          var data2 = [data1, customFilterId];
          console.log("newFilter function ");
          setNewFilter(false);
          if (customFilterId != undefined) {
            dispatch(updatecustomFilter(data2));
          }
          setcustomFilterUpdate(false);
        } else {
          var data1 = {
            filters: { name: values.save_filter, query: data, values: values },
            type: "exp_cand",
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
      setbuttonName("Clear & Reset");
      // resetFormFields();
      setCurrPage(1);
      setIsTouched(false);
      setFilterValue(values);
      setCustomFilter(false);
    },
    [previousSearch, newFilter, customFilterUpdate, customFilterId]
  );

  const onPageChange = (pageNumber) => {
    console.log(
      "Page: ****************************" + pageNumber.current,
      pageNumber
    );
    // var data="is_deleted=false&fresher=false&page="+ pageNumber.current;
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
    setPreviousSearch(data);
    dispatch(getExpCandidateFilterList(data));
    setCurrPage(pageNumber.current);
  };

  if (
    candidateData.updateCandidateLoading === "complete_success" ||
    candidateData.updateCandidateLoading === "complete_failure"
  ) {
    if (candidateData.refreshCandList == true) {
      refreshExpCandidateList();
      console.log(
        "Refreshing exp cand list***************",
        candidateData.refreshExpCandidateList
      );
    }
    dispatch(resetRefreshCandList());
  }

  if (
    candidateData.getExpCandListLoading === "complete_success" ||
    candidateData.getExpCandListLoading === "complete_failure"
  ) {
    //  console.log("Tab open pending inside check ***", TabOpenPending)
    if (TabOpenPending > 0) {
      if (candidateData.getExpCandListLoading === "complete_success") {
        if (TabOpenPending === 1) {
          let newElement = candidatesList[pageSize - 1];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        } else {
          let newElement = candidatesList[0];
          if (newElement !== undefined) {
            onShowNewRecord(newElement.id);
          }
        }
      }
      setTabOpenPending(0);
      // console.log("Tab open pending after ***", TabOpenPending)
    }
  }

  const afterProfileDelete = (id) => {
    candidatesList.map((cand, index) => {
      var newEle;
      if (cand.id === id) {
        console.log("Index,array length = ", index, candidatesList.length);
        if (candidatesList.length - 1 > index) {
          newEle = candidatesList[index + 1];
          if (newEle === undefined) {
            onPageChangeReq("next");
          }
        } else {
          newEle = candidatesList[index - 1];
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

  const onShowNextCandidate = (id, direction) => {
    //Search the Experience list for curr id and fetch the next one also make sure to set cand id to new cand id
    candidatesList.map((candidate, index) => {
      if (candidate.id === id) {
        var newElement;
        if (direction === "Left") {
          newElement = candidatesList[index - 1];
          if (newElement === undefined) {
            onPageChangeReq("previous");
          }
        } else if (direction === "Right") {
          var newElement = candidatesList[index + 1];
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

  function newCustomFilter() {
    console.log("save and apply clicked!!");
    setNewFilter(true);
    form.submit();
  }

  function deleteConfirm(id) {
    console.log(id);
    dispatch(deleteExpcustomFilter(id));
  }

  const handleSearch = (value) => {
    setValue(value);
    let data = previousSearch;
    if (data.includes("&page=")) {
      data = data.substring(0, data.lastIndexOf("&page="));
    }
    if (data.includes("&name__wildcard=")) {
      let data1 = data.substring(
        data.lastIndexOf("name__wildcard="),
        data.length
      );
      data = data.substring(0, data.lastIndexOf("&name__wildcard="));
      if (data1.includes("&")) {
        data = data + data1.substring(data1.indexOf("&"), data1.length);
      }
    }
    data = data + "&name__wildcard=" + value + "*";
    setPreviousSearch(data);
    dispatch(getExpCandidateFilterList(data));
    //  dispatch(getFresherCandidateList_auto(value));
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
            {/* {console.log("cand key ***********", candidateKey)} */}
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
              <Input.Search size="large" placeholder="Search" enterButton />
            </AutoComplete>
          </Col>

          <Col xxl={6} xl={9} lg={6}>
            <div
              style={{
                width: "90%",
                paddingLeft: "25px",
                paddingTop: "6px",
                paddingRight: "20px",
              }}
            >
              <Slider {...settings}>
                {/* <Button icon={<LeftOutlined />} type="link" size="small" /> */}
                <CheckableTag
                  checked={quickFilterStatus === 1 ? true : false}
                  onChange={() => {
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page="));
                    }
                    if (data.includes("&name__wildcard=")) {
                      let data1 = data.substring(
                        data.lastIndexOf("name__wildcard="),
                        data.length
                      );
                      data = "is_deleted=false&fresher=false&";
                      if (data1.includes("&")) {
                        data = data + data1.substring(0, data1.indexOf("&"));
                      } else {
                        data = data + data1;
                      }
                    } else {
                      data = "is_deleted=false&fresher=false";
                    }

                    data = data + "&notice_period__lte=30";
                    if (quickFilterStatus === 1) {
                      data = "is_deleted=false&fresher=false&page=1";
                    } else {
                      setFilterActive(false);
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    }

                    setquickFilterStatus(quickFilterStatus === 1 ? 0 : 1);
                    setPreviousSearch(data);
                    dispatch(getExpCandidateFilterList(data));
                    setCurrPage(1);
                  }}
                >
                  NP30
                </CheckableTag>
                <CheckableTag
                  checked={quickFilterStatus === 2 ? true : false}
                  onChange={() => {
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page="));
                    }
                    if (data.includes("&name__wildcard=")) {
                      let data1 = data.substring(
                        data.lastIndexOf("name__wildcard="),
                        data.length
                      );
                      data = "is_deleted=false&fresher=false&";
                      if (data1.includes("&")) {
                        data = data + data1.substring(0, data1.indexOf("&"));
                      } else {
                        data = data + data1;
                      }
                    } else {
                      data = "is_deleted=false&fresher=false";
                    }

                    data = data + "&notice_period__lte=45";
                    if (quickFilterStatus === 2) {
                      data = "is_deleted=false&fresher=false&page=1";
                    } else {
                      setFilterActive(false);
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    }
                    setquickFilterStatus(quickFilterStatus === 2 ? 0 : 2);
                    setPreviousSearch(data);
                    dispatch(getExpCandidateFilterList(data));
                    setCurrPage(1);
                  }}
                >
                  NP45
                </CheckableTag>
                <CheckableTag
                  checked={quickFilterStatus === 3 ? true : false}
                  onChange={() => {
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page="));
                    }
                    if (data.includes("&name__wildcard=")) {
                      let data1 = data.substring(
                        data.lastIndexOf("name__wildcard="),
                        data.length
                      );
                      data = "is_deleted=false&fresher=false&";
                      if (data1.includes("&")) {
                        data = data + data1.substring(0, data1.indexOf("&"));
                      } else {
                        data = data + data1;
                      }
                    } else {
                      data = "is_deleted=false&fresher=false";
                    }

                    data = data + "&resigned=true";
                    if (quickFilterStatus === 3) {
                      data = "is_deleted=false&fresher=false&page=1";
                    } else {
                      setFilterActive(false);
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    }
                    setquickFilterStatus(quickFilterStatus === 3 ? 0 : 3);
                    setPreviousSearch(data);
                    dispatch(getExpCandidateFilterList(data));
                    setCurrPage(1);
                  }}
                >
                  Resigned
                </CheckableTag>
                <CheckableTag
                  checked={quickFilterStatus === 4 ? true : false}
                  onChange={() => {
                    let data = previousSearch;
                    if (data.includes("&page=")) {
                      data = data.substring(0, data.lastIndexOf("&page="));
                    }
                    if (data.includes("&name__wildcard=")) {
                      let data1 = data.substring(
                        data.lastIndexOf("name__wildcard="),
                        data.length
                      );
                      data = "is_deleted=false&fresher=false&";
                      if (data1.includes("&")) {
                        data = data + data1.substring(0, data1.indexOf("&"));
                      } else {
                        data = data + data1;
                      }
                    } else {
                      data = "is_deleted=false&fresher=false";
                    }

                    data = data + "&job_seakers_status=active";
                    if (quickFilterStatus === 4) {
                      data = "is_deleted=false&fresher=false&page=1";
                    } else {
                      setFilterActive(false);
                      setbuttonName("Clear");
                      form.setFieldsValue(filterIntial);
                    }

                    setquickFilterStatus(quickFilterStatus === 4 ? 0 : 4);
                    setPreviousSearch(data);
                    dispatch(getExpCandidateFilterList(data));
                    setCurrPage(1);
                  }}
                >
                  Active
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
                            data = data.substring(
                              0,
                              data.lastIndexOf("&page=")
                            );
                          }
                          if (data.includes("&name__wildcard=")) {
                            let data1 = data.substring(
                              data.lastIndexOf("name__wildcard="),
                              data.length
                            );
                            data = "is_deleted=false&fresher=false&";
                            if (data1.includes("&")) {
                              data =
                                data + data1.substring(0, data1.indexOf("&"));
                            } else {
                              data = data + data1;
                            }
                          } else {
                            data = "is_deleted=false&fresher=false";
                          }

                          data = data + "&" + info.filters.query;
                          if (quickFilterStatus === 5 + idx) {
                            data = "is_deleted=false&fresher=false&page=1";
                          } else {
                            setFilterActive(false);
                            setbuttonName("Clear");
                            form.setFieldsValue(filterIntial);
                          }

                          setquickFilterStatus(
                            quickFilterStatus === 5 + idx ? 0 : 5 + idx
                          );
                          setPreviousSearch(data);
                          dispatch(getExpCandidateFilterList(data));
                          setCurrPage(1);
                        }}
                      >
                        {info.filters.name}
                      </CheckableTag>
                    );
                  })}
              </Slider>
              {/* <Button icon={<RightOutlined />} type="link" size="small" />           */}
            </div>
          </Col>

          <Col xxl={9} xl={7} lg={10}>
            <Space>
              <Badge dot={filterActive} color={"blue"} offset={[-5, 2]}>
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
                    var data = "is_deleted=false&fresher=false&page=1";
                    setPreviousSearch(data);
                    setValue(null);
                    dispatch(getExpCandidateFilterList(data));
                    setCurrPage(1);
                    form.setFieldsValue(filterIntial);
                    console.log("Reset Clicked..");
                    setFilterActive(false);
                    setrelevantExpShow(false);
                    setIsTouched(false);
                    setCustomFilter(false);
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
                  // history.push({
                  //   pathname: "/AddCandidates",
                  //   state: { fresher: false },
                  // })
                  showBulkUpload()
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
          dataSource={candidatesList}
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

        {filterActive && !isTouched && form.setFieldsValue(filterValue)}

        <Modal
          maskClosable={false}
          style={{ top: 0 }}
          title="Filters"
          destroyOnClose={true}
          visible={modalVisible}
          onOk={() => form.submit()}
          onCancel={() => {
            // !submitStatus && form.setFieldsValue(filterIntial);
            hideModal();
            // resetFormFields();
          }}
          footer={[
            <Button
              style={{ float: "left" }}
              type="text"
              // disabled={!filterActive}
              onClick={() => {
                if (filterActive) {
                  form.resetFields(), setFilterActive(false);
                  var data = "is_deleted=false&fresher=false&page=1";
                  setPreviousSearch(data);
                  dispatch(getExpCandidateFilterList(data));
                  setCurrPage(1);
                  form.setFieldsValue(filterIntial);
                  setFilterValue(filterIntial);
                  setCustomFilter(false);
                  setquickFilterStatus(0);
                  setrelevantExpShow(false);
                  setIsTouched(false);
                  setbuttonName("Clear");
                } else {
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
                if (isTouched) {
                  setrelevantExpShow(false);
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

            // <Button type="primary " onClick={() => form.submit()} disabled={!isTouched}>
            //   Apply
            // </Button>,

            <Button
              type="primary "
              onClick={() => form.submit()}
              disabled={!isTouched}
            >
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
              initialValues={filterValue}
              onFieldsChange={() => {
                // add your additionaly logic here
                setIsTouched(true);
              }}
            >
              <ExpCandidatesFiltersPage
                setCustomFilter={setCustomFilter}
                setrelevantExpShow={setrelevantExpShow}
                relevantExpShow={relevantExpShow}
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
        <Modal
          title="Add Candidate"
          centered
          open={bulkUpload}
          onCancel={() => hideBulkUpload()}
          width={800}
          // bodyStyle={{height:"500px",overflow:"scroll"}}
          // footer={[<Button onClick={() => filterSettingHide()}>Cancel</Button>]}
          footer={null}
          destroyOnClose={true}
        >

          <div style={{marginBottom:"20px",height:"500px",overflowY:"scroll"}}>
          <UploadBulkToS3  />
          </div>

          <Button
            type="primary"
            onClick={() =>
              history.push({
                pathname: "/AddCandidates",
                state: { fresher: false },
              })
            }
          >
            Add Manually
          </Button>
        </Modal>
      </Card>
    </>
  );
}

export default ExpCandidatesList;
