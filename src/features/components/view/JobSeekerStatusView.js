import React from "react";
import { Tag } from "antd";

function JobSeekerStatusView(props) {
  const { jobSeekerStatus } = props;

  // console.log("jobseekerStatus *********", jobSeekerStatus);

  function getColorVal(jobSeekerStatus) {
    var returnval = "grey";
    switch (jobSeekerStatus) {

      case 'active':
        returnval = "green";
        break;

      case 'casual':
        returnval = "yellow";
        break;
  
      case 'passive':
        returnval = "orange";
        break;

      case 'dormant':
        returnval = "red";
        break;

      case 'placed':
        returnval = "grey";
        break;
      }
    return returnval;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
    {jobSeekerStatus && (
    <Tag color={getColorVal(jobSeekerStatus)} >
        {capitalizeFirstLetter(jobSeekerStatus)}
      </Tag>
    )}
    </>
      
  );
}
export default JobSeekerStatusView;
