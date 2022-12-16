import React, { useState, useCallback } from "react";
import { Form, Button, Modal, DatePicker, Row, Col, Space, Slider } from "antd";
import FormBuilder from "antd-form-builder";
import moment from "moment";
import AcademicInfoCard from "../../../../components/card/AcademicInfoCard";
import DefaultAddView from "../../../../components/view/DefaultAddView";
import { useSelector, useDispatch } from "react-redux";
import {
  addAcademicInfo,
  updateAcademicInfo,
  deleteAcademicInfo,
  setRefreshCandList,
} from "../../../candidateSlice";
import CollegeSelectForm from "../../../../components/form/CollegeSelectForm";
import DegreeSelectForm from "../../../../components/form/DegreeSelectForm";
import BranchSelectForm from "../../../../components/form/BranchSelectForm";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";

const { RangePicker } = DatePicker;
FormBuilder.defineWidget("range-picker", RangePicker);

const MOCK_INFO = {
  from_date: [moment(""), moment("")],
  score: "",
};

function CandidateAcademics() {
  const [form] = Form.useForm();
  const [formBuilderInfo, setformBuilderInfo] = useState();
  const [idState, setidState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [pending, setPending] = useState(false);
  const [newRecord, setNewRecord] = useState(true);
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );
  const academicList = useSelector((state) => state.candidate.listAcademicInfo);
  // console.log("academicList: " + JSON.stringify(academicList) + 'objectLength(academicList): ' + objectLength(academicList));
  const dispatch = useDispatch();
  console.log("candidateDetails:  " + JSON.stringify(candidateDetails));
  console.log("candidateDetails id:  " + candidateDetails.id);

  function resetFormFields() {
    setformBuilderInfo();
    form.resetFields();
  }

  const handleFinish = useCallback(
    (values) => {
      let temp = values.from_date[0].format("YYYY-MM-01");
      values.to_date = values.from_date[1].format("YYYY-MM-01");
      values.from_date = temp;

      console.log("academics values ======",values);
      /* Resetting to defaults for new addition */
      hideModal();

      // console.log("academicInfo: ", academicInfo);
      values.candidate = candidateDetails.id;

      console.log("submit values after: ", JSON.stringify(values));
      if (newRecord) {
        dispatch(addAcademicInfo(values));
      } else {
        const data = [values, idState];
        dispatch(updateAcademicInfo(data));
      }
      resetFormFields();
      setNewRecord(true);
      dispatch(setRefreshCandList());
    },
    [
      setPending,
      hideModal,
      academicList,
      newRecord,
      idState,
      candidateDetails,
    ]
  );

  const meta = {
    disabled: pending,
    fields: [
      {
        key: "from_date",
        label: "Timeline",
        widget: "range-picker",
        widgetProps: {
          picker: "month",
          style: { width: "100%" },
          placeholder: ["From", "To"],
        },
        required: true,
      },
    ],
  };

  function onEditClick(id) {
    setNewRecord(false);
    form.resetFields();
    setidState(academicList[id].id);
    var formInfo = MOCK_INFO;
    // console.log("onEditClick academicList[id]: " + JSON.stringify(academicList[id]));
    // formInfo.score = academicList[id].score;
    formInfo.from_date = [
      moment(academicList[id].from_date, "YYYY-MM"),
      moment(academicList[id].to_date, "YYYY-MM"),
    ];

    form.setFieldsValue({
      institute: academicList[id].institute,
      branch: academicList[id].branch,
      degree: academicList[id].degree,
      score:academicList[id].score
    });

    setformBuilderInfo(formInfo);
    showModal();
  }

  const onDelete = (id) => {
    dispatch(deleteAcademicInfo(id));
    // window.location.reload(false);
  };

  function onAddViewClick() {
    showModal();
    form.resetFields();
  }

  const percentage = (value) => `${value}%`
  const percMark = {0:'0',50:'50',60:'60',70:'70',80:'80',90:'90',100:'100'}

  return (
    <div>
      <Row>
        <Col span={24}>
          {/* This is invoked when there is data on the candidate academic information to add new academic info on the candidate */}
          {objectLength(academicList) > 0 && (
            <div style={{ margin: "0 16px 48px 0" }}>
              <Button
                type="dashed"
                onClick={() => {
                  resetFormFields();
                  showModal();
                }}
                style={{ float: "right" }}
              >
                Add Academics
              </Button>
            </div>
          )}

          {/*console.log("Academic Info length", objectLength(academicList))*/}

          {/* ACADEMIC INFO This is invoked when there is data on the candidate academic information but is in view mode */}
          {objectLength(academicList) > 0 && (
            <AcademicInfoCard
              AcademicInfo={academicList}
              onEditClick={onEditClick}
              onDelete={onDelete}
            />
          )}
        </Col>
      </Row>

      {/*console.log("formBuilderInfo", formBuilderInfo)*/}
      {/* This is invoked when there is no data on candidate academic information */}
      {objectLength(academicList) === 0 && (
        <DefaultAddView
          buttonName={"Add Academics"}
          onAddViewClick={onAddViewClick}
        />
      )}

      <Modal
        style={{ top: 0 }}
        title="Add academics"
        closable={!pending}
        maskClosable={false}
        visible={modalVisible}
        destroyOnClose={true}
        onOk={() => form.submit()}
        onCancel={() => {
          setNewRecord(true);
          hideModal();
          resetFormFields();
        }}
        okText={pending ? "Loading..." : "Save"}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical" initialValues={{
        score: 0,
      }}>
          <Space direction="vertical" style={{ width: "66%" }}>
            <CollegeSelectForm
              name={"institute"}
              label={"College"}
              required={true}
            />
            <DegreeSelectForm
              name={"degree"}
              label={"Degree"}
              required={true}
            />
            <BranchSelectForm
              name={"branch"}
              label={"Branch"}
              required={true}
            />
          </Space>
          <Form.Item 
            label="Cumulative Score (Percentage)" 
            name="score" 
            rules={[
              {
                required: true,
                message: 'Please input your Percentage!',
              },
            ]}
            >
              <Slider
                tipFormatter={percentage}
                marks={percMark}
                step={1}
                min={0}
                max={100}
                tooltip={{
                  open: true,
                }}
              />
            </Form.Item>
          <FormBuilder
            meta={meta}
            form={form}
            initialValues={formBuilderInfo}
          />
        </Form>
      </Modal>
    </div>
  );
}
export default CandidateAcademics;
