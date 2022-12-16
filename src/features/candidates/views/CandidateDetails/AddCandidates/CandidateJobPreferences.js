import React from "react";
import { updateCandidate, setRefreshCandList} from "../../../candidateSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CandidateJobPreferencesForm from "../../../../components/form/CandidateJobPreferencesForm";


function CandidateJobPreferences() {
  const dispatch = useDispatch();
  const history = useHistory();
  const candidateDetails = useSelector((state) => state.candidate.candidateDetail);
 
  const handleFinish = React.useCallback((values) => {
    const data=[values,candidateDetails.id];
     dispatch(updateCandidate(data)); 
     dispatch(setRefreshCandList());
    console.log("JobPreferences Submit: ", JSON.stringify(values));    
    if(candidateDetails.fresher == false)
    {
      history.push("/expCandidateList")
    }
    else
    {
      history.push("/freshers")
    }
  },[candidateDetails.id]);
  
  return (
    <>      
     <CandidateJobPreferencesForm
       candidateDetails = {candidateDetails}
       onFinishCandJobPreferences = {handleFinish}
      />
    </>
  );
}
export default CandidateJobPreferences;
