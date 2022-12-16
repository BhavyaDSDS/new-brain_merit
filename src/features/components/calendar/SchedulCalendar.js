import React, { useCallback, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Space,
  Typography,
  List,
  Col,
  Row,
  Checkbox,
  Card,
  Tag,
  Slider,
  Form,
  Modal,
} from "antd";
import { CheckSquareTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import VirtualList from "rc-virtual-list";
import { objectLength } from "../utils/JavaScriptUtils";
import SkillsView from "../view/SkillsView";
import DotSeparator from "../utils/DotSeparator";
import SkillsSelectForm from "../form/SkillsSelectForm";
import { CANDIDATE_MAX_EXP } from "../../../constants";
import WorkDomain from "../form/WorkDomain";
import moment from "moment";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";

const { Text, Title, Paragraph } = Typography;

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});



function SchedulCalendar(props) {
  const { candidateDetails } = props;

  let candidateSlot = [];
  const [candidateAvalSlot, setCandidateAvalSlot] = useState([]);
  // const [candidateSlot, setCandidateSlot] = useState([]);

  const [displaySlot, setDisplaySlot] = useState();
  const [checked, setChecked] = useState(0);


  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const [form] = Form.useForm();

  const interviewerList = useSelector((state) => state.interviewer.interviewerFilterList
  );

  console.log("sss interviewer filter list",interviewerList.availableslots);

  const rolesList = useSelector((state) => state.utils.roleList);
  const domainList = useSelector((state) => state.utils.candDomainList);

  var domain;
  if (JSON.stringify(domainList) !== "{}") {
    domain = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const ContainerHeight = 400;

  var roleList;
  if (objectLength(rolesList) > 0) {
    roleList = rolesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  let currentRole;
  candidateDetails.current_role != null &&
    (currentRole = roleList.find(
      (o) => o.value == candidateDetails.current_role
    ));

  const Expformatter = (value) => `${value} YRS`;
  const expMarks = {
    15: "15",
  };

  // console.log("out side of the function =",event)
  // console.log("Schedular data ====%%%%%%%++++++", interviewerList);

  

  useEffect(() => {

    let todayDate = new Date();
    candidateDetails.availablity_for_interview.length != 0 && 
    candidateDetails.availablity_for_interview.map((cur)=>{

      //spliting the start time and end time
      let date = cur.day.split('-')
      let startHour = cur.time[0].slice(0,2);
      let startMinute = cur.time[0].slice(3);
      let endHour = cur.time[1].slice(0,2);
      let endMinute = cur.time[1].slice(3);

     //add candidate free slots to calender 
      if(moment(todayDate).format("YYYY-MM-DD") <= cur.day){
        candidateSlot.push({
                  title: "Candidate Availability",
                  start: new Date(date[0], date[1]-1, date[2], startHour, startMinute, 0),
                  end: new Date(date[0], date[1]-1, date[2], endHour, endMinute, 0),
                  type: cur.type,
                });
      }
    // console.log("zzz calender a date =",date)


    })

      setCandidateAvalSlot(candidateSlot)


    return () => {
      setChecked(0);
       setCandidateAvalSlot([])
      console.log("zzz useEffect cleaning function working.....");
    };
  }, []);

 


  // let realCandidateSlot = candidateAvalSlot

  let interviewerSlot;


  function addSlots(slots) {

    console.log("zzz InterviewerSlots ==",slots)
  //   interviewerSlot = eventCreation(slots, "Interviewer availability");
  //   let event = [];
  //   let startTime;
  //   let endTime;
  //   let date;

  //   console.log("zzzz interview slots=", interviewerSlot);
  //   // console.log("zzzz candidate slots=", candidateSlot);

  //   //Looping the interviewerSlot
  //   // interviewerSlot != undefined &&
  //   //   interviewerSlot.map((inter) => {
  //   candidateSlot != undefined && candidateSlot.map((cand) => {
  //     let flag=false;
  //       //Looping the candidate slots
  //       // for (let cand of candidateSlot) {
  //       for (let inter of interviewerSlot) {
  //         //Checking date matching
  //         if (
  //           inter.start.toLocaleDateString() === cand.start.toLocaleDateString()
  //         ) {
  //           date = cand.start.toLocaleDateString();
  //           //Checking time overlapping
  //           if (
  //             (cand.start.getHours() <= inter.start.getHours() &&
  //               cand.end.getHours() >= inter.start.getHours()) ||
  //             (inter.start.getHours() <= cand.start.getHours() &&
  //               inter.end.getHours() >= cand.start.getHours())
  //           ) {
  //             // assigning matching time
  //             if (cand.start.getHours() <= inter.start.getHours()) {
  //               if (cand.end.getHours() <= inter.end.getHours()) {
  //                 (startTime = inter.start.getHours()),
  //                   (endTime = cand.end.getHours());
  //               } else {
  //                 (startTime = inter.start.getHours()),
  //                   (endTime = inter.end.getHours());
  //               }
  //             } else {
  //               if (cand.end.getHours() <= inter.end.getHours()) {
  //                 (startTime = cand.start.getHours()),
  //                   (endTime = cand.end.getHours());
  //               } else {
  //                 (startTime = cand.start.getHours()),
  //                   (endTime = inter.end.getHours());
  //               }
  //             }
      

  //             // pushing the matching data into the event array
  //             if (
  //               date != undefined &&
  //               startTime != undefined &&
  //               endTime != undefined
  //             ) {
  //               let splitDate = date.split("/");
  //               let d = splitDate[0];
  //               let m = splitDate[1] - 1;
  //               let y = splitDate[2];
  //               flag = true;
  //               event.push({
  //                 title: "Matching slot",
  //                 start: new Date(y, m, d, startTime, 0, 0),
  //                 end: new Date(y, m, d, endTime, 0, 0),
  //                 type: "Available",
  //               });
  //             }
              
  //           }
  //         }
  //       }
  //       if(!flag){
  //         console.log("This cand slot didn't match");
  //         event.push(cand);
  //       }
  //     });

  //   if (event.length >= 0) {
  //     setCandidateAvalSlot([...event]);
  //   }
    
  }

  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: "#0D4C92",
        },
      }),

      ...(event.title == "Matching slot" && {
        style: {
          backgroundColor: "#82CD47",
        },
      }),

      ...(event.title == "Candidate Availability" && {
        style: {
          backgroundColor: "#6ECCAF",
        },
      }),
    }),
    []
  );

  const onFinish = (values) => {
    console.log("Filters == ", values);
  };

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      if (title) {
        // setEvents((prev) => [...prev, { start, end, title }])
        setDisplaySlot((prev) => [...prev, { title, start, end }]);
      }

      console.log("I am new event ====", displaySlot);
    },
    [setDisplaySlot]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const dayPropGetter = useCallback(
    (event) => ({
      
      ...(event.title=="Matching slot" && {
        style: {
          backgroundColor: 'darkgreen',
          color: 'white',
        },
      }),
      
    }),[])

  return (
    <div>
      {/* {console.log(" out side Display slots **************() =",displaySlot)} */}

      <Row gutter={16}>
        <Col span={8}>
          <div>
            <Card bodyStyle={{ paddingBottom: "0px" }}>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <SkillsSelectForm
                  label={"Primary Skills"}
                  name={"prim_skills"}
                  multiselect={true}
                />
                <Form.Item label="Total Experience - YRS" name="total_exp">
                  <Slider
                    range
                    tipFormatter={Expformatter}
                    marks={expMarks}
                    step={0.5}
                    min={0}
                    // defaultValue={[5, 9]}
                    max={CANDIDATE_MAX_EXP}
                  />
                </Form.Item>

                <div style={{ marginTop: "-20px" }}>
                  <WorkDomain name="domain" multiselect={true} />
                </div>

                <Row>
                  <Col span={5}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Apply
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={19}>
                    <Form.Item>
                      <Button onClick={() => form.resetFields()}>Reset</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>

          <div style={{ marginTop: "10px" }}>
            <Card bodyStyle={{ paddingTop: "0px", paddingBottom: "0px" }}>
              <List>
                <VirtualList
                  data={interviewerList}
                  height={ContainerHeight}
                  itemHeight={47}
                >
                  {(item) => (
                    <List.Item
                      key={item.id}
                      rowKey={item.id}
                      // style={{padding:"0"}}
                    >
                      <Card
                        style={{ width: "380px" }}
                        hoverable
                        onClick={() => {
                          addSlots(item.availablity_for_interview);
                          setChecked(item.id);
                        }}
                        defaultActiveTabKey
                      >
                        <Row>
                          <Col span={23}>
                            {item.first_name != null && item.last_name && (
                              <Title level={5}>
                                {item.first_name} {item.last_name}
                              </Title>
                            )}
                            <div style={{ marginBottom: "5px" }}>
                              {item.total_exp != null && (
                                <Text style={{ marginRight: "5px" }}>
                                  {item.total_exp} yrs
                                </Text>
                              )}
                              <DotSeparator />

                              {objectLength(item.domains) >= 0 &&
                                item.domains.map((val) => {
                                  let domainName = domain.find(
                                    (o) => o.value == val
                                  );
                                  return (
                                    <>
                                      {domainName != undefined && (
                                        <Tag key={domainName.value}>
                                          {domainName.label}
                                        </Tag>
                                      )}
                                    </>
                                  );
                                })}
                            </div>
                            <div>
                              {item.relevant_experience != null && (
                                <Text style={{ marginRight: "10px" }}>
                                  {item.relevant_experience} yrs in
                                </Text>
                              )}

                              {objectLength(item.pri_tech_skills) > 0 && (
                                <SkillsView
                                  skillset={item.pri_tech_skills}
                                  skillType={"p_tech_skills"}
                                />
                              )}
                            </div>
                          </Col>
                          <Col span={1}>
                            {item.id === checked ? (
                              <CheckSquareTwoTone />
                            ) : null}
                            {/*   */}
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            </Card>
          </div>
        </Col>

        <Col span={16}>
          <Card>
            {candidateDetails.first_name != null &&
              candidateDetails.last_name != null && (
                <Title level={5}>
                  {candidateDetails.first_name} {candidateDetails.last_name}
                </Title>
              )}

            {objectLength(candidateDetails.p_tech_skills) > 0 && (
              <SkillsView
                skillset={candidateDetails.p_tech_skills}
                skillType={"p_tech_skills"}
              />
            )}

            {candidateDetails.screening != false &&
              candidateDetails.fresher != true &&
              (candidateDetails.total_experience > 0 ||
                candidateDetails.relevant_experience > 0 ||
                currentRole != undefined) && (
                <div style={{ marginBottom: 4 }}>
                  <div>
                    <Text type="secondary">Experience</Text>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {candidateDetails.total_experience > 0 && (
                        <div>
                          <Text strong>
                            {candidateDetails.total_experience} yrs
                          </Text>
                        </div>
                      )}
                      {candidateDetails.total_experience > 0 &&
                        currentRole != undefined && <DotSeparator />}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {currentRole != undefined && (
                          <Text strong>{currentRole.label}</Text>
                        )}
                        {currentRole != undefined &&
                          candidateDetails.relevant_experience > 0 && (
                            // <PipeSeparator />
                            <span>&nbsp; </span>
                          )}

                        {candidateDetails.relevant_experience > 0 &&
                          currentRole != undefined && (
                            <Text strong>
                              ({candidateDetails.relevant_experience} yrs)
                            </Text>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            <div>
              {objectLength(candidateDetails.preferred_roles) > 0 && (
                <div>
                  <Text type="secondary">Preferred Roles</Text> <br />
                  {objectLength(candidateDetails.preferred_roles) > 0 &&
                    candidateDetails.preferred_roles.map((txt, index) => {
                      let role = roleList.find((o) => o.value == txt);
                      return <Tag>{role.label}</Tag>;
                    })}
                </div>
              )}
            </div>
          </Card>
          <Card style={{ marginTop: "10px" }}>
            <Calendar
              localizer={localizer}
              events={candidateAvalSlot}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "500px", width: "95%", float: "right" }}
              eventPropGetter={eventPropGetter}
              selectable
              // onSelectEvent={handleSelectEvent}
              // onSelectSlot={handleSelectSlot}
              // dayPropGetter={dayPropGetter}
            />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Scheduale Interview"
        centered
        open={modalVisible}
        onCancel={() => hideModal()}
        width={400}
        // footer={[<Button onClick={() => filterSettingHide()}>Cancel</Button>]
      ></Modal>
    </div>
  );
}

export default SchedulCalendar;
