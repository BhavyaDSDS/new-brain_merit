import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { addEmployer, updateEmployer, setRefreshEmployerList } from "./../../../employerSlice";
import { addInterviewer,updateInterviewer,setRefreshInterviewerList } from "../../../interviewerSlice";
import AddInterviewersDetail from "./AddInterviewersDetail";
import { objectLength } from '../../../../components/utils/JavaScriptUtils'
import { Alert, message, notification } from "antd";



function Interviewers(props) {
   const { empId, setNextTab, onSetEmpId } = props;
  const interviewer = useSelector((state) => state.interviewer);
    console.log("interviewer",interviewer)
  // var  interviewerDetails=interviewer.interviewerDetail;
  // console.log("interviewerDetails ********#############********",interviewerDetails)

  // const interviewer = useSelector(
  //   (state) => state.interviewer);
  //   var interviewerDetail=interviewer.interviewerDetail;
 
  // //   const [loading] = useState(false);
  const [isNew, setIsNew] = useState(true);

  // const employer = useSelector((state) => state.employer);

  // var employerDetails = employer.employerDetail;
  //console.log("interviewer.interviewerDetail",interviewerDetail)
   const history = useHistory();

  // if (!empId) {
  //   if (!isNew) {
  //     if (objectLength(employerDetails) > 0) {
  //       onSetEmpId(employerDetails.id);

  //     }
  //   }
  // }


  // console.log("state.employer.employerDetail",employerDetails)

   const dispatch = useDispatch();
  // console.log("employer id = ", empId);

  const handleFinish = React.useCallback(
    (values) => {
       console.log("values *******#############*******",values)
      if (empId) {
        const data = [values, empId];
        dispatch(updateInterviewer(data));
        dispatch(setRefreshInterviewerList());
        console.log("EmpData updated");
      } else {
        dispatch(addInterviewer(values));
        history.push("/interviewerslist")
      //   console.log("Emp data added");
        setIsNew(false);
         dispatch(setRefreshInterviewerList());
      }
      // console.log("setRefreshEmployerList() called");
     console.log("emp1 primary info = ", values);
      console.log("emp primary JSON info =", JSON.stringify(values));

    },
    []
  );
//  let message = employerData.employerError.slice(-3) == 402? "Mobile number is already registered!" :"Server error!"
//console.log("employerData.updateEmployerLoading******###*****",employer.employerDetail)
  return (
    <>
    
      
      <AddInterviewersDetail
        editableForm={false}
        //employerDetails={employerDetails}
        onFinishInterviewersDetail = {handleFinish}
      />
     
    </>
  );
      }
  
export default Interviewers;
