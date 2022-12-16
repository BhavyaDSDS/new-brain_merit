import React, { useState, useCallback } from "react";
import { Button, Modal, Form, Col, Row, Typography, Tag } from "antd";
import FormBuilder from "antd-form-builder";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import DotSeparator from "../../../../components/utils/DotSeparator";
import { FRESHER } from "../../../../../constants";
import SkillsView from "../../../../components/view/SkillsView";

const { Text, Title } = Typography;

function CandidateHeadLineCard() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [setModalVisible]);
  const [pending, setPending] = useState(false);
  const [formEditable, setFormEditable] = useState(true);
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );

  const rolesList = useSelector((state) => state.utils.roleList);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const skillsList = useSelector((state) => state.utils.skillsList);

  var roleList;
  if (objectLength(rolesList) > 0) {
    roleList = rolesList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var locations;
  if (objectLength(locationsList) > 0) {
    locations = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  var skillList;
  if (objectLength(skillsList) > 0) {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  let roleName;
  if (candidateDetails.current_role != null) {
    roleName = roleList.find((o) => o.value === candidateDetails.current_role);
  }

  let locName;
  if (candidateDetails.current_location != null) {
    locName = locations.find(
      (o) => o.value === candidateDetails.current_location
    );
  }
  const dispatch = useDispatch();

  // let headline_empty = false;
  // const handleFinish = useCallback(
  //   (values) => {
  //     console.log("submit values before: ", values);
  //     const data = [values, candidateDetails.candidateDetails.candidateDetails.candidateDetails.candidateDetails.id];
  //     dispatch(updateCandidate(data));
  //     hideModal();
  //   },
  //   [setPending, hideModal, candidateDetails.candidateDetails.candidateDetails.candidateDetails.candidateDetails.id]
  // );

  // function onEditClick() {
  //   form.setFieldsValue({
  //     headline: candidateDetails.headline,
  //   });
  //   showModal();
  // }

  // const meta = {
  //   fields: [{ key: "headline", widget: "textarea" }],
  // };

  // if (candidateDetails.headline === null) {
  //   headline_empty = true;
  // }

  return (
    <>
        {candidateDetails && (
          <div style={{ display: "flex", gap: 4, marginBottom: "12px" }}>
            {candidateDetails.fresher == true && (
              <div>
              <Text type="primary">
                 {FRESHER}
              </Text>
            </div>
            )}
            {candidateDetails.fresher != true && candidateDetails.total_experience != undefined && (
              <div>
                <Text type="primary">
                  {candidateDetails.total_experience} yrs
                </Text>
              </div>
            )}

            {roleName != undefined && candidateDetails.total_experience != undefined && (
              <div>
              <DotSeparator />
              </div>
            )}

            {roleName != undefined && (
              <div>
                <Text type="secondary">{roleName.label}</Text>
              </div>
            )}

            {(roleName != undefined || candidateDetails.total_experience != undefined) && locName != undefined && (      
              <div>      
            <DotSeparator/>
            </div>
            )}

            {candidateDetails.fresher == true && locName != undefined &&(
            <DotSeparator/>  
            )}

            {locName != undefined && (
              <div>
                <Text type="secondary">{locName.label}</Text>
              </div>
            )}
          </div>
        )}
        {objectLength(candidateDetails.p_tech_skills) > 0 && (
        <SkillsView skillset={candidateDetails.p_tech_skills} 
                    skillType={"p_tech_skills"}/>
        )}
{/* 
      {!headline_empty && (
        <div>
          <Title level={5}>{candidateDetails.headline}</Title>
        </div>
      )}

      {!headline_empty && formEditable && (
        <Button type="link" onClick={showModal} style={{ paddingLeft: 0 }}>
          Add headline
        </Button>
      )}
      <Modal
        closable={!pending}
        maskClosable={!pending}
        visible={modalVisible}
        destroyOnClose={true}
        onOk={() => form.submit()}
        onCancel={() => {
          hideModal();
        }}
        okText={pending ? "Loading..." : "Save"}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
        width={500}
        title="Add headline"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          // style={{ width: "700px" }}
        >
          <FormBuilder meta={meta} form={form} />
        </Form>
      </Modal> */}
    </>
  );
}
export default CandidateHeadLineCard;
