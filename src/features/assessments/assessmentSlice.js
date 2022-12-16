import api from "../../utils/httpCommon";
//import useApiPrivate from "../../utils/useApiPrivate";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "lodash";

const end_point = "assessments/";

const initialState = {  
  addAssessmentLoading: "init",
  updateAssessmentLoading: "init",
  deleteAssessmentLoading: "init",
  getAssessmentListLoading: "init",
  assessmentError: "",
  loading: "init",
  assessmentDetail: {},
  listassessment: [],
};

export const assessment = createAsyncThunk("assessment/assessment",(id) => {
  // const api = useApiPrivate();
  return api.get(end_point + id).then((response) => response.data);
});

export const addAssessment = createAsyncThunk("assessment/addAssessment", async (post_data) => {
      // const api = useApiPrivate();
      const response = await api.post(end_point, post_data);
      return response.data;    
  }
);

export const updateAssessment = createAsyncThunk("assessment/updateAssessment", async (data) => {
    // console.log("request data: " + JSON.stringify(data[0]) + "id:" + data[1]);
    // const api = useApiPrivate();
     const response = await api.put(end_point + data[1] + '/', data[0]);
     return response.data;
  }
);

export const deleteAssessment = createAsyncThunk("assessment/deleteAssessment", (id) => {
  return api.delete(end_point + id).then((response) => response.data);
});

//Experience Candidate Filter
export const getAssessmentList = createAsyncThunk("assessment/getAssessmentList", async () => {
  // const api = useApiPrivate();
  const response = await api.get(end_point);
  return response.data;
});

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    resetAssessmentDetails: state => {
       state.assessmentDetail = {};
       state.addAssessmentLoading = "init";
       console.log("In reducer resetAssessmentDetails");
      },

    // resetExpassessmentListLoading: state => {
    //   state.getExpCandListLoading = "init"
    //   },
  },
  extraReducers: (builder) => {
     
       // add assessment
    builder.addCase(addAssessment.pending, (state) => {
      state.addAssessmentLoading = "pending";
    });
    builder.addCase(addAssessment.fulfilled, (state, action) => {
      state.addAssessmentLoading = "complete_success";
      state.assessmentDetail = action.payload;
      state.assessmentError = "";
    });
    builder.addCase(addAssessment.rejected, (state, action) => {
      state.addAssessmentLoading = "complete_failure";
      state.assessmentDetail = {};
      state.assessmentError = action.error.message;
    });

    // update assessment
    builder.addCase(updateAssessment.pending, (state) => {
      state.updateAssessmentLoading = "pending";
    });
    builder.addCase(updateAssessment.fulfilled, (state, action) => {
      state.updateAssessmentLoading = "complete_success";
      state.assessmentDetail = action.payload;
      state.assessmentError = "";
    });
    builder.addCase(updateAssessment.rejected, (state, action) => {
      state.updateAssessmentLoading = "complete_failure";
      state.assessmentDetail = {};
      state.assessmentError = action.error.message;
    });

    // delete assessment
    builder.addCase(deleteAssessment.pending, (state) => {
      state.deleteAssessmentLoading = "pending";
    });
    builder.addCase(deleteAssessment.fulfilled, (state, action) => {
      state.deleteAssessmentLoading = "complete_success";
      state.deleteAssessmentResult = action.payload;
      state.assessmentError = "";
    });
    builder.addCase(deleteAssessment.rejected, (state, action) => {
      state.deleteAssessmentLoading = "complete_failure";
      state.deleteAssessmentResult = {};
      state.assessmentError = action.error.message;
    });
  // delete assessment
  builder.addCase(getAssessmentList.pending, (state) => {
    state.getAssessmentListLoading = "pending";
  });
  builder.addCase(getAssessmentList.fulfilled, (state, action) => {
    state.getAssessmentListLoading = "complete_success";
    state.listassessment = action.payload;
    state.assessmentError = "";
  });
  builder.addCase(getAssessmentList.rejected, (state, action) => {
    state.getAssessmentListLoading = "complete_failure";
    state.listassessment = {};
    state.assessmentError = action.error.message;
  });
  },
});

export const {setRefreshExpCandList, resetRefreshExpCandList } = assessmentSlice.actions
// export const { resetExpassessmentListLoading } = assessmentSlice.actions

export default assessmentSlice.reducer;