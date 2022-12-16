import api from "../../utils/httpCommon";
//import useApiPrivate from "../../utils/useApiPrivate";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const end_point = "candidates/";

const initialState = {
  candidateError: "",
  getFresherCandidateListLoading: "init",
  getExpCandListLoading: "init",
  candidateLoading: "init",
  updateCandidateLoading: "init",
  fresherDashboardLoading: "init",
  expDashboardLoading: "init",

  candidateDetail: {},
  listFresherCandidates: [],
  listExperienceCandidates: [],
  listAcademicInfo: [],
  listProject: [],
  deleteCandidateResult: {},
  fresherDashboardData: {},
  expDashboardData: {},
  fresherCandidateList: [],
  expCandidateList: [],
  CandidateList: [],

  fresherCandidateCount: 0,
  expCandidateCount: 0,
  refreshCandList: false,
};

export const getCandidate = createAsyncThunk("candidate/getCandidate", (id) => {
  // const api = useApiPrivate();
  return api.get(end_point + id).then((response) => response.data);
});

export const addCandidate = createAsyncThunk(
  "candidate/addCandidate",
  async (post_data) => {
    // try{//{rejectWithValue}
      // const api = useApiPrivate();
      const response = await api.post(end_point, post_data);
      return response.data;
    // } catch(error) {
    //     if (error.response && error.response.data.message) {
    //       print("rejected*********************")
    //       print(rejectWithValue(error.response.data.message))
    //       return rejectWithValue(error.response.data.message)
    //     } else {
    //       print("rejected*********************")
    //       print(rejectWithValue(error.message))
    //       return rejectWithValue(error.message)
    //     }
    // }
    
  }
);

export const updateCandidate = createAsyncThunk(
  "candidate/updateCandidate",
  async (data) => {
    // console.log("request data: " + JSON.stringify(data[0]) + "id:" + data[1]);
    // const api = useApiPrivate();
     const response = await api.put(end_point + data[1] + '/', data[0]);
     return response.data;
  }
);

export const deleteCandidate = createAsyncThunk("candidate/deleteCandidate", (id) => {
  return api.delete(end_point + id).then((response) => response.data);
});

export const addAcademicInfo = createAsyncThunk(
  "candidate/addAcademicInfo",
  async (data) => {
    // const api = useApiPrivate();
    const response = await api
      .post(end_point + "academics", data);
      // console.log("response.data: "+ response.data + JSON.stringify(response.data));
      // var a=[];
      // a.push(response.data)
    return response.data;
  }
);

export const updateAcademicInfo = createAsyncThunk(
  "candidate/updateAcademicInfo",
  async (data) => {
    // const api = useApiPrivate();
    const response = await api
      .put(end_point + "academics/" + data[1], data[0]);
    return response.data;
  }
);

export const deleteAcademicInfo = createAsyncThunk("candidate/deleteAcademicInfo", (id) => {
  return api.delete(end_point + "academics/" + id).then((response) => response.data);
});

export const addProject = createAsyncThunk(
  "candidate/addProject",
  (post_data) => {
    // const api = useApiPrivate();
    return api
      .post(end_point + "projects", post_data)
      .then((response) => response.data);
  }
);

export const updateProject = createAsyncThunk(
  "candidate/updateProject",
  async (data) => {
    // const api = useApiPrivate();
    const response = await api
      .put(end_point + "projects/" + data[1], data[0]);
    return response.data;
  }
);

export const deleteProject = createAsyncThunk("candidate/deleteProject", (id) => {
  return api.delete(end_point + "projects/" + id).then((response) => response.data);
});

