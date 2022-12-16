import React, { useState, useCallback, useEffect } from "react";
import { Card, Form, Button, Row, Col, Modal, Input } from "antd";
import FormBuilder from "antd-form-builder";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";
import PublicProfileLinksSelectForm from "./PublicProfileLinksSelectForm";
import {
  FORM_SINGLE_FIELD_COLUMN_SPAN,
  FIRST_NAME,
  LAST_NAME,
} from "../../../constants";
import en from "world_countries_lists/data/countries/en/world.json";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import { objectLength } from "../utils/JavaScriptUtils";

function CandidatePrimaryInfoForm(props) {
  const {
    candidateDetails,
    onFinishCandPrimInfo,
    editableForm,
    onModalCancel,
  } = props;
  // const [value, setValue] = useState({ code: 91, phone: "" });
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  const [pending, setPending] = useState(false);
  const [no_of_links, set_no_of_links] = useState(0);

  const locationsList = useSelector((state) => state.utils.locationsList);

  var locations;
  if (objectLength(locationsList) > 0) {
    locations = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }
  const [form] = Form.useForm();

  const newWizardMeta = {
    columns: 2,
    formItemLayout: null, // Must set this for inline layout
    // colon: true,

    fields: [

      {
        key: "email",
        label: "Email",
        rules: [{ type: "email", message: "Invalid email" }],
        required: true,
        colSpan: 2,
        widgetProps: { style: { width: "80%" } },
      },
      {
        key: "current_location",
        label: "Location",
        widget: "select",
        required: false,
        colSpan: 2,
        placeholder: "Select",
        options: locations,
        widgetProps: {
          style: { width: "80%" },
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
        },
      },
      //  {
      //     key: 'fresher',
      //     label: 'Experience type',
      //     widget: 'radio-group',
      //     forwardRef: true,
      //     required: true,
      //     options: [
      //       "Fresher",
      //       "Experienced",
      //     ],
      //   } ,
    ],
  };

  useEffect(() => {
    if (editableForm === true) {
      let fresher = "Fresher";
      if (candidateDetails.fresher !== true) {
        fresher = "Experienced";
      }

      if (candidateDetails.links != null) {
        set_no_of_links(candidateDetails.links.length);
      }

      setPhoto(candidateDetails.photo);
      // console.log("candidateDetails in useEffect: ",candidateDetails);
      form.setFieldsValue({
        first_name: candidateDetails.first_name,
        last_name: candidateDetails.last_name,
        contact_info: candidateDetails.contact_info,
        email: candidateDetails.email,
        current_location: candidateDetails.current_location,
        // 'fresher': fresher,
        photo: candidateDetails.photo,
        links: candidateDetails.links,
      });

      showModal();
    }
  }, []);

  const handleFinish = React.useCallback(
    (values) => {


      values.mobile = values.contact_info.phone

      let valuesCopy = _.cloneDeep(values);

      if (photo) {
        valuesCopy.photo = photo;
      }

      // console.log("PrimaryInfo Values ===", valuesCopy);
      console.log("form handle finish &&&&&++++++ =",valuesCopy)

      onFinishCandPrimInfo(valuesCopy);
      hideModal();
    },
    [photo, hideModal]
  );

  function onWidgetUpload(url) {
    console.log(" onWidgetUpload image url", url);
    setPhoto(url);
  }

  return (
    <>
      {!editableForm && (
        <Card>
          <Row>
            <Col span={FORM_SINGLE_FIELD_COLUMN_SPAN}>
            <ConfigProvider locale={en}>

              <Form
                onFinish={handleFinish}
                layout="vertical"
                initialValues={candidateDetails}
              >
                <Form.Item label="Profile photo" name="photo">
                  <CloudinaryUploadWidget
                    photo={photo}
                    onWidgetUpload={onWidgetUpload}
                    name="Upload Profile Image"
                  />
                </Form.Item>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      label={FIRST_NAME}
                      name="first_name"
                      style={{ width: "80%" }}
                      rules={[
                        {
                          required: true,
                          message: "'First Name' is required",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={LAST_NAME}
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "'Last Name' is required",
                        },
                      ]}
                      style={{ width: "80%" }}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                  <Form.Item
                    label="Phone Number"
                    name="contact_info"
                    style={{ width: "80%" }}
                    rules={[
                      { required: true},
                      {
                        validator(_,value){
                        if(value.phone === ""){
                          return Promise.reject(new Error("'Phone number' is Required!"));
                        }else{
                          if(value.phone.length === 10 && !value.phone.includes("e") && !value.phone.includes(".") ){
                            return Promise.resolve();
                          }else{
                            return Promise.reject(new Error('Please,Enter 10 digit Mobile Number!'));
                          }
                        }    
                        }
                      }
                    ]}
                  >
                    <CountryPhoneInput
                      // value={value}
                      // onChange={(v) => {
                      //   setValue(v);
                      // }}
                      placeholder="Enter your Number"
                      maxLength={10}
                      size="small"
                      type={"number"}
                      controls={false}
                    />
                  </Form.Item>

                <FormBuilder meta={newWizardMeta} form={form} />

                <Form.Item wrapperCol={{ span: 18 }}>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
              </ConfigProvider>

            </Col>
          </Row>
        </Card>
      )}
      {editableForm && (
        <>
          <Modal
            closable={!pending}
            maskClosable={!pending}
            visible={modalVisible}
            title={"Update Primary Info"}
            destroyOnClose={true}
            onOk={() => form.submit()}
            onCancel={() => {
              hideModal();
              onModalCancel();
            }}
            okText={pending ? "Loading..." : "Save"}
            okButtonProps={{ loading: pending, disabled: pending }}
            cancelButtonProps={{ disabled: pending }}
            width={500}
          >
            <ConfigProvider locale={en}>

            <Form
              onFinish={handleFinish}
              layout="vertical"
              initialValues={candidateDetails}
              form={form}
            >
              <Form.Item label="Profile photo" name="photo">
                <CloudinaryUploadWidget
                  photo={photo}
                  onWidgetUpload={onWidgetUpload}
                  name="Upload Profile Image"
                />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label={FIRST_NAME}
                    name="first_name"
                    style={{ width: "80%" }}
                    rules={[
                      {
                        required: true,
                        message: "'First Name' is required",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={LAST_NAME}
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "'Last Name' is required",
                      },
                    ]}
                    style={{ width: "80%" }}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

                <Form.Item
                      label="Phone Number"
                      name="contact_info"
                      style={{ width: "80%" }}
                      rules={[
                        { required: true},
                        {
                          validator(_,value){
                            if(value.phone !== null && value.phone !== undefined ) { 
                            if(value.phone.length < 10){
                              return Promise.reject(new Error('Please,Enter 10 digit Mobile Number!'));
                            }
                            return Promise.resolve();
                          }else{
                            return Promise.reject(new Error("'Phone number' is Required!"));
                          }
                          }
                        }
                      ]}
                    >
                      <CountryPhoneInput
                        // value={value}
                        // onChange={(v) => {
                        //   setValue(v);
                        // }}
                        placeholder="Enter your Number"
                        maxLength={10}
                        size="small"
                      />
                    </Form.Item>

              <FormBuilder meta={newWizardMeta} form={form} />

              <PublicProfileLinksSelectForm
                no_of_links={no_of_links}
                set_no_of_links={set_no_of_links}
              />
            </Form>
            </ConfigProvider>

          </Modal>
        </>
      )}
    </>
  );
}
export default CandidatePrimaryInfoForm;
