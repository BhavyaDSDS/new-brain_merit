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
import { getFresherDashboard } from "../../../candidateSlice";
import { objectLength } from "../../../../components/utils/JavaScriptUtils";

function FresherDashboard() {

  const [chartRender,setChartRender] = useState(false)
  const dispatch = useDispatch();
  const dashboardData = useSelector(
    (state) => state.candidate.fresherDashboardData
  );
  
  const skillsList = useSelector((state) => state.utils.skillsList);
  const branchsList = useSelector((state) => state.utils.branchsList);


  var skillList;
  if (objectLength(skillsList) > 0) {
    skillList = skillsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  var branchList;
  if (JSON.stringify(branchsList) !== "{}") {
    branchList = branchsList.map(function (obj) {
      return { label: obj.name, value: obj.id };
    });
  }

  useEffect(() => {
    dispatch(getFresherDashboard());
  }, []);

  if(chartRender == false  && objectLength(dashboardData) > 0 && skillList != undefined && objectLength(branchList)>0)
  {
  setChartRender(true)
  }

  var total_candidates = objectLength(dashboardData) > 0 && dashboardData.freshers_total_count;
  var new_candidates_past_month = objectLength(dashboardData) > 0 && dashboardData.cand_added_last_30days_total;


  const totalSkill =
    objectLength(dashboardData) > 0 &&
    dashboardData.skills.reduce((acc, cur) => {
      acc = acc + cur.count;
      return acc;
    }, 0);

    const skillData =
    objectLength(dashboardData) > 0 &&
    dashboardData.skills.map((info) => {
      let skillName;
      if (skillList != undefined) {
        skillName = skillList.find((o) => o.value == info.skill);
      }
      if (skillName != undefined) {
        return {
          type: skillName.label,
          value: parseInt((info.count / totalSkill) * 100),
        };
      }
    });

    // {
    //   type: "CS",
    //   value: 22,
    // },

    const branchData = objectLength(dashboardData) > 0 && dashboardData.branchs.map((info) => {
      let branchName;
      if(branchList != undefined){
        branchName = branchList.find((o) => o.value == info.branch);
      }

      if(branchName != undefined){
        return{
          type: branchName.label,
          value: parseInt((info.count/total_candidates)*100)
        }
      }
    })

    console.log("branch data =",branchData);
    console.log("branch list ===",branchList)

  // console.log("$$$$$$$$$DashBoard@@@@@@@@@@@@@@@@@@", dashboardData);

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

  const data = [
    { day: "1951 day", addition: 38 },
    { day: "1952 day", addition: 52 },
    { day: "1956 day", addition: 61 },
    { day: "1957 day", addition: 45 },
    { day: "1958 day", addition: 48 },
    { day: "1959 day", addition: 38 },
    { day: "1960 day", addition: 38 },
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

  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };

  // const barDataYearOfPassing = [
  //   { x: "2016", y: 148 },
  //   { x: "2017", y: 75 },
  //   { x: "2018", y: 200 },
  //   { x: "2019", y: 1600 },
  //   { x: "2020", y: 2200 },
  //   { x: "2021", y: 3200 },
  //   { x: "2022", y: 6000 },
  // ];

  const pastOutYear =
    objectLength(dashboardData.passed_out_year) > 0 &&
    dashboardData.passed_out_year.map((info) => {
      return { x: info.to_date__year.toString(), y: info.count };
    });
 
    
 

  const barDataPerc = [
    { x: "40-50", y: 0 },
    { x: "50-60", y: 0 },
    { x: "60-70", y: 0},
    { x: "70-80", y: 0 },
    { x: "80-90", y: 0 },
    { x: "90-100", y: 0 },
  ];

  objectLength(dashboardData) > 0 && dashboardData.percentage.map((info) => {
    if(info.score > 40 && info.score <=50){
      barDataPerc[0].y = barDataPerc[0].y + info.count
    }else if(info.score > 50 && info.score <=60){
      barDataPerc[1].y = barDataPerc[1].y + info.count
    }else if(info.score > 60 && info.score <=70){
      barDataPerc[2].y = barDataPerc[2].y + info.count
    }else if(info.score > 70 && info.score <=80){
      barDataPerc[3].y = barDataPerc[3].y + info.count
    }else if(info.score > 80 && info.score <=90){
      barDataPerc[4].y = barDataPerc[4].y + info.count
    }else if(info.score > 90 && info.score <=100){
      barDataPerc[5].y = barDataPerc[5].y + info.count
    }
  })



  const pieDataBranchSummary = [
    {
      type: "CS",
      value: 22,
    },
    {
      type: "Electronics",
      value: 20,
    },
    {
      type: "IS",
      value: 15,
    },
    {
      type: "Mechanical",
      value: 10,
    },
    {
      type: "Electrical",
      value: 8,
    },
    {
      type: "Others",
      value: 25,
    },
  ];

  

  
  var candidate_addition_perc = Math.ceil(
    (new_candidates_past_month / total_candidates) * 100
  );

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
          {/* <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Portal Visits"
              action={
                <Tooltip title="Total number of active users in the last month.">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={100077}
              footer={
                <>
                  <span className="boldText">{1200}</span> Average daily visits
                  per day
                </>
              }
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitSummary} />
            </ChartCard>
          </Col> */}
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
              total={objectLength(dashboardData) > 0 && dashboardData.cand_added_last_week_total}
              footer={
                <>
                  <span className="boldText">{objectLength(dashboardData) > 0 && dashboardData.cand_added_last_week_total}</span> Candidates added in
                  the past week
                </>
              }
              contentHeight={46}
            >
              <MiniBar data={data} />
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
              total={dashboardData.cand_screening_last_week_total}
              footer={
                <>
                  <span className="boldText">
                    {dashboardData.cand_screening_last_week_total}
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
              title="Candidates Placed"
              action={
                <Tooltip title="candidates placed in the last month">
                  <InfoCircleFilled />
                </Tooltip>
              }
              loading={false}
              total={objectLength(dashboardData) > 0 && dashboardData.cand_placed_last_30days_total}
              footer={
                <>
                  <span className="boldText">
                    {objectLength(dashboardData) > 0 && dashboardData.cand_placed_last_30days_total}
                  </span>{" "}
                  Candiates places in the past month
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
            <Card title="Candidates Passed Out Summary">
              <ProductBarChart barData={pastOutYear} />
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
            <Card title="Candidates Percentage Summary">
              <ProductBarChart barData={barDataPerc} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Candidates Branch Summary">
        {chartRender && <ProductPieChart pieData={branchData} />}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FresherDashboard;
