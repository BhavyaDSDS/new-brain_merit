import React from "react";
import { Card, Button, Typography, Col, Popconfirm, Row,Menu,Dropdown } from "antd";
import { useSelector } from "react-redux";
import { objectLength } from "../../components/utils/JavaScriptUtils";
import { CheckSquareTwoTone,DeleteOutlined, MoreOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function LocationCard(props) {
  const { EmployerListInfo, onEditClick } = props;

  const locationsList = useSelector((state) => state.utils.locationsList);

  var cityOptions;
  if (JSON.stringify(locationsList) !== "{}") {
    cityOptions = locationsList.map(function (obj) {
      return {
        label: obj.city,
        value: obj.id,
        state: obj.state,
        country: obj.country,
      };
    });
  }

  console.log("From Location Card = ", EmployerListInfo);

  return (
    <div>
      {objectLength(EmployerListInfo) > 0 &&
        EmployerListInfo.map((listData, index) => {
          let location = cityOptions.find(
            (o) => o.value === listData.location_id
          );
          const checked = listData.primary;

          const confirm = () => {
            // onDelete(listData.id);
            
          };

          const menu = (
            <Popconfirm
              title="Are you sure, do you want to delete？"
              okText="Delete"
              okType="danger"
              cancelText="No"
              onConfirm={confirm}
            >
              <Menu
                items={[
                  {
                    label: "Delete",
                    key: "1",
                    icon: <DeleteOutlined />,
                  },
                ]}
              />
            </Popconfirm>
          );

          return (
            <Card style={{ margin: "16px" }}>
              <Row>
                <Col span={20}>
                  <Title level={5}>{listData.location_name}</Title>
                  <div>
                    <Text type="secondary" style={{ fontSize: "100%" }}>
                      {listData.address != undefined && listData.address}
                    </Text>
                  </div>
                  <div style={{ display: "flex", gap: 15 }}>
                    {location != undefined && (
                      <>
                        <p>{location.label}</p>
                        <p>{location.state}</p>
                        <p>{location.country}</p>
                      </>
                    )}
                  </div>
                  {checked && (
                    <Text>
                      <CheckSquareTwoTone /> Marked as primary location
                    </Text>
                  )}
                </Col>
                <Col span={3}>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      onEditClick(index);
                    }}
                    style={{ float: "right" }}
                  >
                    Edit
                  </Button>
                </Col>
                <Col span={1}>
                        <Dropdown overlay={menu} placement="bottom">
                          <MoreOutlined />
                        </Dropdown>
                      </Col>
              </Row>
            </Card>
          );
        })}
    </div>
  );
}

export default LocationCard;
