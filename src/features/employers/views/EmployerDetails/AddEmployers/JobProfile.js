import React, { useState, useCallback, useEffect } from "react";
import {
  Form,
  Button,
  Modal,
  Checkbox,
  Row,
  Col,
  Space,
  Card,
  Popover,
  Popconfirm,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormBuilder from "antd-form-builder";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  updateEmployer,
  addLocation,
  updateLocation,setRefreshEmployerList
} from "../../../employerSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import LocationCard from "../../../../components/card/LocationCard";
const { confirm } = Modal;

// const MOCK_INFO = {
//   country: "",
//   address: "",
//   city: "",
//   state: "",
//   primary: false,
// };

function JobProfile(props) {
  const { empId } = props;
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  //Checking Primary location is true
  // const [isPrimarySet, setIsPrimarySet] = useState(false);
  // const [checked,setChecked] = useState(false)
  const [formBuilderInfo, setformBuilderInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonState, setbuttonState] = useState(0);
  const [idState, setidState] = useState(0);
  const [newRecord, setNewRecord] = useState(true);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);
  
  const [pending, setPending] = useState(false);

  const EmployerList = useSelector((state) => state.employer.listLocations);

  const locationsList = useSelector((state) => state.utils.locationsList);
  const history = useHistory();
  var cityOptions;
  if (objectLength(locationsList) > 0) {
    cityOptions = locationsList.map(function (obj) {
      return { label: obj.city, value: obj.id };
    });
  }

  const dispatch = useDispatch();

  const handleFinish = useCallback((values) => {
    console.log("From jobProfile data =", values);
    console.log("data = " + JSON.stringify(values));
    const data = [values, empId];
   // history.push("/expCandidateList")

    dispatch(updateEmployer(data));
    dispatch(setRefreshEmployerList());
            history.push("/employers");
          // history("/employers")  


   // console.log("setRefreshEmployerList() called");
  }, []);

  function resetFormFields() {
    setformBuilderInfo();
    form1.resetFields();
  }

  //Checking Primary location is true
  // useEffect(() => {
  //   if (JSON.stringify(EmployerList) !== []) {
  //     EmployerList.map((data) => {
  //       if (data.primary) {
  //         setIsPrimarySet(true);
  //       }
  //     });
  //   }
  // }, []);

  //location address submit
  const LocationSubmit = useCallback(
    (values) => {
      console.log("checking switch==", values);
      var locationInfo = Object.assign([], EmployerList);

      if (objectLength(EmployerList) === 0 || buttonState === 1) {
        locationInfo[0] = values;
        //Checking Primary location is true
        // setIsPrimarySet(values.primary);
      } else if (objectLength(EmployerList) === 1 || buttonState === 2) {
        locationInfo[1] = values;
      } else if (objectLength(EmployerList) === 2 || buttonState === 3) {
        locationInfo[2] = values;
      } else if (objectLength(EmployerList) === 3 || buttonState === 4) {
        locationInfo[3] = values;
      } else if (objectLength(EmployerList) === 4 || buttonState === 5) {
        locationInfo[4] = values;
      } else if (objectLength(EmployerList) === 5 || buttonState === 6) {
        locationInfo[5] = values;
      }

      hideModal();

      values.employer = empId;

      //Checking Primary location is true
      // if (!isPrimarySet) {
      //   setIsPrimarySet(values.primary);
      // }

      if (newRecord) {
        dispatch(addLocation(values));
        dispatch(setRefreshEmployerList());
      } else {
        const data = [values, idState];
        dispatch(updateLocation(data));
        dispatch(setRefreshEmployerList());
      }
      console.log("setRefreshEmployerList() called");
      resetFormFields();
    },
    [setPending, hideModal, buttonState, newRecord]
  );

  function onEditClick(empId) {
    setNewRecord(false);
    // console.log("card number = ", empId);
    // console.log("new record  onEditClick status =", newRecord);
    form1.resetFields();
    setbuttonState(empId + 1);
    setidState(EmployerList[empId].id);

    form1.setFieldsValue({
      location_id: EmployerList[empId].location_id,
      address: EmployerList[empId].address,
      location_name: EmployerList[empId].location_name,
      primary: EmployerList[empId].primary,
    });

    //Checking Primary location is true
    // if (formInfo.primary) {
    //   setIsPrimarySet(false);
    // }

    showModal();
  }

  const meta = {
    formItemLayout: null,
    columns: 2,
    fields: [
      {
        key: "work_type",
        label: "Work type",
        widget: "select",
        required: false,
        options: ["On-site", "Hybrid", "Remote"],
        widgetProps: { style: { width: "80%" }, allowClear: true },
        colSpan: 2,
      },

      {
        key: "specialities",
        label: "Specialities",
        required: false,
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
      {
        key: "url",
        label: "Profile URL",
        required: false,
        rules: { type: "url", warningOnly: true },
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
    ],
  };

  //Popup form builder
  const meta1 = {
    columns: 2,
    formItemLayout: null,
    disabled: pending,
    fields: [
      {
        key: "location_name",
        label: "Location name",
        required: true,
        colSpan: 2,
      },

      {
        key: "address",
        label: "Address",
        required: false,
        widget: "textarea",
        colSpan: 2,
      },
      {
        key: "location_id",
        label: "City",
        widget: "select",
        options: cityOptions,
        required: true,
        colSpan: 2,
        widgetProps: {
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
          // mode: "multiple",
        },
      },
      // {
      //   key: "state",
      //   label: "State/Province",
      //   // widget: "select",
      //   // options: ["Karnataka", "Chanai", "Tamilnadu"],
      //   required: true,
      //   colSpan: 2,
      // },
      // // { key: "zipcode", label: "Zip/Postal code", required: true },
      // {
      //   key: "country",
      //   label: "Country/Region",
      //   // widget: "select",
      //   // options: ["India", "USA", "China"],
      //   required: true,
      //   colSpan: 2,
      // },
    ],
  };


  const showConfirm = (data) => {
    confirm({
      title:`Primary location has already been set as "${data.location_name}". Are you sure that you want to change the selected location?`,
      onOk() {
        console.log('OK');
        form1.setFieldsValue({
          primary: true
        })
      },
      onCancel() {
        console.log('Cancel');
        form1.setFieldsValue({
          primary: false
        })
      },
    });
  };

  const checkIsPrimary = () => {
   
    objectLength(EmployerList) > 0 && EmployerList.map((cur,idx) => {
        if(cur.primary === true){
          console.log("zzz",cur);
          showConfirm(cur)
        }
    })
    
  };



  return (
    <div>
      <Card>
        <Row>
          <Col span={14}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
              <FormBuilder meta={meta} form={form} />

              {objectLength(EmployerList) === 0 && (
                <Form.Item label="Location">
                  <Button
                    type="dashed"
                    onClick={showModal}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "80%" }}
                    htmlType="button"
                  >
                    Location
                  </Button>
                </Form.Item>
              )}

              {objectLength(EmployerList) > 0 &&
                objectLength(EmployerList) < 5 && (
                  <Form.Item label="Location">
                    <Button
                      type="dashed"
                      onClick={() => {
                        showModal();
                        setbuttonState(0);
                        resetFormFields();
                        setNewRecord(true);
                      }}
                      block
                      icon={<PlusOutlined />}
                      style={{ width: "80%" }}
                      htmlType="button"
                    >
                      Add Location
                    </Button>
                  </Form.Item>
                )}

              <Form.Item>
                {objectLength(EmployerList) > 0 && (
                  <LocationCard
                    EmployerListInfo={EmployerList}
                    onEditClick={onEditClick}
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Form>

            {/* --------Popup Form----------- */}

            <Modal
              title="Add Location"
              closable={!pending}
              maskClosable={!pending}
              visible={modalVisible}
              destroyOnClose={true}
              onOk={() => form1.submit()}
              onCancel={() => {
                setNewRecord(true);
                hideModal();
                resetFormFields();
              }}
              okText={pending ? "Loading..." : "Save"}
              okButtonProps={{ loading: pending, disabled: pending }}
              cancelButtonProps={{ disabled: pending }}
            >
              <Form
                form={form1}
                layout="vertical"
                onFinish={LocationSubmit}
                initialValues={
                  {
                    primary: false,
                  }
                }
              >
                <FormBuilder
                  meta={meta1}
                  form={form1}
                  initialValues={formBuilderInfo}
                />

                <Form.Item name="primary" valuePropName="checked">
                    <Checkbox 
                    // disabled={isPrimarySet ? true : false}
                    
                    onChange={checkIsPrimary}
                    >
                      Make my primary location
                    </Checkbox>
                  </Form.Item>

              </Form>
            </Modal>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default JobProfile;
