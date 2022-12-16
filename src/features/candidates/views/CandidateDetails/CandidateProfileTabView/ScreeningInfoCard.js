import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  Form,
  Typography,
  Row,
  Col,
  Modal,
  Empty,
  Checkbox,
  Select,
} from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import CandidateScreening from "./CandidateScreening";
import CandidateScreeningComment from "../../../../components/form/CandidateScreeningComment";
import CandidateInterviewAvailability from "../../../../components/form/CandidateInterviewAvailability";
import { CANDIDATE_AVAILABLE_SLOTS } from "../../../../../constants";
import { updateCandidate, setRefreshCandList } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
const { Text, Title } = Typography;

function ScreeningInfoCard(props) {
  const { candidateKey } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );
  // console.log("screening comment ==",candidateDetails.screening_comments)
  // console.log("time slots ==",candidateDetails.availablity_for_interview)
  const [form] = Form.useForm();
  const [available_slot, setAvailable_slot] = useState(1);
  // const [screeningField,setScreenigField] = useState(false);
  const [screenComment, setScreenComment] = useState(false);
  const [screenSlot, setScreenSlot] = useState(false);

  const dispatch = useDispatch();

  const handleFinish = (values) => {


      console.log("values==",values);
      
     
      if (
        values.availablity_for_interview != undefined && values.availablity_for_interview.length >= 0
      ) {
        values.availablity_for_interview = values.availablity_for_interview.map((info) => {
          return {
            day: info.day.format("YYYY-MM-DD"),
            time: info.time.map((t) => {return t.format("HH:mm")}),
            type: "Available"
          }
        })
      } 
    

    const data = [values, candidateKey];
    dispatch(updateCandidate(data));
    hideModal();
    form.resetFields();
    dispatch(setRefreshCandList());
    console.log("values ===", values);
  };

  const onEdit = () => {
    showModal();
  
    let interviewSlot;
    if (candidateDetails.availablity_for_interview != null) {
      interviewSlot = candidateDetails.availablity_for_interview.map(
        (a, idx) => {
          return {
            day: moment(a.day,"YYYY-MM-DD"),
            time: a.time.map((b) => {
              return moment(b, "h:mm a");
            }),
            type: "Available"
          };
        }
      );
      setAvailable_slot(candidateDetails.availablity_for_interview.length);
    }

    form.setFieldsValue({
      screening_comments: candidateDetails.screening_comments,
      availablity_for_interview: interviewSlot,
    });
  };


    // function timeConverter(time){
    //     let num = time.split(":")
    //     let t;

    //       if(parseInt(num[0]) > 12){
    //         t = `${parseInt(num[0]) - 12}:${num[1]} pm`;
    //       }else if(parseInt(num[0]) === 12){
    //         t = `${parseInt(num[0])}:${num[1]} pm`;
    //       }else if(parseInt(num[0]) === 0){
    //         t = `${parseInt(num[0]) + 12}:${num[1]} am`;
    //       }else {
    //         t = `${parseInt(num[0])}:${num[1]} am`;
    //       }
    //       return t;
    // }

  return (
    <>
      <div>
        <Card style={{ margin: "0 16px 16px 0" }}>
          <Row>
            <Col span={22}>
              <Title level={5}>Screening Comments</Title>
              {(candidateDetails.screening_comments != null && candidateDetails.screening_comments != "") ?
                <>
                  <Text>{candidateDetails.screening_comments}</Text>
                  
                </> : <>
                  <Empty description={false} />
                  </>
              }
            </Col>
            <Col span={2}>
              <Button
                type="link"
                onClick={() => {
                  onEdit();
                  setScreenComment(true)
                  setScreenSlot(false)
                }}
              >
                Edit
              </Button>
            </Col>
          </Row>
        </Card>

        
          <Card style={{ margin: "0 16px 16px 0" }}>
            <Row>
              <Col span={22}>
                <Title level={5}>Interview Preferences</Title>

                {(candidateDetails.availablity_for_interview != null && objectLength(candidateDetails.availablity_for_interview) > 0) ?
                <div style={{ marginBottom: 16 }}>
                  <Text type="secondary">Interview Availability Slots</Text>
                  {candidateDetails.availablity_for_interview.map(
                    (info, idx) => {
                      return (
                        <Row>
                          <Col span={5}>
                            <Text key={idx}>{info.day}</Text>
                          </Col>
                          <Col span={1} />
                          <Col span={18}>
                            <Text>
                              {info.time[0]} - {info.time[1]}
                              {/* {timeConverter(info.time[0]) - timeConverter(info.time[1])} */}
                            </Text>
                          </Col>
                        </Row>
                      );
                    }
                  )}
                </div> : 
                    <>
                    <Empty description={false} />
                    </>
                }
              </Col>
              <Col span={2}>
                <Button
                  type="link"
                  onClick={() => {
                    onEdit();
                  setScreenComment(false)
                  setScreenSlot(true)
                  }}
                >
                  Edit
                </Button>
              </Col>
            </Row>
          </Card>
        
      </div>
      <Modal
        title="Screening Form"
        visible={modalVisible}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          hideModal();
          // form.resetFields();
        }}
        centered
        width={600}
        okText={"Save"}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          {screenComment && (
            <CandidateScreeningComment
              label="Screening Comments"
              name="screening_comments"
            />
          )}

          {screenSlot && (
            <CandidateInterviewAvailability
              label={CANDIDATE_AVAILABLE_SLOTS}
              name="availablity_for_interview"
              setAvailable_slot={setAvailable_slot}
              available_slot={available_slot}
            />
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ScreeningInfoCard;
