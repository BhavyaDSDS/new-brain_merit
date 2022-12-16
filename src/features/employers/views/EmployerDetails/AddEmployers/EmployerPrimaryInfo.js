import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEmployer, updateEmployer, setRefreshEmployerList } from "./../../../employerSlice";
import EmployerPrimaryInfoForm from "../../../../components/form/employersForms/EmployerPrimaryInfoForm";
import { objectLength } from '../../../../components/utils/JavaScriptUtils'
import { Alert, message, notification } from "antd";



function EmployerPrimaryInfo(props) {
  const { empId, setNextTab, onSetEmpId } = props;
  //   const [loading] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const employer = useSelector((state) => state.employer);

  var employerDetails = employer.employerDetail;
  const history = useHistory();

  if (!empId) {
    if (!isNew) {
      if (objectLength(employerDetails) > 0) {
        onSetEmpId(employerDetails.id);

      }
    }
  }



  const dispatch = useDispatch();
  console.log("employer id = ", empId);

  const handleFinish = React.useCallback(
    (values) => {
      if (empId) {
        const data = [values, empId];
        dispatch(updateEmployer(data));
        dispatch(setRefreshEmployerList());
        console.log("EmpData updated");
      } else {
        dispatch(addEmployer(values));
        // history.push("/employers")

        console.log("Emp data added");
        setIsNew(false);
        dispatch(setRefreshEmployerList());
      }
      console.log("emp1 primary info = ", values);
      console.log("emp primary JSON info =", JSON.stringify(values));

    },
    [empId]
  );
//  let message = employerData.employerError.slice(-3) == 402? "Mobile number is already registered!" :"Server error!"
//console.log("employerData.updateEmployerLoading******###*****",employer.employerDetail)
  return (
    <>
     {employer.updateEmployerLoading == "complete_success" &&
      objectLength(employer.employerDetail) > 0 ? (
        <div>
          {/* <Alert message = "Candidate PrimaryInfo Submitted Successfully" type="success"/>  */}
          {console.log(
            "EmployerPrimaryInfo candidate detail",
            employer.employerDetail
          )}{" "}
          {setNextTab()}{" "}
        </div>
      ) : null}
         {/* {serverResponse && employerData.updateEmployerLoading == "complete_failure" && 
        (<Notification
          type="warning"
          //message={message}
          // time={null}
          place="top"
        /> || setServerResponse(false))} */}
        

      <EmployerPrimaryInfoForm
        editableForm={false}
        employerDetails={employerDetails}
        onFinishEmpPrimInfo = {handleFinish}
      />
     
    </>
  );
      }
  
export default EmployerPrimaryInfo;