//Experience Candidate Filter
export const getExpCandidateFilterList = createAsyncThunk("candidate/getExpCandidateFilterList", async (data) => {
  // const api = useApiPrivate();
  const response = await api.get("search/candidates/?" + data);
  if (data.includes("&name__wildcard=")){        
    let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
      data= data.substring(0, data.lastIndexOf("&name__wildcard="));
    let data_part2 = data1.substring(data1.indexOf("=") , data1.indexOf("*"));
      if(data1.includes("&")){
          data= data+ data1.substring(data1.indexOf("&"), data1.length);
      }
  
      let data2 = data + "&email__wildcard"+ data_part2 +"*";
      const response1 = await api.get("search/candidates/?" + data2);
      for (let index = 0; index < response1.data.results.length; index++) { 
        let element = response1.data.results[index];
        let flag=false;
        for (let index1 = 0; index1 < response.data.results.length; index1++) {
          let element1 = response.data.results[index1];
          if(element.id == element1.id){
            flag = true;
          }
        }
        if(!flag)
        {
          response.data.results.push(element);
          response.data.count +=1;
        }
      }  
      let data3 = data + "&mobile__wildcard"+ data_part2 +"*";
      const response2 = await api.get("search/candidates/?" + data3);
      for (let index = 0; index < response2.data.results.length; index++) { 
        let element = response2.data.results[index];
        let flag=false;
        for (let index1 = 0; index1 < response.data.results.length; index1++) {
          let element1 = response.data.results[index1];
          if(element.id == element1.id){
            flag = true;
          }
        }
        if(!flag)
        {
          response.data.results.push(element);
          response.data.count +=1;
        }
      }            
  }
  return response.data;
});

//Freshers Candidate Filter
export const getFresherCandidateFilterList = createAsyncThunk("candidate/getFresherCandidateFilterList", async (data) => {
  // const api = useApiPrivate();
//  return api.get("search/candidates/?" + data).then((response) => response.data);
const response = await api.get("search/candidates/?" + data);
if (data.includes("&name__wildcard=")){        
  let data1= data.substring(data.lastIndexOf("name__wildcard="), data.length) ;
    data= data.substring(0, data.lastIndexOf("&name__wildcard="));
  let data_part2 = data1.substring(data1.indexOf("=") , data1.indexOf("*"));
    if(data1.includes("&")){
        data= data+ data1.substring(data1.indexOf("&"), data1.length);
    }

    let data2 = data + "&email__wildcard"+ data_part2 +"*";
    const response1 = await api.get("search/candidates/?" + data2);
    for (let index = 0; index < response1.data.results.length; index++) { 
      let element = response1.data.results[index];
      let flag=false;
      for (let index1 = 0; index1 < response.data.results.length; index1++) {
        let element1 = response.data.results[index1];
        if(element.id == element1.id){
          flag = true;
        }
      }
      if(!flag)
      {
        response.data.results.push(element);
        response.data.count +=1;
      }
    }  
    let data3 = data + "&mobile__wildcard"+ data_part2 +"*";
    const response2 = await api.get("search/candidates/?" + data3);
    for (let index = 0; index < response2.data.results.length; index++) { 
      let element = response2.data.results[index];
      let flag=false;
      for (let index1 = 0; index1 < response.data.results.length; index1++) {
        let element1 = response.data.results[index1];
        if(element.id == element1.id){
          flag = true;
        }
      }
      if(!flag)
      {
        response.data.results.push(element);
        response.data.count +=1;
      }
    }            
}
return response.data;
});

//Experience Candidate Filter
export const getExpCandidateList = createAsyncThunk("candidate/getExpCandidateList", async () => {
  // const api = useApiPrivate();
  const response = await api.get("candidates/experience" );
  return response.data;
});

//Fresher Candidate Filter
export const getFresherCandidateList = createAsyncThunk("candidate/getFresherCandidateList", async () => {
  // const api = useApiPrivate();
  const response = await api.get("candidates");
  return response.data;
});

//Candidate autocomplete search
export const getFresherCandidateList_auto = createAsyncThunk("candidate/getFresherCandidateList_auto", async (data) => {
  const response = await api.get("search/autocomplete?q=" + data);
  return response.data;
})

export const getFresherDashboard = createAsyncThunk("candidate/getFresherDashboard", () => {
  // const api = useApiPrivate();
  return api.get("search/dashboard").then((response) => response.data);
});

