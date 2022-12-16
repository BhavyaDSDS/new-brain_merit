import React, { useEffect, useCallback, useState } from "react";
import { Card, Col, Row, Layout, Tooltip } from "antd";
import { InfoCircleFilled, CaretUpFilled } from "@ant-design/icons";
import ChartCard from "../../../../components/chart/ChartCard";
import MiniArea from "../../../../components/chart/MiniArea";
import MiniBar from "../../../../components/chart/MiniBar";
import MiniProgress from "../../../../components/chart/MiniProgress";
import ProductBarChart from "../../../../components/chart/ProductBarChart";
import ProductPieChart from "../../../../components/chart/ProductPieChart";
import { useSelector, useDispatch } from "react-redux";
import { getExpCandidateDashboard, updateAcademicInfo } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";

function ExpCandidatesDashboard() {

  const [chartRender,setChartRender] = useState(false)
  const dispatch = useDispatch();
  const dashboardData = useSelector(
    (state) => state.candidate.expDashboardData
  );
  const skillsList = useSelector((state) => state.utils.skillsList);

  var options;
  if (objectLength(skillsList) > 0) {
    options = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }
  useEffect(() => {
    console.log("In side useEffect calling....");
    dispatch(getExpCandidateDashboard());
   // setChartRender(true)
  }, []);

  console.log("out side calling....");

  if(chartRender == false  && objectLength(dashboardData) > 0 && options != undefined)
  {
  setChartRender(true)
  }


  
 
    const totalSkill =
    objectLength(dashboardData.skills) > 0 &&
    dashboardData.skills.reduce((acc, cur) => {
      acc = acc + cur.count;
      return acc;
    }, 0);


  const skillData =
    objectLength(dashboardData) > 0 &&
    dashboardData.skills.map((info) => {
      let skillName;
      if (options != undefined) {
        skillName = options.find((o) => o.value == info.skill);
      }
      if (skillName != undefined) {
        return {
          type: skillName.label,
          value: parseInt((info.count / totalSkill) * 100),
        };
      }
    });

    console.log("skillData ********", skillData)



  // if(objectLength(dashboardData) > 0){
    
  // }


  const visitSummary = [
    { x: "2020-09-18", y: 21 },
    { x: "2020-09-19", y: 9 },
    { x: "2020-09-20", y: 5 },
    { x: "2020-09-21", y: 6 },
    { x: "2020-09-22", y: 14 },
    { x: "2020-09-23", y: 17 },
    { x: "2020-09-24", y: 5 },
    { x: "2020-09-25", y: 3 },
    { x: "2020-09-26", y: 11 },
    { x: "2020-09-27", y: 14 },
    { x: "2020-09-28", y: 12 },
    { x: "2020-09-29", y: 19 },
    { x: "2020-09-30", y: 5 },
    { x: "2020-10-01", y: 20 },
    { x: "2020-10-02", y: 2 },
    { x: "2020-10-03", y: 16 },
    { x: "2020-10-04", y: 11 },
    { x: "2020-10-05", y: 21 },
    { x: "2020-10-06", y: 32 },
    { x: "2020-10-07", y: 16 },
    { x: "2020-10-08", y: 7 },
    { x: "2020-10-09", y: 0 },
    { x: "2020-10-10", y: 11 },
    { x: "2020-10-11", y: 13 },
    { x: "2020-10-12", y: 18 },
    { x: "2020-10-13", y: 13 },
    { x: "2020-10-14", y: 27 },
    { x: "2020-10-15", y: 14 },
    { x: "2020-10-16", y: 2 },
    { x: "2020-10-17", y: 15 },
  ];

  // const movementSummary = [
  //   { x: "2019-11", y: 0 },
  //   { x: "2019-12", y: 0 },
  //   { x: "2020-1", y: 0 },
  //   { x: "2020-2", y: 0 },
  //   { x: "2020-3", y: 730 },
  //   { x: "2020-4", y: 178 },
  //   { x: "2020-5", y: 0 },
  // ];

  const addition_data = [
    { day: "Monday", addition: 38 },
    { day: "Tuesday", addition: 52 },
    { day: "Wednesday", addition: 61 },
    { day: "Thursday", addition: 45 },
    { day: "Friday", addition: 48 },
    { day: "Saturday", addition: 38 },
    { day: "Sunday", addition: 38 },
  ];

  const screening_data = [
    { day: "Monday", addition: 38 },
    { day: "Tuesday", addition: 52 },
    { day: "Wednesday", addition: 61 },
    { day: "Thursday", addition: 45 },
    { day: "Friday", addition: 48 },
    { day: "Saturday", addition: 38 },
    { day: "Sunday", addition: 38 },
  ];

  // const screenig_week_data = objectLength(dashboardData.candidates_screening) > 0 && dashboardData.candidates_screening.map((info) => {

  //   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   let date = info.screening_date;
  //   var d = new Date(date);
  //   var dayName = days[d.getDay()];

  //     console.log("names :",dayName)

  // })

  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };

  let barDataTotalYrsExp = [
    { x: "0-2 yrs", y: 0 },
    { x: "2-5 yrs", y: 0 },
    { x: "5-7 yrs", y: 0 },
    { x: "7-10 yrs", y: 0 },
    { x: "10-15 yrs", y: 0 },
    { x: "15-20 yrs", y: 0 },
    { x: "20+ yrs", y: 0 },
  ];

  const totalExp =
    objectLength(dashboardData.total_experience) > 0 &&
    dashboardData.total_experience.map((info) => {
      if (info.total_experience <= 2)
        barDataTotalYrsExp[0].y = barDataTotalYrsExp[0].y + info.count;
      else if (info.total_experience > 2 && info.total_experience <= 5)
        barDataTotalYrsExp[1].y = barDataTotalYrsExp[1].y + info.count;
      else if (info.total_experience > 5 && info.total_experience <= 7)
        barDataTotalYrsExp[2].y = barDataTotalYrsExp[2].y + info.count;
      else if (info.total_experience > 7 && info.total_experience <= 10)
        barDataTotalYrsExp[3].y = barDataTotalYrsExp[3].y + info.count;
      else if (info.total_experience > 10 && info.total_experience <= 15)
        barDataTotalYrsExp[4].y = barDataTotalYrsExp[4].y + info.count;
      else if (info.total_experience > 15 && info.total_experience <= 20)
        barDataTotalYrsExp[5].y = barDataTotalYrsExp[5].y + info.count;
      else if (info.total_experience > 20)
        barDataTotalYrsExp[6].y = barDataTotalYrsExp[6].y + info.count;
    });

  const barDataExpCTC = [
    { x: "0-5 LPA", y: 0 },
    { x: "5-10 LPA", y: 0 },
    { x: "10-20 LPA", y: 0 },
    { x: "20-30 LPA", y: 0 },
    { x: "30-40 LPA", y: 0 },
    { x: "40-50 LPA", y: 0 },
    { x: "50+ LPA", y: 0 },
  ];

  // console.log(dashboardData.expected_ctc)
  const totalCtc =
    objectLength(dashboardData.expected_ctc) > 0 &&
    dashboardData.expected_ctc.map((info) => {
      // console.log(info.expected_ctc/100000);
      if (info.expected_ctc / 100000 >= 0 && info.expected_ctc / 100000 <= 5) {
        barDataExpCTC[0].y = barDataExpCTC[0].y + info.count;
      } else if (
        info.expected_ctc / 100000 > 5 &&
        info.expected_ctc / 100000 <= 10
      ) {
        barDataExpCTC[1].y = barDataExpCTC[1].y + info.count;
      } else if (
        info.expected_ctc / 100000 > 10 &&
        info.expected_ctc / 100000 <= 20
      ) {
        barDataExpCTC[2].y = barDataExpCTC[2].y + info.count;
      } else if (
        info.expected_ctc / 100000 > 20 &&
        info.expected_ctc / 100000 <= 30
      ) {
        barDataExpCTC[3].y = barDataExpCTC[3].y + info.count;
      } else if (
        info.expected_ctc / 100000 > 30 &&
        info.expected_ctc / 100000 <= 40
      ) {
        barDataExpCTC[4].y = barDataExpCTC[4].y + info.count;
      } else if (
        info.expected_ctc / 100000 > 40 &&
        info.expected_ctc / 100000 <= 50
      ) {
        barDataExpCTC[5].y = barDataExpCTC[5].y + info.count;
      } else if (info.expected_ctc / 100000 > 50) {
        barDataExpCTC[6].y = barDataExpCTC[6].y + info.count;
      }
    });

  // console.log(barDataExpCTC)

  // const pieDataSkillsSummary = [
  //   {
  //     type: "C",
  //     value: 27,
  //   },
  //   {
  //     type: "C++",
  //     value: 25,
  //   },
  //   {
  //     type: "Java",
  //     value: 18,
  //   },
  //   {
  //     type: "JavaScript",
  //     value: 15,
  //   },
  //   {
  //     type: "Python",
  //     value: 10,
  //   },
  //   {
  //     type: "React Js",
  //     value: 5,
  //   },
  // ];



  console.log("Dash board data === ", dashboardData);
  // console.log("Line number 228 =", skillData);

  // const pieDataBranchSummary = [
  //   {
  //     type: "Active",
  //     value: 30,
  //   },
  //   {
  //     type: "Casual",
  //     value: 25,
  //   },
  //   {
  //     type: "Passive",
  //     value: 15,
  //   },
  //   {
  //     type: "Dormant",
  //     value: 10,
  //   },
  //   {
  //     type: "Placed",
  //     value: 8,
  //   },
  // ];

  var total_candidates = dashboardData.candidates_total_count;
  var new_candidates_past_month = dashboardData.cand_added_last_30days;
  var candidate_addition_perc = Math.ceil(
    (new_candidates_past_month / total_candidates) * 100
  );

  const jobSeakersStatus =
  objectLength(dashboardData.job_seakers_status) > 0  &&
    dashboardData.job_seakers_status.map((info) => {
      return {
        type: info.job_seakers_status,
        value: parseInt((info.count / total_candidates) * 100),
      };
    });

  return (
    <>
      <div style={{ padding: "8px" }}>
        <Row gutter={24} type="flex">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Total Candidates"
              action={
                <Tooltip title="Total No Of Candidates">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={total_candidates != undefined && total_candidates}
              footer={
                <>
                  <span className="boldText">{new_candidates_past_month}</span>{" "}
                  Candidates added in the last{" "}
                  <span className="boldText">30</span> days
                </>
              }
              contentHeight={46}
            >
              <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                Monthly Changes
                <span className="trendText">{candidate_addition_perc}%</span>
                <CaretUpFilled style={{ color: "#52c41a" }} />
              </div>
            </ChartCard>
          </Col>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Candidates Added"
              action={
                <Tooltip title="Candidates Added in the last week.">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={dashboardData.cand_added_last_week_total}
              footer={
                <>
                  <span className="boldText">
                    {dashboardData.cand_added_last_week_total}
                  </span>{" "}
                  Candidates added in the past week
                </>
              }
              contentHeight={46}
            >
              <MiniBar data={addition_data} />
            </ChartCard>
          </Col>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Candidates Screening"
              action={
                <Tooltip title="Candidates Screened in the last week.">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={dashboardData.candidates_screening_lastweek}
              footer={
                <>
                  <span className="boldText">
                    {dashboardData.candidates_screening_lastweek}
                  </span>{" "}
                  Candidates screened in the past week
                </>
              }
              contentHeight={46}
            >
              <MiniBar data={screening_data} />
            </ChartCard>
          </Col>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Candidates Offerred/Placed"
              action={
                <Tooltip title="Number of candidates placed in last month">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={dashboardData.cand_placed_last_30days}
              footer={
                <>
                  <span className="boldText">
                    {dashboardData.cand_placed_last_30days}
                  </span>{" "}
                   No of candidates placed in last month
                </>
              }
              contentHeight={46}
            >
              <MiniProgress
                percent={10}
                strokeWidth={16}
                color="#13C2C2"
                target={100}
              />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24} type="flex">
          <Col span={12}>
            <Card title="Candidates Total Experience Summary">
              <ProductBarChart barData={barDataTotalYrsExp} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Candidates Skills Summary">
              {chartRender && <ProductPieChart pieData={skillData} />}
            </Card> 
          </Col>
        </Row>
        <Row gutter={24} type="flex">
          <Col span={12}>
            <Card title="Candidates Expected CTC Summary">
               <ProductBarChart barData={barDataExpCTC} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Candidates Job Seeking Status Summary">
            {chartRender && <ProductPieChart
                pieData={ jobSeakersStatus}
              />}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ExpCandidatesDashboard;
