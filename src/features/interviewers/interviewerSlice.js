import api from "../../utils/httpCommon"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const end_point = "interviewers/";

const initialState = {
    interviewerListLoading: false,
    interviewerListError:"",
    interviewerList: [],

    interviewerDetailLoading: false,
    interviewerDetailError:"",
    interviewerDetail:{},

    //addInterviewerLoading: false,
    //addInterviewerError:"",

    updateInterviewerLoading: false,
    updateInterviewerError:"",

    //deleteInterviewerLoading: false,
    //deleteInterviewerError:"",
    deleteInterviewerResult: {},

    interviewerFilterListLoading: false,
    interviewerFilterListError:"",
    interviewerFilterList: [],
    
    refreshInterviewerList:false,
    interviewerCount:0,

};

export const getInterviewerList = createAsyncThunk("interviewer/getInterviewerList", () => {
    return api.get(end_point).then((response) => response.data);
});

export const getInterviewerDetail = createAsyncThunk("interviewer/getInterviewerDetail", (id) => {
    return api.get(end_point + id).then((response) => response.data);
});

export const addInterviewer = createAsyncThunk("interviewer/addInterviewer", (data) => {
    return api.post(end_point, data).then((response) => response.data);
});

export const updateInterviewer = createAsyncThunk("interviewer/updateInterviewer", (data) => {
    return api.put(end_point + data[1] + '/', data[0]).then((response) => response.data);
});

export const deleteInterviewer = createAsyncThunk("interviewer/deleteInterviewer", (id) => {
    return api.delete(end_point + id).then((response) => response.data);
});

export const getInterviewerFilterList = createAsyncThunk("interviewer/getInterviewerFilterList", (data) => {
  return api.get("search/interviewers/?"+data).then((response) => response.data);
}); 

const interviewerSlice = createSlice({
    name: "interviewer",
    initialState,
    reducers: {
        resetInterviewerDetails: state => {
            state.interviewerDetail = {},
            state.interviewerList = [],
            console.log("In reducer resetInterviewerDetails");
          },
          setRefreshInterviewerList: state => {
            state.refreshInterviewerList = true;
            console.log("In reducer setRefreshInterviewerList");
          },
          resetRefreshInterviewerList: state => {
            state.refreshInterviewerList = false;
            console.log("In reducer resetRefreshInterviewerList");
        },
    },
    extraReducers: (builder) => {
    // fetch getInterviewerList
    builder.addCase(getInterviewerList.pending, (state) => {
        state.interviewerListLoading ="pending";
      });
      builder.addCase(getInterviewerList.fulfilled, (state, action) => {
        state.interviewerListLoading = "complete_success";
        state.interviewerList = action.payload;
        state.interviewerListError = "";
      });
      builder.addCase(getInterviewerList.rejected, (state, action) => {
        state.interviewerListLoading = "complete_failure";
        state.interviewerList = [];
        state.interviewerListError = action.error.message;
      });

      // fetch getInterviewerDetail
    builder.addCase(getInterviewerDetail.pending, (state) => {
        state.interviewerDetailLoading = true;
      });
      builder.addCase(getInterviewerDetail.fulfilled, (state, action) => {
        state.interviewerDetailLoading = "complete_success";
        state.interviewerDetail = action.payload;
        state.interviewerDetailError = "";
      });
      builder.addCase(getInterviewerDetail.rejected, (state, action) => {
        state.interviewerDetailLoading = "complete_failure";
        state.interviewerDetail ={};
        state.interviewerDetailError = action.error.message;
      });

      // addInterviewer
    builder.addCase(addInterviewer.pending, (state) => {
        state.updateInterviewerLoading ="pending";
      });
      builder.addCase(addInterviewer.fulfilled, (state, action) => {
        state.updateInterviewerLoading ="complete_success";
        state.interviewerDetail = action.payload;
        state.updateInterviewerError = "";
      });
      builder.addCase(addInterviewer.rejected, (state, action) => {
        state.updateInterviewerLoading = "complete_failure";
        state.interviewerDetail = {};
        state.updateInterviewerError = action.error.message;
      });

      // updateInterviewer
    builder.addCase(updateInterviewer.pending, (state) => {
        state.updateInterviewerLoading ="pending";
      });
      builder.addCase(updateInterviewer.fulfilled, (state, action) => {
        state.updateInterviewerLoading = "complete_success";
        state.interviewerDetail = action.payload;
        state.updateInterviewerError = "";
      });
      builder.addCase(updateInterviewer.rejected, (state, action) => {
        state.updateInterviewerLoading ="complete_failure";
        state.interviewerDetail = {};
        state.updateInterviewerError = action.error.message;
      });

      // deleteInterviewer
    builder.addCase(deleteInterviewer.pending, (state) => {
        state.updateInterviewerLoading ="pending";
      });
      builder.addCase(deleteInterviewer.fulfilled, (state, action) => {
        state.updateInterviewerLoading = "complete_success";
        state.deleteInterviewerResult = action.payload;
        state.updateInterviewerError = "";
      });
      builder.addCase(deleteInterviewer.rejected, (state, action) => {
        state.updateInterviewerLoading = "complete_failure";
        state.deleteInterviewerResult = {};
        state.updateInterviewerError = action.error.message;
      });

     // fetch getInterviewerFilterList
      builder.addCase(getInterviewerFilterList.pending, (state) => {
        state.interviewerFilterListLoading = "pending";
      });
      builder.addCase(getInterviewerFilterList.fulfilled, (state, action) => {
        state.interviewerFilterListLoading = "complete_success";
        state.interviewerCount=action.payload.count;
        state.interviewerFilterList = action.payload.results;
        state.interviewerFilterListError = "";
      });
      builder.addCase(getInterviewerFilterList.rejected, (state, action) => {
        state.interviewerFilterListLoading ="complete_failure";
        state.interviewerFilterList = [];
        state.interviewerFilterListError = action.error.message;
      });

    },
});

export const { resetInterviewerDetails,setRefreshInterviewerList,resetRefreshInterviewerList, } = interviewerSlice.actions

export default interviewerSlice.reducer;