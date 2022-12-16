import React from "react";
import { Card, Col, Row,Button } from "antd";

import ArticalFeedCard from "./CandidateFeed/ArticalFeedCard";
import JobFeedCard from "./CandidateFeed/JobFeedCard";
import QuizFeedCard from "./CandidateFeed/QuizFeedCard";
import ImageCarouselFeedCard from "./CandidateFeed/ImageCarouselFeedCard";
import VideoFeedCard from "./CandidateFeed/VideoFeedCard";
import ProfileViewCard from "./CandidateLeftSideView/ProfileViewCard";
import LinkViewCard from "./CandidateLeftSideView/LinkViewCard";
import Data from "./data.json";
import NewJobFeedCard from "./CandidateFeed/NewJobFeedCard";
import InternshipFeedCard from "./CandidateFeed/InternshipFeedCard";


function CompleteProfileView() {
  return (
    <>
 
      <Button
           type="primary"
         style={{
           marginBottom: 16,
           marginRight:14,
           float: "right",
         }}
         onClick={() => window.open('/edit', '_blank')}
       >
          Edit
       </Button> 
      <div className="site-card-border-less-wrapper">
        <Row gutter={[24, 8]}>
          <Col span={5}>
            <ProfileViewCard />
            <LinkViewCard />
          </Col>
          <Col span={12}>
            <ArticalFeedCard article={Data.article} />
            <JobFeedCard job={Data.job} />
            <QuizFeedCard  quiz={Data.quiz}/>
            <ImageCarouselFeedCard carousel={Data.carousel} />
            <VideoFeedCard video={Data.video} />
            <NewJobFeedCard newjob={Data.newjob}/>
             <InternshipFeedCard internship={Data.internship}/>
          </Col>
          <Col span={7}>
            <Card></Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default CompleteProfileView;