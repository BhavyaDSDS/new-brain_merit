import React, { useState, useCallback, useEffect, useRef } from "react";
import {Button,Empty,} from "antd";
import CandidateScreeningForm from "../../../../components/form/CandidateScreeningForm";
import { updateCandidate,setRefreshCandList } from "../../../candidateSlice";
import { useSelector, useDispatch } from "react-redux";

function CandidateScreening(props) {
  const { fresher, Editable,candidateKey} = props;

  const ShowModal = useRef();
  const dispatch = useDispatch();
  const candidateDetails = useSelector(
    (state) => state.candidate.candidateDetail
  );

  console.log("************Prent Render**************");

  const submitData =(values) => {

    values.screening = true;

  // console.log("I am candidate key",candidateKey);

  //   console.log("I am screening page",Editable);

    const data = [values, candidateKey];
    dispatch(updateCandidate(data));
    console.log("Screening elements ====", values);
    dispatch(setRefreshCandList());
  };



  return (
    <>
      {!Editable && (
        
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={<></>}
            imageStyle={{
              height: 60,
            }}
          >
            <Button
              type="primary"
              onClick={() => ShowModal.current.showModal()}
            >
              Add Screening info
            </Button>
          </Empty>
      )}
          
          <CandidateScreeningForm ref={ShowModal} submitData={submitData} Editable={Editable} fresher={fresher}/>
        
    </>
  );
}

export default CandidateScreening;
  