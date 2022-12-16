import React, { useState, useCallback, useEffect } from "react";
import { Form, Button, Modal, Row, Col } from "antd";
import FormBuilder from "antd-form-builder";
import moment from "moment";
import ProjectInfoCard from "../../../../components/card/ProjectInfoCard";
import DefaultAddView from "../../../../components/view/DefaultAddView";
import { useSelector, useDispatch } from "react-redux";
import { addProject, updateProject,deleteProject,setRefreshCandList } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";

function CandidateProjects() {
  const [form] = Form.useForm();
  const forceUpdate = FormBuilder.useForceUpdate();
  const [formBuilderInfo, setformBuilderInfo] = useState();
  const [newRecord, setNewRecord] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [idState, setidState] = useState(0);
  const [pending, setPending] = useState(false);
  const projectList = useSelector((state) => state.candidate.listProject);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const dispatch = useDispatch();
  const skillsList = useSelector((state) => state.utils.skillsList);
  const roleList = useSelector((state) => state.utils.roleList);
  const employerList = useSelector((state) => state.employer.listEmployers);
  const [addFields, setAddFields] = useState(false);
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );

  console.log(
    "candidateDetails.id************************:  " + candidateDetails.id
  );

  let projectType = ["Work Experience","Internship","College Project","Open Source Project",]

  candidateDetails.fresher ? projectType.shift():null

  var empOptions;
  if (objectLength(employerList) > 0) {
    empOptions = employerList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var JobRoleOptions;
  if (objectLength(roleList) > 0) {
    JobRoleOptions = roleList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var Locoptions;
  if (objectLength(locationsList) > 0) {
    Locoptions = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  var skillOptions;
  if (objectLength(skillsList) > 0) {
    skillOptions = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  

  const handleFinish = useCallback(
    (values) => {
      // console.log("submit values before: ", values);

      let temp = values.from_date[0].format("YYYY-MM-01")
      values.to_date = values.from_date[1].format("YYYY-MM-01")
      values.from_date = temp

      values.candidate = candidateDetails.id;

       console.log("submit values : ",JSON.stringify(values));

      if (newRecord) {
        dispatch(addProject(values));
      } else {
        const data = [values, idState];
        dispatch(updateProject(data));
      }

      form.resetFields();
      hideModal();
      setformBuilderInfo();
      setAddFields(false);
      setNewRecord(true);
      dispatch(setRefreshCandList());
      console.log(
        "submit values after *****************************: ",
        values
      );
    },
    [
      setPending,
      hideModal,
      projectList,
      newRecord,
      idState,
      candidateDetails,
    ]
  );

  const meta = [
    {
      key: "type",
      label: "Project Type",
      required: true,
      widget: "select",
      options: projectType,
    },
    { key: "name", label: "Project Name", required: true },
    {
      key: "description",
      label: "Project Description",
      widget: "textarea",
      required: true,
    },
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
    {
      key: "skills",
      label: "Skills (Max six skills)",
      widget: "select",
      
      placeholder: "Select",
      options: skillOptions,
      required: true,
      rules:[{
          validator(_, value){
                if(value.length <= 6){
                  return Promise.resolve();
                }else{
                  return Promise.reject(
                            new Error("You can select up to 6 skills!")
                          );
                }
          }
        
      }],
      
      widgetProps: { style: { width: "80%" }, mode: "multiple",showSearch:true, optionFilterProp:"children" },
    },
    {
      key: "link",
      label: "Web/Repo Link",
      required: false,
      rules: [
        {
          type: "url",
          warningOnly: true,
        },
        {
          type: "string",
          min: 6,
        },
      ],
    },
  ];

  // Push other input if choose others
  if (
    form.getFieldValue("type") === "Work Experience" ||
    form.getFieldValue("type") === "Internship" ||
    addFields === true
  ) {
    meta.push(
      // { key: "employer", label: "Employer Name", required: true },

      {
        key: "employer",
        label: "Employer Name",
        widget: "select",
        //colSpan: 2,
        placeholder: "Select",
        options: empOptions,
        required: true,
        widgetProps: { style: { width: "80%" },showSearch:true, optionFilterProp:"children" },
      },

      {
        key: "job_role",
        label: "Role/Title",
        widget: "select",
        //  colSpan: 2,
        placeholder: "Select",
        options: JobRoleOptions,
        required: true,
        widgetProps: { style: { width: "80%" },showSearch:true, optionFilterProp:"children" },
      },

      {
        key: "location",
        label: "Location",
        widget: "select",
        //  colSpan: 2,
        placeholder: "Select",
        options: Locoptions,
        widgetProps: { style: { width: "80%" },showSearch:true, optionFilterProp:"children" },
      }
    );
  }
  const MOCK_INFO = {
    name: "",
    description: "",
    from_date: [moment(""), moment("")],
  };

  function onEditClick(id) {
    var formInfo = MOCK_INFO;
    setNewRecord(false);
    form.resetFields();
    setidState(projectList[id].id);
    console.log("onEditClick projectList", projectList);
    let addFields_flag = true;

    if (projectList[id].type == "Work Experience" || projectList[id].type == "Internship") {
      setAddFields(true);
    } else {
      addFields_flag = false;
    } 

    if (addFields_flag === true) {
      formInfo.location = projectList[id].location;
      formInfo.job_role = projectList[id].job_role;
      formInfo.employer = projectList[id].employer;
    }
    formInfo.name = projectList[id].name;
    formInfo.description = projectList[id].description;
    formInfo.type = projectList[id].type;
    formInfo.from_date = [
      moment(projectList[id].from_date, "YYYY-MM"),
      moment(projectList[id].to_date, "YYYY-MM"),
    ];

    var skillsArray = [];
    projectList[id].skills.forEach((element) => {
      skillsArray.push(Number(element));
    });

    form.setFieldsValue({
      skills: skillsArray,
    });

    setformBuilderInfo(formInfo);
    // console.log("onEditClick formBuilderInfo", formInfo);
    showModal();
  }


  function onAddViewClick() {
    showModal();
    form.resetFields();
  }

  let addLabel = "Add Experience";
  if (candidateDetails.fresher === true) {
    addLabel = "Add Project";
  }

  function onDelete(id){
    // console.log("projectInfo id @@@@=",id);
    dispatch(deleteProject(id))
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          {/* This is invoked when there is data on the candidate Project information to add new Project info on the candidate */}
          {objectLength(projectList) > 0 && (
            <div style={{ margin: "0 16px 12px 0" }}>
              <Button
                type="dashed"
                onClick={() => {
                  form.resetFields();
                  showModal();
                  setformBuilderInfo();
                }}
                style={{ float: "right" }}
              >
                {addLabel}
              </Button>
              <br />
              <br />
            </div>
          )}

          {/* This is to show candidate information in view mode */}
          {objectLength(projectList) > 0 && (
            <ProjectInfoCard
              projectInfo={projectList}
              onEditClick={onEditClick}
              onDelete={onDelete}
            />
          )}
        </Col>
      </Row>

      {objectLength(projectList) === 0 && (
        <DefaultAddView buttonName={addLabel} onAddViewClick={onAddViewClick} />
      )}

      <Modal
        style={{ top: 0 }}
        title={addLabel}
        destroyOnClose={true}
        closable={!pending}
        maskClosable={false}
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setNewRecord(true);
          hideModal();
          form.resetFields();
          setAddFields(false);
          setformBuilderInfo();
        }}
        okText={pending ? "Loading..." : "Save"}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
      >
        {/* {console.log("meta =", meta)} */}

        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          onValuesChange={forceUpdate}
        >
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
export default CandidateProjects;
