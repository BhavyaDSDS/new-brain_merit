import React, { useState, useCallback } from "react";
import {
  Form,
  Button,
  Modal,
  Empty,
  Card,
  DatePicker,
  Checkbox,
  Col,
  Row,
  Avatar,
  Typography,
} from "antd";
import FormBuilder from "antd-form-builder";
import { useSelector, useDispatch } from "react-redux";
import { BankOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function EmployerLocation() {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const locationsList = useSelector((state) => state.utils.locationsList);
  const countryCodeList = useSelector((state) => state.utils.countryCodeList);
  var cityOptions;
  var stateOptions;
  var CountryOptions;
  if (JSON.stringify(locationsList) !== "{}") {
    cityOptions = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }
  if (JSON.stringify(countryCodeList) !== "{}") {
    CountryOptions = countryCodeList.map(function (obj) {
      return { label: obj.name, value: obj.number };
    });
  }

  if (JSON.stringify(locationsList) !== "{}") {
    stateOptions = locationsList.map(function (obj) {
      return { label: obj.state, value: obj.id };
    });
  }

  const [pending, setPending] = useState(false);
  const handleFinish = useCallback(
    (values) => {
      setPending(true);
      console.log("submit: ", values);
      setTimeout(() => {
        setPending(false);
        Modal.success({
          title: "Success",
          content: "Submit success.",
          onOk: hideModal,
        });
      }, 2000);
    },
    [setPending, hideModal]
  );
  const locationArray = {
    totalElements: 0,
    fields: [],
  };
  const LocationInfo = (values) => {
    locationArray.content[locationArray.totalElements] = {
      countrys: values.countrys,
      address: values.address,
      city: values.city,
      state: values.state,
      // Zipcode: values.zipcode,
      location_name: location_name,
    };
    locationArray.totalElements++;
  };

  const meta = {
    columns: 2,
    formItemLayout: null,
    disabled: pending,
    fields: [
      {
        key: "countrys",
        label: "Country/Region",
        widget: "select",
        options: CountryOptions,
        required: true,
        colSpan: 2,
      },
      {
        key: "address",
        label: "Address",
        required: true,
        widget: "textarea",
        colSpan: 2,
      },
      {
        key: "city",
        label: "City",
        widget: "select",
        options: cityOptions,
        required: true,
        colSpan: 2,
      },
      {
        key: "state",
        label: "State/Province",
        widget: "select",
        options: stateOptions,
        required: true,
        colSpan: 2,
      },
      // { key: "zipcode", label: "Zip/Postal code", required: true },
      {
        key: "location_name",
        label: "Location name",
        required: true,
        colSpan: 2,
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button type="primary" onClick={showModal}>
          Add Location
        </Button>
      </div>
      <Modal
        title="Add Location info"
        closable={!pending}
        maskClosable={!pending}
        visible={modalVisible}
        destroyOnClose
        onOk={() => form.submit()}
        onCancel={hideModal}
        okText={pending ? "Loading..." : "Save"}
        okButtonProps={{ loading: pending, disabled: pending }}
        cancelButtonProps={{ disabled: pending }}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <FormBuilder meta={meta} form={form} />
          <Form.Item>
            <Checkbox>Make my primary location</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EmployerLocation;
