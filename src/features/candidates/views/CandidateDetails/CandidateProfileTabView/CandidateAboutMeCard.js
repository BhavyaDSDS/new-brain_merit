import React, { useState, useCallback } from "react";
import { Button, Modal, Form, Col, Row, Typography} from "antd";
import FormBuilder from "antd-form-builder";
import { useSelector, useDispatch } from "react-redux";
import {  updateCandidate, setRefreshCandList } from "../../../candidateSlice";

const { Text, Title } = Typography;

function CandidateAboutMeCard() {  
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
    const hideModal = useCallback(() => setModalVisible(false), [setModalVisible]);
    const [pending, setPending] = useState(false);
    const [formEditable, setFormEditable] = useState(true);
    const candidateDetails = useSelector((state) => state.candidate.candidateDetail);
    const dispatch = useDispatch();

    let about_me_empty= false;

    const handleFinish = useCallback(
        (values) => {
            console.log("submit values before: ", values);
            const data=[values,candidateDetails.id];   
            dispatch(updateCandidate(data));
            hideModal();
            dispatch(setRefreshCandList());
        },
        [setPending, hideModal, candidateDetails.id]
    );
    function onEditClick() {
        form.setFieldsValue({
            'about_me': candidateDetails.about_me,
        })
        showModal();
    }
    const meta = {
        fields: [
            { key: "about_me", label: "About Me", widget: 'textarea' },

        ],
    };

    if(candidateDetails.about_me === null)
    {
        about_me_empty= true;
    }

    return (
        <>
        <Row>
        <Col span={12}>
          <Title level={5}>About</Title>
        </Col>

        {!about_me_empty && formEditable &&(
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

        {/* About Me display */}
        {!about_me_empty && (
        <div>
        {candidateDetails.about_me}
        </div>
        )}


      {about_me_empty && formEditable &&
                (<Button onClick={showModal}>
                    Add About
                </Button>)
      }


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
        width={500} >
        <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            style={{ width: "700px" }}
        >
            <FormBuilder meta={meta} form={form} />
        </Form>
    </Modal>

    </>
    );
}
export default  CandidateAboutMeCard;