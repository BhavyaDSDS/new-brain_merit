import api from "../../utils/httpCommon";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { objectLength } from "./utils/JavaScriptUtils";

const end_point = "";

const initialState = {
    loading: false,
    locationsList: [],
    countryCodeList: [],
    skillsList:[],
    ntskillsList:[],
    degreesList:[],
    branchsList:[],
    instituteList:[],
    roleList:[],
    domainList:[],
    candDomainList:[],
    freshercustomFilterList:[],
    expcustomFilterList:[],
    customFilterDetail: {},
    customFilterListLoading: "init",
    customFilterDetailLoading: "init",
    addCustomFilterLoading: "init",
    updateCustomFilterLoading: "init",
    deleteCustomFilterLoading: "init",
    customFilterListError:"",
    customFilterDetailError:"",
    error: "",
  };

  export const getLocationList = createAsyncThunk("utils/getLocationList", () => {
    return api.get("commons/locations/").then((response) => response.data);
  });
  export const getCountryCodeList = createAsyncThunk("utils/getCountryCodeList", () => {
    return api.get("commons/countrycodes/").then((response) => response.data);
  });
  
  export const getSkillList = createAsyncThunk("utils/getSkillList", () => {
    return api.get("commons/techskills/").then((response) => response.data);
  });

  export const getNtSkillList = createAsyncThunk("utils/getNtSkillList", () => {
    return api.get("commons/nontechskills/").then((response) => response.data);
  });
  
  export const getDegreeList = createAsyncThunk("utils/getDegreeList", () => {
    return api.get("commons/degrees/").then((response) => response.data);
  });
  
  export const getBranchList = createAsyncThunk("utils/getBranchList", () => {
    return api.get("commons/branchs/").then((response) => response.data);
  });
  
  export const getInstituteList = createAsyncThunk("utils/getInstituteList", () => {
    return api.get("institutes/").then((response) => response.data);
  });

  export const getRoleList = createAsyncThunk("utils/getRoleList", () => {
    return api.get("commons/roles/").then((response) => response.data);
  });

  export const getLocationSearchList = createAsyncThunk("utils/getLocationSearchList", (str) => {
    return api.get("location-search/"+ str).then((response) => response.data);
  });

  export const getDomainList = createAsyncThunk("utils/getDomainList", () => {
    return api.get("commons/emp_domains/").then((response) => response.data);
  });

  export const getCandDomainList = createAsyncThunk("utils/getCandDomainList", () => {
    return api.get("commons/cand_domains/").then((response) => response.data);
  });

  export const getFresherCustomFilterList = createAsyncThunk("utils/getFresherCustomFilterList", () => {
    return api.get("commons/customfilterslist/fresher").then((response) => response.data);
  });

  export const getExpCustomFilterList = createAsyncThunk("utils/getExpCustomFilterList", () => {
    return api.get("commons/customfilterslist/experienced").then((response) => response.data);
  });

  export const addCustomFilter = createAsyncThunk("utils/addCustomFilter",(data) => {
      return api.post("commons/customfilterslist/", data).then((response) => response.data);
    }
  );

  export const getcustomFilter = createAsyncThunk("utils/getcustomFilter", (id) => {
    return api.get("commons/customfilters/" + id).then((response) => response.data);
  });

  export const updatecustomFilter = createAsyncThunk("utils/updatecustomFilter", (data) => {
    return api.put("commons/customfilters/" + data[1] , data[0]).then((response) => response.data);
  });

  export const deleteExpcustomFilter = createAsyncThunk("utils/deleteExpcustomFilter", (id) => {
    return api.delete("commons/customfilters/" + id).then((response) => response.data);
  });

  export const deleteFreshercustomFilter = createAsyncThunk("utils/deleteFreshercustomFilter", (id) => {
    return api.delete("commons/customfilters/" + id).then((response) => response.data);
  });

  const componentsSlice = createSlice({
    name: "utils",
    initialState,
    extraReducers: (builder) => {
       // fetch Locations List
       builder.addCase(getLocationList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getLocationList.fulfilled, (state, action) => {
        state.loading = false;
        state.locationsList = action.payload;
        state.error = "";
      });
      builder.addCase(getLocationList.rejected, (state, action) => {
        state.loading = false;
        state.locationsList = [];
        state.error = action.error.message;
      });

       // fetch CountryCode List
       builder.addCase(getCountryCodeList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getCountryCodeList.fulfilled, (state, action) => {
        state.loading = false;
        state.countryCodeList = action.payload;
        state.error = "";
      });
      builder.addCase(getCountryCodeList.rejected, (state, action) => {
        state.loading = false;
        state.countryCodeList = [];
        state.error = action.error.message;
      });

        // fetch Locations Search List
      builder.addCase(getLocationSearchList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getLocationSearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.locationsList = action.payload;
        state.error = "";
      });
      builder.addCase(getLocationSearchList.rejected, (state, action) => {
        state.loading = false;
        state.locationsList = [];
        state.error = action.error.message;
      });
  
      //fetch Skills List
      builder.addCase(getSkillList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getSkillList.fulfilled, (state, action) => {
        state.loading = false;
        state.skillsList = action.payload;
        state.error = "";
      });
      builder.addCase(getSkillList.rejected, (state, action) => {
        state.loading = false;
        state.skillsList = {};
        state.error = action.error.message;
      });

        //fetch Skills List
        builder.addCase(getNtSkillList.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getNtSkillList.fulfilled, (state, action) => {
          state.loading = false;
          state.ntskillsList = action.payload;
          state.error = "";
        });
        builder.addCase(getNtSkillList.rejected, (state, action) => {
          state.loading = false;
          state.ntskillsList = {};
          state.error = action.error.message;
        });
  
      // fetch Degrees List
      builder.addCase(getDegreeList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getDegreeList.fulfilled, (state, action) => {
        state.loading = false;
        state.degreesList = action.payload;
        state.error = "";
      });
      builder.addCase(getDegreeList.rejected, (state, action) => {
        state.loading = false;
        state.degreesList = [];
        state.error = action.error.message;
      });
  
      //fetch Branch List
      builder.addCase(getBranchList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getBranchList.fulfilled, (state, action) => {
        state.loading = false;
        state.branchsList = action.payload;
        state.error = "";
      });
      builder.addCase(getBranchList.rejected, (state, action) => {
        state.loading = false;
        state.branchsList = {};
        state.error = action.error.message;
      });
      
      //fetch Institutes List
      builder.addCase(getInstituteList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getInstituteList.fulfilled, (state, action) => {
        state.loading = false;
        state.instituteList = action.payload;
        state.error = "";
      });
      builder.addCase(getInstituteList.rejected, (state, action) => {
        state.loading = false;
        state.instituteList = [];
        state.error = action.error.message;
      });

      //fetch Job Roles List
      builder.addCase(getRoleList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getRoleList.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload;
        state.error = "";
      });
      builder.addCase(getRoleList.rejected, (state, action) => {
        state.loading = false;
        state.roleList = {};
        state.error = action.error.message;
      });

       //fetch Domain List
      builder.addCase(getDomainList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getDomainList.fulfilled, (state, action) => {
        state.loading = false;
        state.domainList = action.payload;
        state.error = "";
      });
      builder.addCase(getDomainList.rejected, (state, action) => {
        state.loading = false;
        state.domainList = {};
        state.error = action.error.message;
      });

      //fetch Candidate Domain List
      builder.addCase(getCandDomainList.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getCandDomainList.fulfilled, (state, action) => {
        state.loading = false;
        state.candDomainList = action.payload;
        state.error = "";
      });
      builder.addCase(getCandDomainList.rejected, (state, action) => {
        state.loading = false;
        state.candDomainList = {};
        state.error = action.error.message;
      });

        // fetch Fresher candidate customFiltersList
      builder.addCase(getFresherCustomFilterList.pending, (state) => {
        state.customFilterListLoading = "pending";
      });
      builder.addCase(getFresherCustomFilterList.fulfilled, (state, action) => {
        state.customFilterListLoading = "complete_success";
        state.freshercustomFilterList = action.payload;
        state.customFilterListError = "";
      });
      builder.addCase(getFresherCustomFilterList.rejected, (state, action) => {
        state.customFilterListLoading = "complete_failure";
        state.freshercustomFilterList = [];
        state.customFilterListError = action.error.message;
      });

      // fetch experienced candidates customFiltersList
      builder.addCase(getExpCustomFilterList.pending, (state) => {
        state.customFilterListLoading = "pending";
      });
      builder.addCase(getExpCustomFilterList.fulfilled, (state, action) => {
        state.customFilterListLoading = "complete_success";
        state.expcustomFilterList = action.payload;
        state.customFilterListError = "";
      });
      builder.addCase(getExpCustomFilterList.rejected, (state, action) => {
        state.customFilterListLoading = "complete_failure";
        state.expcustomFilterList = [];
        state.customFilterListError = action.error.message;
      });

      // fetch customFilter By Id
      builder.addCase(getcustomFilter.pending, (state) => {
        state.customFilterDetailLoading = "pending";
      });
      builder.addCase(getcustomFilter.fulfilled, (state, action) => {
        state.customFilterDetailLoading = "complete_success";
        state.customFilterDetail = action.payload;
        state.customFilterDetailError = "";
      });
      builder.addCase(getcustomFilter.rejected, (state, action) => {
        state.customFilterDetailLoading = "complete_failure";
        state.customFilterDetail = {};
        state.customFilterDetailError = action.error.message;
      });

      // add customFilter
      builder.addCase(addCustomFilter.pending, (state) => {
        state.addCustomFilterLoading = "pending";
      });
      builder.addCase(addCustomFilter.fulfilled, (state, action) => {
        state.addCustomFilterLoading = "complete_success";
        state.customFilterDetail = action.payload;
        if(action.payload.type == "fresher_cand")
        state.freshercustomFilterList.push(action.payload);
        else
        state.expcustomFilterList.push(action.payload);
        state.customFilterDetailError = "";
      });
      builder.addCase(addCustomFilter.rejected, (state, action) => {
        state.addCustomFilterLoading = "complete_failure";
        state.customFilterDetail = {};
        state.customFilterDetailError = action.error.message;
      });

      // update customFilter
      builder.addCase(updatecustomFilter.pending, (state) => {
        state.updateCustomFilterLoading = "pending";
      });
      builder.addCase(updatecustomFilter.fulfilled, (state, action) => {
        state.updateCustomFilterLoading = "complete_success";
        state.customFilterDetail = action.payload;
        if(action.payload.type == "fresher_cand")
        state.freshercustomFilterList = state.freshercustomFilterList.map(obj => {
          if (obj.id === action.payload.id) {
            return action.payload;
          }
          return obj;
        });
        else
        state.expcustomFilterList = state.expcustomFilterList.map(obj => {
          if (obj.id === action.payload.id) {
            return action.payload;
          }
          return obj;
        });
        state.customFilterDetailError = "";
      });
      builder.addCase(updatecustomFilter.rejected, (state, action) => {
        state.updateCustomFilterLoading = "complete_failure";
        state.customFilterDetail = {};
        state.customFilterDetailError = action.error.message;
      });

      // delete customFilter
      builder.addCase(deleteExpcustomFilter.pending, (state) => {
        state.deleteCustomFilterLoading = "pending";
      });
      builder.addCase(deleteExpcustomFilter.fulfilled, (state, action) => {
        state.deleteCustomFilterLoading = "complete_success";
        state.expcustomFilterList = action.payload;
        state.customFilterDetailError = "";
      });
      builder.addCase(deleteExpcustomFilter.rejected, (state, action) => {
        state.deleteCustomFilterLoading = "complete_failure";
        state.expcustomFilterList = {};
        state.customFilterDetailError = action.error.message;
      });

       // delete customFilter
      builder.addCase(deleteFreshercustomFilter.pending, (state) => {
        state.deleteCustomFilterLoading = "pending";
      });
      builder.addCase(deleteFreshercustomFilter.fulfilled, (state, action) => {
        state.deleteCustomFilterLoading = "complete_success";
        state.freshercustomFilterList = action.payload;
        state.customFilterDetailError = "";
      });
      builder.addCase(deleteFreshercustomFilter.rejected, (state, action) => {
        state.deleteCustomFilterLoading = "complete_failure";
        state.freshercustomFilterList = {};
        state.customFilterDetailError = action.error.message;
      });
    },
});

export default componentsSlice.reducer;