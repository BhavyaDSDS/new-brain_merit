import React, { useState } from "react";
import CreateJobPosting from "../../../../components/form/CreateJobPosting";
import { useSelector,useDispatch} from "react-redux";
import { addInternship,setRefreshInternshipList,updateInternship} from "../../../internshipSlice"
import { useHistory } from "react-router-dom";


function InternShip() {
  const [experience, setExperience] = useState(false);
  const [jobType, setJobType] = useState(false);
  const [empId, setEmpId] = useState();
  const [isNew, setIsNew] = useState(true);

 // const [required,setRequired]=useState(true);
 const internshipDetail = useSelector((state) => state.internship.internshipDetail)
 const history = useHistory();

 const dispatch = useDispatch();
 const handleFinish = React.useCallback(
  (values) => {
    console.log("EMPID ******##########*****",values)
    console.log("data ****###**",empId)

    if (empId) {
      const data = [values, empId];
      console.log("data ****###**",data)
      dispatch(updateInternship(data));
      dispatch(setRefreshInternshipList());
      console.log("EmpData updated");
    } else 
    {
      dispatch(addInternship(values));

      history.push("/internshipList")

      console.log("Emp data added");
      setIsNew(false);
      dispatch(setRefreshInternshipList());

    //  dispatch(setRefreshEmployerList());
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
        cardTitle="Add Internship Description"
        experience={experience}
        salaryLabel={"Stipend Fund Range"}
        jobType={jobType}
        required={true}
        onFinishJobPosting={handleFinish}

      />
    </div>
   
  );
}
//onsole.log("Internship re ****############***********",required)

export default InternShip;
