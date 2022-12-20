import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Space,
  InputNumber,
  Typography,
  Modal,
} from "antd";
import CloudinaryUploadWidget from "../../utils/CloudinaryUploadWidget";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormBuilder from "antd-form-builder";
import en from "world_countries_lists/data/countries/en/world.json";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import { objectLength } from "../../utils/JavaScriptUtils";
import moment from "moment";
const { Title, Text } = Typography;

function EmployerPrimaryInfoForm(props) {
  const {
    editableForm,
    employerDetails,
    onFinishEmpPrimInfo,
    onModalCancel,
  } = props;
  const [empId, setEmpId] = useState(0);
  const [logo, setLogo] = useState(null);
  // const [value, setValue] = useState({ code: 91, phone: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), [setModalVisible]);
  const hideModal = useCallback(() => setModalVisible(false), [
    setModalVisible,
  ]);

  const domainList = useSelector((state) => state.utils.domainList);
  const techLang = useSelector((state) => state.utils.skillsList);
  const locationsList = useSelector((state) => state.utils.locationsList);

  let domains;
  if (objectLength(domainList) > 0) {
    domains = domainList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  let techLangName;
  if (objectLength(techLang) > 0) {
    techLangName = techLang.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var cityOptions;
  if (objectLength(locationsList) > 0) {
    cityOptions = locationsList.map(function (obj) {
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
        key: "name",
        label: "Brand Name",
        required: true,
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
      {
        key: "business_entity",
        label: "Business entity",
        required: true,
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
      {
        key: "tagline",
        label: "Tag Line",
        required: false,
        widgetProps: { style: { width: "80%" } },
        widget: "textarea",
        colSpan: 2,
      },
      {
        key: "description",
        label: "Description",
        required: false,
        widgetProps: { style: { width: "80%" } },
        widget: "textarea",
        colSpan: 2,
      },
      {
        key: "company_size",
        label: "Company size",
        widget: "select",
        required: false,
        options: [
          "0-1 employees",
          "2-10 employees",
          "11-50 employees",
          "51-200 employees",
          "201-500 employees",
          "501-1,000 employees",
          "1,001-5,000 employees",
          "5,001-10,000 employees",
          "10,001+ employees ",
        ],
        widgetProps: { style: { width: "80%" }, allowClear: true },
        colSpan: 2,
      },
      {
        key: "company_type",
        label: "Company type",
        widget: "select",
        required: false,
        options: [
          "Educational",
          "Government Agency",
          "Non Profit",
          "Partnership",
          "Privately Held",
          "Public Company",
          "Self Employed",
          "Self Owned",
        ],
        widgetProps: {
          style: { width: "80%" },
          allowClear: true,
          showSearch: true,
          optionFilterProp: "children",
        },
        colSpan: 2,
      },

      {
        key: "year_founded",
        label: "Year founded",
        required: false,
        widgetProps: { style: { width: "80%" } },
        // colSpan: 2,
        widget: "date-picker",
        widgetProps: {
          picker: "year",
          disabledDate: cur => {
            return cur && cur > moment().endOf("day")
          }
        },

      },
      {
        key: "domain",
        label: "Industry / Sector",
        widget: "select",
        required: false,
        colSpan: 2,
        placeholder: "Select",
        options: domains,
        widgetProps: {
          style: { width: "80%" },
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
        },
      },
      {
        key: "technologies",
        label: "Technologies used",
        widget: "select",
        required: false,
        colSpan: 2,
        placeholder: "Select",
        options: techLangName,
        widgetProps: {
          style: { width: "80%" },
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
          mode: "multiple",
        },
      },
      {
        key: "b2x",
        label: "B2X",
        widget: "select",
        required: false,
        colSpan: 2,
        placeholder: "Select",
        options: ["B2B", "B2C", "B2B2C", "D2C"],
        widgetProps: {
          style: { width: "80%" },
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
          // mode: "multiple",
        },
      },
      {
        key: "website",
        label: "Website",
        required: false,
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
      {
        key: "email",
        label: "Email",
        required: false,
        widgetProps: { style: { width: "80%" } },
        colSpan: 2,
      },
    ],
  };

  const meta1 = {
    formItemLayout: null,
    columns: 2,
    fields: [
      {
        key: "work_type",
        label: "Work type",
        widget: "select",
        required: false,
        options: ["On-site", "Hybrid", "Remote"],
        widgetProps: { style: { width: "80%" },allowClear: true, },
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
      {
        key: "location_id",
        label: "City",
        widget: "select",
        options: cityOptions,
        required: false,
        colSpan: 2,
        widgetProps: {
          style: { width: "80%" },
          showSearch: true,
          optionFilterProp: "children",
          allowClear: true,
          // mode: "multiple",
        },
      },
    ],
  };

  const handleFinish = React.useCallback(
    (values) => {
      // console.log("phone number $$$$$$",value);
      // value.phone && (values.phone_number = "+" + value.code + value.phone);
      //values.phone_number = values.phone_number.phone;

      values.year_founded &&
        (values.year_founded = year_founded.value + "-01-01");
        
      values.logo = logo;

      console.log("before  ToTalFund *********#########********", values);
      // if(values.total_fund == null)
      // {

      // }

      // console.log("zzzb=", values.total_fund);

console.log("outside")
      if(values.total_fund != null && values.total_fund != undefined){
        if(values.total_fund_type === "M"){

             values.total_fund = values.total_fund * 1000000;
             console.log("Inside",values.total_fund_type,values.total_fund)

        } else if(values.total_fund_type === "B"){

          values.total_fund= values.total_fund * 1000000000;
          console.log("Inside",values.total_fund_type,values.total_fund)

        }else{

          values.total_fund = values.total_fund * 1000;
          console.log("Inside",values.total_fund_type,values.total_fund)

        }

      }
      
      // console.log("zzza=", values.total_fund);
    

      // console.log("emp primary info &&&&=", values);
      // console.log("emp primary info =", JSON.stringify(values));

     let valuesCopy = _.cloneDeep(values);
     onFinishEmpPrimInfo(valuesCopy);
      hideModal();
    },
    [logo]
  );

  useEffect(() => {
    // console.log("@@@useEffect@@ and edit set ########", employerDetails);
    if (editableForm === true) {

      let loc
      if (objectLength(employerDetails.locations) > 0) {
        loc = employerDetails.locations[0].location_id;
      }

      setLogo(employerDetails.logo);

      console.log("Employerdetails Totalfund **********##############***********", employerDetails.total_fund)
      // let totalFound
      //  if(employerDetails.total_fund.number != null){

      //     if(employerDetails.total_fund.type === 'M'){
      //         totalFound = {
      //           type : employerDetails.total_fund.type,
      //           number : employerDetails.total_fund.number / 1000000
      //         }
      //     }
      //     else if(employerDetails.total_fund.type === 'B'){
      //       totalFound = {
      //         type : employerDetails.total_fund.type,
      //         number : employerDetails.total_fund.number / 1000000000
      //       }
      //     }
      //     else{
      //       totalFound = {
      //         type : employerDetails.total_fund.type,
      //         number : employerDetails.total_fund.number / 1000
      //       }
      //     }
      //  } else {
      //   totalFound = {
      //     type : employerDetails.total_fund.type,
      //     number : employerDetails.total_fund.number
      //   }
      //  }

console.log("zzzzzzzzzzzzz",employerDetails.total_fund);
      

let phonenumber;
phonenumber={ phone:employerDetails.phone_number.phone,code:employerDetails.phone_number.code, short:employerDetails.phone_number.short}


      // console.log("New total*********#################***********",new_total)

      // let total;
      //       console.log("In useEffect**************")
           // if(employerDetails.total_fund_type != null && employerDetails.total_fund_type==="K")
      // {
      //     //  total=employerDetails.total_fund.number/1000;
      //      total=1000;
      //      total={total_fund_type:employerDetails.total_fund_type,total_fund:employerDetails.total_fund/1000}
      // }
      //       else if(total_fund_type==="B")
      // {
      // // let  total= employerDetails.total_fund.number/1000000000;
      //  // total=1000000000;
      //   total={total_fund_type:employerDetails.total_fund_type,total_fund:employerDetails.total_fund/1000000000}

      // }
      // else{
      // // let total=employerDetails.total_fund.number/1000000;
      // total={total_fund_type:employerDetails.total_fund_type,total_fund:employerDetails.total_fund/1000000}

      // //total=1000000;
      // }

      console.log("EEEEEEEEEE ***********############******", employerDetails)
      form.setFieldsValue({

        logo: employerDetails.logo,
        name: employerDetails.name,
        b2x: employerDetails.b2x,
        company_size: employerDetails.company_size,
        company_type: employerDetails.company_type,
        description: employerDetails.description,
        domain: employerDetails.domain,
        email: employerDetails.email,
        phone_number:phonenumber,
        business_entity: employerDetails.business_entity,
        tagline: employerDetails.tagline,
        technologies: employerDetails.technologies,
        website: employerDetails.website,
        //total_fund: employerDetails.total_fund,
       // total_fund_type:employerDetails.total_fund_type,
       // year_founded: moment(employerDetails.year_founded),
        links: employerDetails.links,
        work_type: employerDetails.work_type,
        specialities: employerDetails.specialities,
        url: employerDetails.url,
        location_id: loc,
      });
       // }
       if (employerDetails.year_founded != null) {
        form.setFieldsValue({
          year_founded: moment(employerDetails.year_founded, "YYYY-MM-DD"),
        });
      }
      

      showModal();
    }
  },[]);

  function onWidgetUpload(url) {
    console.log(" onWidgetUpload image url ", url);
    setLogo(url);
    console.log("logo setted");
  }
  return (
    <>
      {!editableForm && (
        <Card>
          <Row>
            <Col span={12}>
              <ConfigProvider locale={en}>


                <Form
                  layout="vertical"
                  onFinish={handleFinish}
                  initialValues={{
                    
                    phone_number : { phone: "",code: 91, short: 'IN'},
                    total_fund_type:"M",
                  }}

               
                >
                  <Form.Item label="Company Logo" name="logo">
                    <CloudinaryUploadWidget
                      photo={logo}
                      onWidgetUpload={onWidgetUpload}
                      name="Upload logo"
                    />
                  </Form.Item>

                  <FormBuilder meta={newWizardMeta} form={form} />


                  {/* <Form.Item label="Phone Number" name="phone_number">
                    <CountryPhoneInput
                      value={value}
                      onChange={(v) => {
                        setValue(v);
                      }}
                      placeholder="Enter your Number"
                      maxLength={10}
                      style={{ width: 250, height: 35 }}
                    />
                  </Form.Item> */}
                  <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    style={{ width: "80%" }}
                    rules={[

                      {
                        validator(_, value) {
                          if (value.phone === "") {
                            return Promise.resolve();
                          } else {
                            if (value.phone.length === 10 && !value.phone.includes("e") && !value.phone.includes(".")) {
                              return Promise.resolve();
                            } else {
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



                  <Form.Item label="Links" style={{ marginBottom: "0px" }}>
                    <Form.List
                      name="links"
                      initialValue={[{ LinkType: "GitHub" }]}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 5,
                              }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "Link"]}
                                // style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: false,
                                    message: "Please input your link!",
                                  },
                                ]}
                              >
                                <Input
                                  addonBefore={
                                    <Form.Item name={[name, "LinkType"]} noStyle>
                                      <Select
                                        style={{
                                          width: "108px",
                                        }}
                                        defaultValue="GitHub"
                                      >
                                        <Option value="GitHub">GitHub</Option>
                                        <Option value="LinkedIn">LinkedIn</Option>
                                        <Option value="FaceBook">FaceBook</Option>
                                        <Option value="Twitter">Twitter</Option>
                                        <Option value="Instagram">
                                          Instagram
                                        </Option>
                                      </Select>
                                    </Form.Item>
                                  }
                                  style={{
                                    width: "550px",
                                  }}
                                />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(name);
                                }}
                              />
                            </Space>
                          ))}

                          <Form.Item style={{ marginTop: "0px" }}>
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                              }}
                              icon={<PlusOutlined />}
                            >
                              Add Links
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>

                <Form.Item
                  label="Total funding"
                  style={{ width: "80%", marginBottom: -26 }}
                >
                  <Input.Group compact>
                    <Form.Item
                      name="total_fund"
                      style={{ width: 120 }}
                    >
                      <InputNumber addonBefore="$" controls={false} />
                    </Form.Item>
                    <Form.Item name="total_fund_type" noStyle>
                      <Select allowClear defaultValue="M">
                        <Option value="M">M</Option>
                        <Option value="B">B</Option>
                        <Option value="K">K</Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                <Text type="secondary">eg:- $10.5M</Text>

                  <Form.Item wrapperCol={{ span: 18 }} style={{ paddingTop: 40 }}>
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
        <Modal
          maskClosable={false}
          visible={modalVisible}
          title={"Update Primary Info"}
          destroyOnClose={true}
          onOk={() => form.submit()}
          onCancel={() => {
            hideModal();
            onModalCancel();
          }}
          okText={"Save"}
          width={700}
        >
          <div
            style={{
              height: "65vh",
              paddingRight: "16px",
              overflowY: "auto",
            }}
          >
            <ConfigProvider locale={en}>
              <Form

                initialValues={{
                  phone_number
                    :
                    { phone: "", code: 91, short: 'IN' },
                    total_fund:{type:"M"}

                }}
                layout="vertical" onFinish={handleFinish} form={form}>

                <Form.Item label="Company Logo" name="logo">
                  <CloudinaryUploadWidget
                    photo={logo}
                    onWidgetUpload={onWidgetUpload}
                    name="Upload logo"
                  />
                </Form.Item>

                <FormBuilder meta={newWizardMeta} form={form} />


                <Form.Item
                  label="Phone Number"
                  name="phone_number"
                  style={{ width: "80%" }}
                  rules={[

                    {
                      validator(_, value) {
                        if (value.phone === "") {
                          return Promise.resolve();
                        } else {
                          if (value.phone.length === 10 && !value.phone.includes("e") && !value.phone.includes(".")) {
                            return Promise.resolve();
                          } else {
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
                {/* <Form.Item label="Phone Number">
                  <CountryPhoneInput
                    value={value}
                    onChange={(v) => {
                      setValue(v);
                    }}
                    placeholder="Enter your Number"
                    maxLength={10}
                    style={{ width: 250, height: 35 }}
                  />
                </Form.Item> */}


                <Form.Item label="Links" style={{ marginBottom: "0px" }}>
                  <Form.List name="links" initialValue={[{ LinkType: "GitHub" }]}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 5,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "Link"]}
                              // style={{ width: "100%" }}
                              rules={[
                                {
                                  required: false,
                                  message: "Please input your link!",
                                },
                              ]}
                            >
                              <Input
                                addonBefore={
                                  <Form.Item name={[name, "LinkType"]} noStyle>
                                    <Select
                                      style={{
                                        width: "108px",
                                      }}
                                      defaultValue="GitHub"
                                    >
                                      <Option value="GitHub">GitHub</Option>
                                      <Option value="LinkedIn">LinkedIn</Option>
                                      <Option value="FaceBook">FaceBook</Option>
                                      <Option value="Twitter">Twitter</Option>
                                      <Option value="Instagram">Instagram</Option>
                                    </Select>
                                  </Form.Item>
                                }
                                style={{
                                  width: "400px",
                                }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(name);
                              }}
                            />
                          </Space>
                        ))}

                        <Form.Item style={{ marginTop: "0px" }}>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            icon={<PlusOutlined />}
                          >
                            Add Links
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>

                <Form.Item
                  label="Total funding"
                  style={{ width: "80%", marginBottom: -26 }}
                >
                  <Input.Group compact>
                    <Form.Item
                      name={["total_fund", "number"]}
                      style={{ width: 120 }}
                    >
                      <InputNumber addonBefore="$" controls={false} />
                    </Form.Item>
                    <Form.Item name={["total_fund", "type"]} noStyle>
                      <Select allowClear >
                        <Option value="M">M</Option>
                        <Option value="B">B</Option>
                        <Option value="K">K</Option>
                      </Select>
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
                {/* <Text type="secondary">eg:- $10.5M</Text> */}
                <FormBuilder meta={meta1} form={form} />
              </Form>
            </ConfigProvider>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EmployerPrimaryInfoForm;
