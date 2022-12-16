import api from "../../utils/httpCommon";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const end_point = "jobs/";

const initialState = {
  getJobPostingListLoading: "init",
  getJobPostingListError: "",

  getJobPostingLoading: "init",
  getJobPostingError: "",

 // addJobPostingLoading: "init",
 // addJobPostingError: "",
  updateJobPostingLoading: "init",
  updateJobPostingError: "",

  jobPostingFilterListLoading: false,
  jobPostingFilterListError:"",
  jobPostingFilterList: [],
  jobPostingCount:0,

  jobPostingDetail: {},
  listJobPosting: [],

  refreshJobPostingList: false,
  
};
//For listing jobPosting records to table
export const getJobPostingList = createAsyncThunk(
  "job/getJobPostingList",
  () => {
    return api
      .get(end_point + "jobs")
      .then((response) => response.data);
  }
);

//to get individual jobPosting record from database
export const getJobPosting = createAsyncThunk(
  "job/getJobPosting",
  (id) => {
    return api
      .get(end_point + "jobs/" + id)
      .then((response) => response.data);
  }
);

//push data from jobPosting Form to Database
export const addJobPosting = createAsyncThunk(
  "job/addJobPosting",
  (post_data) => {
    return api
      .post(end_point + "jobs", post_data)
      .then((response) => response.data);
  }
);

//update data for jobPosting records
export const updateJobPosting = createAsyncThunk(
  "job/updateJobPosting",
  async (data) => {
    const response = await api.put(
      end_point + "jobs/" + data[1],
      data[0]
    );
    return response.data;
  }
);
export const getJobPostingFilterList = createAsyncThunk("job/getJobPostingFilterList", (data) => {
  return api.get("search/jobs/?"+data).then((response) => response.data);
});

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    resetJobPostingDetails: state => {
      state.jobPostingDetail = {},
        //state.listEmployers = [],
        state.listJobPosting = [],
        console.log("In reducer resetjobPostingDetail");
    },
    setRefreshJobPostingList: state => {
      state.refreshJobPostingList = true;
      console.log("In reducer setRefreshEmployerList");
    },
    resetRefreshJobPostingList: state => {
      state.refreshJobPostingList = false;
      console.log("In reducer resetRefreshJobPostingList");
    },
  },
  extraReducers: (builder) => {
    // fetch getJobPostingList
    builder.addCase(getJobPostingList.pending, (state) => {
      state.getJobPostingListLoading = "pending";
    });
    builder.addCase(getJobPostingList.fulfilled, (state, action) => {
      state.getJobPostingListLoading = "complete_success";
      state.listJobPosting = action.payload;
      state.getJobPostingListError = "";
    });
    builder.addCase(getJobPostingList.rejected, (state, action) => {
      state.getJobPostingListLoading = "complete_failure";
      state.listJobPosting = [];
      state.getJobPostingListError = action.error.message;
    });

    // fetch getJobPosting By Id
    builder.addCase(getJobPosting.pending, (state) => {
      state.getJobPostingLoading = "pending";
    });
    builder.addCase(getJobPosting.fulfilled, (state, action) => {
      state.getJobPostingLoading = "complete_success";
      state.jobPostingDetail = action.payload;
      // state.listLocations = action.payload.locations;
      state.getJobPostingError = "";
    });
    builder.addCase(getJobPosting.rejected, (state, action) => {
      state.getJobPostingLoading = "complete_failure";
      state.jobPostingDetail = {};
      state.getJobPostingError = action.error.message;
    });

    // addJobPosting
    builder.addCase(addJobPosting.pending, (state) => {
    state.updateJobPostingLoading = "pending";
    });
    builder.addCase(addJobPosting.fulfilled, (state, action) => {
      state.updateJobPostingLoading = "complete_success";
      state.jobPostingDetail = action.payload;
     state.updateJobPostingError = "";
    });
    builder.addCase(addJobPosting.rejected, (state, action) => {
     state.updateJobPostingLoading = "complete_failure";
      state.jobPostingDetail = {};
      state.updateJobPostingError = action.error.message;
    });

    // update JobPosting
    builder.addCase(updateJobPosting.pending, (state) => {
      state.updateJobPostingLoading = "pending";
    });
    builder.addCase(updateJobPosting.fulfilled, (state, action) => {
      state.updateJobPostingLoading = "complete_success";
      state.jobPostingDetail = action.payload;
      state.updateJobPostingError = "";
    });
    builder.addCase(updateJobPosting.rejected, (state, action) => {
      state.updateJobPostingLoading = "complete_failure";
      state.jobPostingDetail = {};
      state.updateJobPostingError = action.error.message;
    });

     // fetch getInterviewerFilterList
     builder.addCase( getJobPostingFilterList.pending, (state) => {
      state.jobPostingFilterListLoading = "pending";
    });
    builder.addCase(getJobPostingFilterList.fulfilled, (state, action) => {
      state.jobPostingFilterListLoading = "complete_success";
      state.jobPostingCount=action.payload.count;
      state.jobPostingFilterList = action.payload.results;
      state.jobPostingFilterListError = "";
    });
    builder.addCase(getJobPostingFilterList.rejected, (state, action) => {
      state.jobPostingFilterListLoading ="complete_failure";
      state. jobPostingFilterList = [];
      state. jobPostingFilterListError = action.error.message;
    });

  },
});

export const {refreshJobPostingList,setRefreshJobPostingList,resetRefreshJobPostingList,resetJobPostingDetails}=jobSlice.actions
export default jobSlice.reducer;
