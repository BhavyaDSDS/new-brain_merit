import React, { useState ,useEffect} from "react";
import CreateJobPosting from "../../../../components/form/CreateJobPosting";
import { useSelector,useDispatch } from "react-redux";
import {addJobPosting,updateJobPosting,setRefreshJobPostingList,resetJobPostingDetails} from "../../../jobSlice"
import {useHistory} from "react-router-dom";
function JobPosting() {
  const [experience, setExperience] = useState(true);
  const [jobType, setJobType] = useState(true);
  const [required,setRequired]=useState(true);
  const [empId, setEmpId] = useState();


  const jobPostingDetails = useSelector((state) => state.job.jobPostingDetail)


  const [isNew, setIsNew] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();



  function onSetEmpId(id) {
    setEmpId(id);
  }

  // useEffect(() => {
  //     dispatch(resetJobPostingDetails());
  // }, []);


  if (jobPostingDetails.id) {
    if (!isNew) {
      if (objectLength(jobPostingDetails) > 0) {
        onSetEmpId(jobPostingDetails.id);

      }
    }
  }

console.log("jobPostingDetailsjobPostingDetailsjobPostingDetails",jobPostingDetails)
 const handleFinish = React.useCallback(
    (values) => {
      //console.log("EMPID",values)
      console.log("data ****###**",jobPostingDetails.id) 
      if (jobPostingDetails.id) {
        const data = [values, jobPostingDetails.id];
        console.log("data ****###**",data)
        dispatch(updateJobPosting(data));
        dispatch(setRefreshJobPostingList());
        // console.log("EmpData updated");
      } else {
        dispatch(addJobPosting(values));
        history.push("/jobPostingList")
        // console.log("Emp data added");
        setIsNew(false);
       dispatch(setRefreshJobPostingList());
     }


      console.log("setRefreshEmployerList() called");
      console.log("emp1 primary info = ", values);
      console.log("emp primary JSON info =", JSON.stringify(values));

    },
   [empId]
  );
  return (
    <div>
      <CreateJobPosting
        cardTitle="Add Job Description"
        experience={experience}
        salaryLabel="Salary Range"
        jobType={jobType}
        required={true}
        empId={empId}
        onSetEmpId = {onSetEmpId}
        onFinishJobPosting={handleFinish}
      />
    </div>
  );
}
//console.log("job re ****############***********",required)
export default JobPosting;
