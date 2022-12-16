import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCandidate, updateCandidate,setRefreshCandList } from "../../../candidateSlice";
import CandidatePrimaryInfoForm from "../../../../components/form/CandidatePrimaryInfoForm";
import { Alert, message, notification } from "antd";
import { duration } from "moment";
import Notification from "../../../../components/utils/Notification";
import {
  objectLength,
  capitalizeFirstLetter,
} from "../../../../components/utils/JavaScriptUtils";

const Primary_INFO = {
  first_name: "",
  last_name: "",
  contact_info:{code: 91, phone:"", short: 'IN'},
  email: "",
  current_location: null,
  fresher: true,
};

function CandidatePrimaryInfo(props) {
  const { candidateKey, onSetCandidateKey, setNextTab, isFresher } = props;
  const [isNew, setIsNew] = useState(true);
  const [serverResponse,setServerResponse] = useState(false);

  const dispatch = useDispatch();
  const candidateData = useSelector((state) => state.candidate);
  var candidateDetails = candidateData.candidateDetail;

  if (!candidateKey) {
    console.log("candidateKey: " + candidateKey);
    if (!isNew) {
      if (objectLength(candidateDetails) > 0) {
        onSetCandidateKey(candidateDetails.id);
      }
    } else {
      candidateDetails = Primary_INFO;
    }
  }

  const handleFinish = React.useCallback(
    (values) => {

      console.log("dispatch handle finish &&&&&++++++ =",values)


      values.fresher = isFresher;
      values.first_name = capitalizeFirstLetter(values.first_name);
      values.last_name = capitalizeFirstLetter(values.last_name);
     
      console.log("PrimaryInfo Submit ===" + JSON.stringify(values));

      if (candidateKey) {
        // console.log(
        //   "Values while saving: " +
        //     JSON.stringify(values) +
        //     "candidatekey: " +
        //     candidateKey
        // );
        const data = [values, candidateKey];
        dispatch(updateCandidate(data));
      } else {
        dispatch(addCandidate(values));
        setIsNew(false);
      }
      setServerResponse(true);
      dispatch(setRefreshCandList());
    },
    [candidateKey]
  );

  let message = candidateData.candidateError.slice(-3) == 402? "Mobile number is already registered!" :"Server error!"

  
  
  return (
    <>
      {candidateData.updateCandidateLoading == "complete_success" &&
      objectLength(candidateData.candidateDetail) > 0 ? (
        <div>
          {/* <Alert message = "Candidate PrimaryInfo Submitted Successfully" type="success"/>  */}
          {console.log(
            "CandidatePrimaryInfo candidate detail",
            candidateData.candidateDetail
          )}{" "}
          {setNextTab()}{" "}
        </div>
      ) : null}

      {/* {candidateData.updateCandidateLoading == "complete_failure" && 
        (
        console.log("I am component...."),
        <Notification
          type="warning"
          message={message}
          // time={null}
          place="top"
        />) && dispatch(resetupdateCandidateLoading()) }  */}
     
        {serverResponse && candidateData.updateCandidateLoading == "complete_failure" && 
        (<Notification
          type="warning"
          message={message}
          // time={null}
          place="top"
        /> || setServerResponse(false))}
        

      <CandidatePrimaryInfoForm
        candidateDetails={candidateDetails}
        onFinishCandPrimInfo={handleFinish}
        editableForm={false}
      />
     
    </>
  );
}
export default CandidatePrimaryInfo;