export const getExpCandidateDashboard = createAsyncThunk("candidate/getExpCandidateDashboard", () => {
  // const api = useApiPrivate();
  return api.get("search/expdashboard").then((response) => response.data);
});

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    resetCandidateDetails: state => {
       state.candidateDetail = {};
       state.listAcademicInfo = [];
       state.listProject = [];
       state.updateCandidateLoading = "init";
       console.log("In reducer resetCandidateDetails");
    },

    setRefreshCandList: state => {
      state.refreshCandList = true;
    },
    resetRefreshCandList: state => {
      state.refreshCandList = false;
    },
  },
  extraReducers: (builder) => {
     // fetch getFresherCandidateFilterList for filters
     builder.addCase(getFresherCandidateFilterList.pending, (state) => {
      state.getFresherCandidateListLoading = "pending";
    });
    builder.addCase(getFresherCandidateFilterList.fulfilled, (state, action) => {
      state.getFresherCandidateListLoading = "complete_success";
      state.fresherCandidateCount = action.payload.count;
      state.listFresherCandidates = action.payload.results;
      state.candidateError = "";
    });
    builder.addCase(getFresherCandidateFilterList.rejected, (state, action) => {
      state.getFresherCandidateListLoading = "complete_failure";
      state.listFresherCandidates = [];
      state.candidateError = action.error.message;
    });

     // fetch getFresherCandidateFilterList for autocomplete search
    builder.addCase(getFresherCandidateList_auto.pending, (state) => {
      state.getFresherCandidateListLoading = "pending";
    });
    builder.addCase(getFresherCandidateList_auto.fulfilled, (state, action) => {
      state.getFresherCandidateListLoading = "complete_success";
      state.fresherCandidateCount = action.payload.count;
      state.listFresherCandidates = action.payload.results;
      state.candidateError = "";
    });
    builder.addCase(getFresherCandidateList_auto.rejected, (state, action) => {
      state.getFresherCandidateListLoading = "complete_failure";
      state.listFresherCandidates = [];
      state.candidateError = action.error.message;
    });

    // fetch getExperienceCandidateList for filters
    builder.addCase(getExpCandidateFilterList.pending, (state) => {
      state.getExpCandListLoading = "pending";
    });
    builder.addCase(getExpCandidateFilterList.fulfilled, (state, action) => {
      state.getExpCandListLoading = "complete_success";
      state.expCandidateCount = action.payload.count;
      state.listExperienceCandidates = action.payload.results;
      state.candidateError = "";
    });
    builder.addCase(getExpCandidateFilterList.rejected, (state, action) => {
      state.getExpCandListLoading = "complete_failure";
      state.expCandidateCount=0;
      state.listExperienceCandidates = [];
      state.candidateError = action.error.message;
    });

    // fetch getFresherCandidateList
    builder.addCase(getFresherCandidateList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getFresherCandidateList.fulfilled, (state, action) => {
      state.loading = "complete_success";
      state.fresherCandidateList = action.payload;
      state.candidateError = "";
    });
    builder.addCase(getFresherCandidateList.rejected, (state, action) => {
      state.loading = "complete_failure";
      state.fresherCandidateList = [];
      state.candidateError = action.error.message;
    });

    // fetch getExpCandidateList
    builder.addCase(getExpCandidateList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getExpCandidateList.fulfilled, (state, action) => {
      state.loading = "complete_success";
      state.expCandidateList = action.payload;
      state.candidateError = "";
    });
    builder.addCase(getExpCandidateList.rejected, (state, action) => {
      state.loading = "complete_failure";
      state.expCandidateList = [];
      state.candidateError = action.error.message;
    });

    // fetch candidate By Id
    builder.addCase(getCandidate.pending, (state) => {
      state.candidateLoading = "pending";
    });
    builder.addCase(getCandidate.fulfilled, (state, action) => {
      state.candidateLoading = "complete_success";
      state.candidateDetail = action.payload;
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.listAcademicInfo = action.payload.academics;
      state.listProject = action.payload.projects;
      state.candidateError = "";
    });
    builder.addCase(getCandidate.rejected, (state, action) => {
      state.candidateLoading = "complete_failure";
      state.candidateDetail = {};
      state.candidateError = action.error.message;
    });

    // add candidate
    builder.addCase(addCandidate.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(addCandidate.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      state.candidateDetail = action.payload;
      // console.log("action", action);
      // console.log("action.payload", action.payload);
      state.candidateError = "";
    });
    builder.addCase(addCandidate.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.candidateDetail = {};
      state.candidateError = action.error.message;
      console.log("action",action)
    });

    // update candidate
    builder.addCase(updateCandidate.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(updateCandidate.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      state.candidateDetail = action.payload;
      console.log("action", action);
      console.log("action.payload", action.payload);
      state.candidateError = "";
    });
    builder.addCase(updateCandidate.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.candidateDetail = {};
      state.candidateError = action.error.message;
    });

    // delete candidate
    builder.addCase(deleteCandidate.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(deleteCandidate.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      state.deleteCandidateResult = action.payload;
      state.candidateError = "";
    });
    builder.addCase(deleteCandidate.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.deleteCandidateResult = {};
      state.candidateError = action.error.message;
    });

    // add academic info
    builder.addCase(addAcademicInfo.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(addAcademicInfo.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      // state.listAcademicInfo.push(action.payload);
      state.listAcademicInfo = action.payload;
      state.candidateError = "";
    });
    builder.addCase(addAcademicInfo.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listAcademicInfo = [];
      state.candidateError = action.error.message;
    });

    // update academic info
    builder.addCase(updateAcademicInfo.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(updateAcademicInfo.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      // state.listAcademicInfo = state.listAcademicInfo.map(obj => {
      //   if (obj.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return obj;
      // });
      state.listAcademicInfo = action.payload;
      state.candidateError = "";
    });
    builder.addCase(updateAcademicInfo.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listAcademicInfo = [];
      state.candidateError = action.error.message;
    });

     // delete academic info
    builder.addCase(deleteAcademicInfo.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(deleteAcademicInfo.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      state.listAcademicInfo = action.payload;
      state.candidateError = "";
    });
    builder.addCase(deleteAcademicInfo.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listAcademicInfo = [];
      state.candidateError = action.error.message;
    });

    // add Project info
    builder.addCase(addProject.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      // state.listProject.push(action.payload);
      state.listProject = action.payload;
      state.candidateError = "";
    });
    builder.addCase(addProject.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listProject = [];
      state.candidateError = action.error.message;
    });

    // update Project info
    builder.addCase(updateProject.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(updateProject.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      // state.listProject= state.listProject.map(obj => {
      //   if (obj.id === action.payload.id) {
      //     return action.payload;
      //   }
      //   return obj;
      // });
      state.listProject = action.payload;
      state.candidateError = "";
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listProject = [];
      state.candidateError = action.error.message;
    });

    // delete project info
    builder.addCase(deleteProject.pending, (state) => {
      state.updateCandidateLoading = "pending";
    });
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.updateCandidateLoading = "complete_success";
      state.listProject = action.payload;
      state.candidateError = "";
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.updateCandidateLoading = "complete_failure";
      state.listProject = [];
      state.candidateError = action.error.message;
    });
    
    // fetch getFresherDashboard
    builder.addCase(getFresherDashboard.pending, (state) => {
      state.fresherDashboardLoading = "pending";
    });
    builder.addCase(getFresherDashboard.fulfilled, (state, action) => {
      state.fresherDashboardLoading = "complete_success";
      state.fresherDashboardData = action.payload;
      state.candidateError = "";
    });
    builder.addCase(getFresherDashboard.rejected, (state, action) => {
      state.fresherDashboardLoading = "complete_failure";
      state.fresherDashboardData = {};
      state.candidateError = action.error.message;
    });

    // fetch getExpCandidateDashboard
    builder.addCase(getExpCandidateDashboard.pending, (state) => {
      state.expDashboardLoading = "pending";
    });
    builder.addCase(getExpCandidateDashboard.fulfilled, (state, action) => {
      state.expDashboardLoading = "complete_success";
      state.expDashboardData = action.payload;
      state.candidateError = "";
    });
    builder.addCase(getExpCandidateDashboard.rejected, (state, action) => {
      state.expDashboardLoading = "complete_failure";
      state.expDashboardData = {};
      state.candidateError = action.error.message;
    });
  },
});

export const { resetCandidateDetails, setRefreshCandList, resetRefreshCandList, resetupdateCandidateLoading } = candidateSlice.actions
// export const { resetExpCandidateListLoading } = candidateSlice.actions

export default candidateSlice.reducer;