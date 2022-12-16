import React, {useState} from "react";
import {
  Form,
  Button,
  DatePicker,
  Select,
  Input,
  Space,
} from "antd";
import _ from "lodash";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { MAX_URL_LINKS } from "../../../constants";
const { Option } = Select;


function PublicProfileLinksSelectForm(props) {
  const {set_no_of_links,no_of_links} = props;
  // const [no_of_links, set_no_of_links] = useState(1);
  return (
    <>
      {/* <Form.Item
        name="Link"
        label="Links"
        rules={[
        {
          type: 'url',
          warningOnly: true,
        },
        {
          type: 'string',
          min: 6,
        },
      ]}
      >
      <Input
        addonBefore={
          <Form.Item name="LinkType" noStyle>
          <Select
            style={{
              width: 100,
            }}
              
          >
            <Option value="GitHub">GitHub</Option>
            <Option value="LinkedIn">LinkedIn</Option>
          </Select>
        </Form.Item>            
        }
        style={{
          width: '100',
        }}
      />
      </Form.Item> */}

      <Form.Item label="Links">
        <Form.List
          name="links"
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
                  <Form.Item name={[name, "LinkType"]}
                        rules={[
                          {
                            required:true,
                            message:"Required type!"
                          },
                        ]}
                        >
                          <Select
                            style={{
                              width:"120px"
                            }}
                          >
                            <Option value="GitHub">GitHub</Option>
                            <Option value="LinkedIn">LinkedIn</Option>
                          </Select>
                        </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "Link"]}
                    
                    rules={[
                      {
                        type: 'url',
                        // warningOnly: true,
                        required:true,
                        message:"Required url!"
                      },
                    ]}
                    style={{
                      width: "235px",
                    }}
                  >
                    <Input
                     
                    />
                  </Form.Item>
                  {console.log("fields", fields)}
                 
                    <MinusCircleOutlined
                    style={{display:'inline-block',position:'relative',left:'5px'}}
                      onClick={() => {
                        remove(name);
                        set_no_of_links(no_of_links - 1);
                      }}
                    />
                  {/* </span> */}
                </Space>
              ))}

              {no_of_links < MAX_URL_LINKS && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      set_no_of_links(no_of_links + 1);
                    }}
                    icon={<PlusOutlined />}
                  ></Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Form.Item>
    </>
  );
}
export default PublicProfileLinksSelectForm;
