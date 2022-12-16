import React, { useState, useCallback, useEffect } from "react";
import { Button, Modal, Form, Typography, Row, Col, Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";
import RolesView from "../../../../components/view/RolesView";
import LocationsView from "../../../../components/view/LocationsView";
import { CheckOutlined } from "@ant-design/icons";
import DotSeparator from "../../../../components/utils/DotSeparator";
import PipeSeparator from "../../../../components/utils/PipeSeparator";

const { Text, Title } = Typography;

function CandidateJobPreferenceCard(props) {
  const { candidateDetails, fresher } = props;
  const rolesList = useSelector((state) => state.utils.roleList);
  const locationsList = useSelector((state) => state.utils.locationsList);
  const employer = useSelector((state) => state.employer.listEmployers);
  const institute = useSelector((state) => state.utils.instituteList);
  const degree = useSelector((state) => state.utils.degreesList);

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

  var employerName;
  if (objectLength(employer) > 0) {
    employerName = employer.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var instituteName;
  if (objectLength(institute) > 0) {
    instituteName = institute.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var DegreeName;
  if (objectLength(degree) > 0) {
    DegreeName = degree.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  //Experience----------------------------

  let currentRole;
  candidateDetails.current_role != null &&
    (currentRole = roleList.find(
      (o) => o.value == candidateDetails.current_role
    ));

  let CmpName;
  objectLength(candidateDetails.projects) > 0 && employerName != undefined &&
    (CmpName = employerName.find(
      (o) => o.value === candidateDetails.projects[0].employer
    ));

  let clgName;
  objectLength(candidateDetails.academics) > 0 &&
    (clgName = instituteName.find(
      (o) => o.value === candidateDetails.academics[0].institute
    ));

  let qualification;
  objectLength(candidateDetails.academics) > 0 &&
    (qualification = DegreeName.find(
      (o) => o.value === candidateDetails.academics[0].degree
    ));

  console.log("instute name ====", qualification);

  //CTC-----------------------------------
  let currentCtc;
  candidateDetails.current_ctc > 0 &&
    (currentCtc = candidateDetails.current_ctc / 100000);

  let offerCtc;
  candidateDetails.offer_in_hand_ctc > 0 &&
    (offerCtc = candidateDetails.offer_in_hand_ctc / 100000);

  let expCtc;
  candidateDetails.expected_ctc > 0 &&
    (expCtc = candidateDetails.expected_ctc / 100000);

  let status;
  let today = new Date().toISOString().slice(0, 10);

  if (today >= candidateDetails.date_of_joining) {
    status = "Immediate Available";
  } else {
    status = candidateDetails.date_of_joining;
  }

  return (
    <>
      {/* Experience */}
      {candidateDetails.screening != false &&
        fresher != true &&
        (candidateDetails.total_experience > 0 ||
          candidateDetails.relevant_experience > 0 ||
          currentRole != undefined) && (
          <div style={{ marginBottom: 4 }}>
            <div>
              <Text type="secondary">Experience</Text>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {candidateDetails.total_experience > 0 && (
                  <div>
                    <Text strong>{candidateDetails.total_experience} yrs</Text>
                  </div>
                )}
                {candidateDetails.total_experience > 0 &&
                  currentRole != undefined && <DotSeparator />}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {currentRole != undefined && (
                    <Text strong>{currentRole.label}</Text>
                  )}
                  {currentRole != undefined &&
                    candidateDetails.relevant_experience > 0 && (
                      // <PipeSeparator />
                      <span>&nbsp; </span>
                    )}

                  {candidateDetails.relevant_experience > 0 &&
                    currentRole != undefined && (
                      <Text strong>
                        ({candidateDetails.relevant_experience} yrs)
                      </Text>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* last/current company */}
      {fresher != true && CmpName != undefined && (
        <Row>
          <Col span={24}>
            <div style={{ marginBottom: 4 }}>
              <Text type="secondary">Last / Current Company</Text>
              <div>
                <Text>{CmpName.label}</Text>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* highest qualification */}
      {(clgName != undefined || qualification != undefined) && (
        <Row>
          <Col span={24}>
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary">Highest Education</Text>

              <div>
                <Text>{clgName != undefined && clgName.label}</Text>
              </div>
              <div>
                <Text>{qualification != undefined && qualification.label}</Text>
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* CTC */}
      {candidateDetails.screening === true && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">CTC</Text>
          <Row justify="space-evenly">
            {!fresher && <Col span={8}>
              <div>
                {currentCtc != undefined && fresher != true ? (
                  <Text strong>
                    <span>{currentCtc}</span> LPA
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 20 }}> - </Text>
                )}
                <div style={{ marginTop: "-8px" }}>
                  <Text type="secondary" style={{ fontSize: "90%" }}>
                    Current
                  </Text>
                </div>
              </div>
            </Col>}

            <Col span={10} justify="center">
              <div>
                {offerCtc != undefined ? (
                  <Text strong>
                    <span>{offerCtc}</span> LPA
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 35 }}> - </Text>
                )}
                <div style={{ marginTop: "-8px" }}>
                  <Text type="secondary" style={{ fontSize: "90%" }}>
                    Offer-in-hand
                  </Text>
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div>
                {expCtc != undefined ||
                candidateDetails.expected_ctc_as_per_company_standards !=
                  false ? (
                  <Text strong>
                    <span>
                      {candidateDetails.expected_ctc_as_per_company_standards
                        ? "Flexible"
                        : `${expCtc} LPA`}
                    </span>
                  </Text>
                ) : (
                  <Text style={{ marginLeft: 22 }}> - </Text>
                )}
                <div style={{ marginTop: "-8px" }}>
                  <Text type="secondary" style={{ fontSize: "90%" }}>
                    Expected
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}

      {/* Availability */}
      {candidateDetails.screening != false && fresher != true && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">Availability</Text>
          <Row>
            <Col span={24}>
              <div style={{ display: "flex", gap: 4 }}>
                <div>
                  <Text strong>
                    {candidateDetails.resigned ? "Resigned" : "Not resigned"}
                  </Text>
                </div>

                {(candidateDetails.date_of_joining != null ||
                  candidateDetails.notice_period > 0 ||
                  candidateDetails.exit_type != null) && <div> <DotSeparator /></div>}

                <div>
                  {candidateDetails.resigned ? (
                    <>
                      {/* <Text strong>{candidateDetails.date_of_joining}</Text> */}
                      <Text strong>
                        {status != undefined && status != "Immediate Available"
                          ? candidateDetails.date_of_joining
                          : status}
                      </Text>
                      {status != undefined &&
                        status != "Immediate Available" && (
                          <Text type="secondary"> (LWD/Joining)</Text>
                        )}
                    </>
                  ) : (
                    <>
                      {candidateDetails.notice_period > 0 && (
                        <Text strong>{candidateDetails.notice_period} dys</Text>
                      )}
                    </>
                  )}
                </div>

                {(status != undefined || candidateDetails.notice_period > 0) &&
                  candidateDetails.notice_period_negotiable != null && (
                    <div>
                    <DotSeparator />
                    </div>
                  )}

                {candidateDetails.resigned ? null : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {candidateDetails.notice_period_negotiable != null && (
                      <Text strong>
                        {candidateDetails.notice_period_negotiable ===
                        "Non-negotiable"
                          ? "Non-negotiable"
                          : null}
                        {candidateDetails.notice_period_negotiable !=
                          "Non-negotiable" &&
                          (candidateDetails.buy_out ? "Buyout" : "Negotiable")}
                        {/* {candidateDetails.exit_type ===
                            "notice_period_negotiable"
                              ? "Negotiable"
                              : null} */}
                      </Text>
                    )}

                    {candidateDetails.exit_type != null &&
                      candidateDetails.notice_period_negotiable > 0 && (
                        // <PipeSeparator />
                        <span>&nbsp; </span>
                      )}

                    {candidateDetails.notice_period_negotiable !=
                      "Non-negotiable" && (
                      <Text strong>
                        ({candidateDetails.notice_period_negotiable})
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}

      {fresher === true && candidateDetails.date_of_joining != null && (
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">Availability</Text>
          <br />
          <Text strong>{candidateDetails.date_of_joining}</Text>
        </div>
      )}

      {/* Preferred roles */}
      <div style={{ marginBottom: 16 }}>
        {objectLength(candidateDetails.preferred_roles) > 0 && (
          <div>
            <Text type="secondary">Preferred Roles</Text> <br />
            {objectLength(candidateDetails.preferred_roles) > 0 &&
              candidateDetails.preferred_roles.map((txt, index) => {
                let role = roleList.find((o) => o.value == txt);
                return <Tag>{role.label}</Tag>;
              })}
          </div>
        )}
      </div>

      {/* Location & Work type*/}
      <div style={{ marginBottom: 16 }}>
        {objectLength(candidateDetails.work_type) > 0 && (
          <div>
            <Text type="secondary">Preferred Work Type</Text> <br />
            {objectLength(candidateDetails.work_type) > 0 &&
              candidateDetails.work_type.map((txt, index) => {
                return <Tag>{txt}</Tag>;
              })}
          </div>
        )}
      </div>

      {/* {candidateDetails.placement_ready_date != undefined && (
          <div>
            <span>
              <Text type="secondary">Available from&nbsp;&nbsp;</Text>  
              <Text strong>{candidateDetails.placement_ready_date}</Text>
            </span>
          </div>
        )} */}

      {objectLength(candidateDetails.preferred_locations) > 0 && (
        <div>
          <Text type="secondary">Preferred Locations</Text>
          <div style={{ display: "inline" }}>
            <div>
              {objectLength(candidateDetails.preferred_locations) > 0 &&
                candidateDetails.preferred_locations.map((txt, index) => {
                  let loc = locations.find((o) => o.value == txt);
                  return <Tag>{loc.label}</Tag>;
                })}
              {candidateDetails.relocation != undefined && (
                <>
                  {candidateDetails.screening != false && (
                    <>
                      {candidateDetails.relocation ? (
                        <Tag color="green">Relocate - Yes</Tag>
                      ) : (
                        <Tag color="orange">Relocate - No</Tag>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateJobPreferenceCard;
