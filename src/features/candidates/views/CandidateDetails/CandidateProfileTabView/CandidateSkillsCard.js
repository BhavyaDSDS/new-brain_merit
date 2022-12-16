import React, { useState, useCallback, useEffect } from "react";
import { Button, Modal, Form, Typography, Row, Col, Space,Tag } from "antd";
import SkillsSelectForm from "../../../../components/form/SkillsSelectForm";
import SkillsView from "../../../../components/view/SkillsView";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate,setRefreshCandList } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import { PRIMARY_TECH_SKILLS } from "../../../../../constants";

const { Text, Title } = Typography;

function CandidateSkillsCard() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [formEditable, setFormEditable] = useState(true);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [pending, setPending] = useState(false);
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );
  const skillsList = useSelector((state) => state.utils.skillsList);
  const ntskillsList = useSelector((state) => state.utils.ntskillsList);

  var nonTechSkill
  if (JSON.stringify(ntskillsList) !== "{}") {
    nonTechSkill = ntskillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var skillList;
  if (JSON.stringify(skillsList) !== "{}") {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  const dispatch = useDispatch();

  const handleFinish = useCallback(
    (values) => {
      console.log("submit values before: ", values);

      const data = [values, candidateDetails.id];
      dispatch(updateCandidate(data));
      dispatch(setRefreshCandList());

      hideModal();
    },
    [setPending, hideModal, candidateDetails.id]
  );

  function onEditClick() {
    console.log("candidate Detail", candidateDetails);
    var p_tech_skill_array = [];
    var o_tech_skill_array = [];
    var non_tech_skill_array = [];

    candidateDetails.p_tech_skills.forEach((element) => {
      p_tech_skill_array.push(Number(element));
    });
    candidateDetails.o_tech_skills.forEach((element) => {
      o_tech_skill_array.push(Number(element));
    });
    candidateDetails.non_tech_skills.forEach((element) => {
      non_tech_skill_array.push(Number(element));
    });

    form.setFieldsValue({
      p_tech_skills: p_tech_skill_array,
      o_tech_skills: o_tech_skill_array,
      non_tech_skills: non_tech_skill_array,
    });

    showModal();
  }

  let skills_empty = false;
  if (
    objectLength(candidateDetails.p_tech_skills) === 0 &&
    objectLength(candidateDetails.o_tech_skills) === 0 &&
    objectLength(candidateDetails.non_tech_skills) === 0
  ) {
    skills_empty = true;
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Title level={5}>Skills</Title>
        </Col>
        {formEditable && !skills_empty && (
          <Col span={12}>
            <Button
              type="link"
              onClick={() => {
                onEditClick();
              }}
              style={{ float: "right", justifyContent: "flex-end" }}
            >
              Edit
            </Button>
          </Col>
        )}
      </Row>

      {skills_empty && formEditable && (
        <Button onClick={onEditClick}>Add skills</Button>
      )}

      {/* Skills adding form in modal to add the skills */}
      <Modal
        closable={!pending}
        maskClosable={false}
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
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          // style={{ width: "700px" }}
        >
          <SkillsSelectForm
            label={PRIMARY_TECH_SKILLS}
            name={"p_tech_skills"}
            required={true}
            multiselect={true}
            maxSixSkills={true}
          />

          <SkillsSelectForm
            label={"Secondary Technical Skills"}
            name={"o_tech_skills"}
            multiselect={true}
            maxSixSkills={true}
          />

          <SkillsSelectForm
            label={"Non Technical Skills"}
            name={"non_tech_skills"}
            multiselect={true}
            placementTop={true}
          />
        </Form>
      </Modal>

      {/* Skills display */}
      {!skills_empty && (
        <div>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            {candidateDetails.p_tech_skills.length > 0 && (
              <div>
                <Text>{PRIMARY_TECH_SKILLS}</Text>
                <div>
                  <SkillsView skillset={candidateDetails.p_tech_skills} 
                              skillType={"p_tech_skills"}/>
                </div>
              </div>
            )}
            {candidateDetails.o_tech_skills.length > 0 && (
              <div>
                <Text>Secondary Technical Skills</Text>
                <div>
                  <SkillsView skillset={candidateDetails.o_tech_skills} 
                              skillType={"o_tech_skills"}/>

                </div>
              </div>
            )}
            {candidateDetails.non_tech_skills.length > 0 && (
              <div>
                <Text>Non-Technical Skills</Text><br/>
                <div>
                  <SkillsView skillset={candidateDetails.non_tech_skills}
                              skillType={"non_tech_skills"} />
                </div>
              </div>
            )}
          </Space>
        </div>
      )}
    </>
  );
}
export default CandidateSkillsCard;
