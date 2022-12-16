import api from "../../utils/httpCommon";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const end_point = "employers/";

const initialState = {
  getEmployerListLoading: "init",
  getEmployerListError: "",

  employerLoading: "init",
  employerError: "",

  updateEmployerLoading: "init",
  updateEmployerError: "",

  employerDetail: {},
  listEmployers: [],
  listLocations: [],

  deleteEmployerResult: {},
  refreshEmployerList: false,

  employerFilterListLoading: false,
  employerFilterListError: "",
  employerFilterList: [],
  employerFilterCount: 0,
};

export const getEmployerList = createAsyncThunk(
  "employer/getEmployerList",
  () => {
    return api.get(end_point).then((response) => response.data);
  }
);

export const getEmployer = createAsyncThunk("employer/getEmployer", (id) => {
  return api.get(end_point + id).then((response) => response.data);
});

export const addEmployer = createAsyncThunk(
  "employer/addEmployer",
  (post_data) => {
    return api.post(end_point, post_data).then((response) => response.data);
  }
);

export const updateEmployer = createAsyncThunk(
  "employer/updateEmployer",
  async (data) => {
    const response = await api.put(end_point + data[1] + "/", data[0]);
    return response.data;
  }
);

export const deleteEmployer = createAsyncThunk("employer/deleteEmployer", async (id) => {
  const response = await api.delete(end_point + id);
  return response.data;
});

export const addLocation = createAsyncThunk(
  "employer/addLocation",
  async (data) => {
    const response = await api.post(end_point + "offices", data);
    return response.data;
  }
);

export const updateLocation = createAsyncThunk(
  "employer/updateLocation",
  async (data) => {
    const response = await api.put(
      end_point + "offices/" + data[1],
      data[0]
    );
    return response.data;
  }
);

export const getEmployerFilterList = createAsyncThunk("employer/getEmployerFilterList", (data) => {
  return api.get("search/employers/?" + data).then((response) => response.data);
});

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    resetEmployerDetails: state => {
      state.employerDetail = {},
        state.listEmployers = [],
        state.listLocations = [],
        console.log("In reducer resetEmployerDetails");
    },
    setRefreshEmployerList: state => {
      state.refreshEmployerList = true;
      console.log("In reducer setRefreshEmployerList");
    },
    resetRefreshEmployerList: state => {
      state.refreshEmployerList = false;
      console.log("In reducer resetRefreshEmployerList");
    },
  },
  extraReducers: (builder) => {
    // fetch getEmployerList
    builder.addCase(getEmployerList.pending, (state) => {
      state.getEmployerListLoading = "pending";
    });
    builder.addCase(getEmployerList.fulfilled, (state, action) => {
      state.getEmployerListLoading = "complete_success";
      state.listEmployers = action.payload;
      state.getEmployerListError = "";
    });
    builder.addCase(getEmployerList.rejected, (state, action) => {
      state.getEmployerListLoading = "complete_failure";
      state.listEmployers = [];
      state.getEmployerListError = action.error.message;
    });

    // fetch employer By Id
    builder.addCase(getEmployer.pending, (state) => {
      state.employerLoading = "pending";
    });
    builder.addCase(getEmployer.fulfilled, (state, action) => {
      state.employerLoading = "complete_success";
      state.employerDetail = action.payload;
      // state.listLocations = action.payload.locations;
      state.employerError = "";
    });
    builder.addCase(getEmployer.rejected, (state, action) => {
      state.employerLoading = "complete_failure";
      state.employerDetail = {};
      state.employerError = action.error.message;
    });

    // add employer
    builder.addCase(addEmployer.pending, (state) => {
      state.updateEmployerLoading = "pending";
    });
    builder.addCase(addEmployer.fulfilled, (state, action) => {
      state.updateEmployerLoading = "complete_success";
      state.employerDetail = action.payload;
      state.updateEmployerError = "";
    });
    builder.addCase(addEmployer.rejected, (state, action) => {
      state.updateEmployerLoading = "complete_failure";
      state.employerDetail = {};
      state.updateEmployerError = action.error.message;
    });

    // update employer
    builder.addCase(updateEmployer.pending, (state) => {
      state.updateEmployerLoading = "pending";
    });
    builder.addCase(updateEmployer.fulfilled, (state, action) => {
      state.updateEmployerLoading = "complete_success";
      state.employerDetail = action.payload;
      state.updateEmployerError = "";
    });
    builder.addCase(updateEmployer.rejected, (state, action) => {
      state.updateEmployerLoading = "complete_failure";
      state.employerDetail = {};
      state.updateEmployerError = action.error.message;
    });

    // delete Employer
    builder.addCase(deleteEmployer.pending, (state) => {
      state.updateEmployerLoading = "pending";
    });
    builder.addCase(deleteEmployer.fulfilled, (state, action) => {
      state.updateEmployerLoading = "complete_success";
      state.deleteEmployerResult = action.payload;
      state.updateEmployerError = "";
    });
    builder.addCase(deleteEmployer.rejected, (state, action) => {
      state.updateEmployerLoading = "complete_failure";
      state.deleteEmployerResult = {};
      state.updateEmployerError = action.error.message;
    });

    // add emp location info
    builder.addCase(addLocation.pending, (state) => {
      state.updateEmployerLoading = "pending";
    });
    builder.addCase(addLocation.fulfilled, (state, action) => {
      state.updateEmployerLoading = "complete_success";
      state.listLocations = action.payload;
      state.updateEmployerError = "";
    });
    builder.addCase(addLocation.rejected, (state, action) => {
      state.updateEmployerLoading = "complete_failure";
      state.listLocations = [];
      state.updateEmployerError = action.error.message;
    });

    // update emp location info
    builder.addCase(updateLocation.pending, (state) => {
      state.updateEmployerLoading = "pending";
    });
    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.updateEmployerLoading = "complete_success";
      state.listLocations = action.payload;
      state.updateEmployerError = "";
    });
    builder.addCase(updateLocation.rejected, (state, action) => {
      state.updateEmployerLoading = "complete_failure";
      state.listLocations = [];
      state.updateEmployerError = action.error.message;
    });

    // fetch getEmployerFilterList
    builder.addCase(getEmployerFilterList.pending, (state) => {
      state.employerFilterListLoading = "pending";
    });
    builder.addCase(getEmployerFilterList.fulfilled, (state, action) => {
      state.employerFilterListLoading = "complete_success";
      state.employerFilterList = action.payload.results;
      state.employerFilterCount = action.payload.count;
      state.employerFilterListError = "";
    });
    builder.addCase(getEmployerFilterList.rejected, (state, action) => {
      state.employerFilterListLoading = "complete_failure";
      state.employerFilterList = [];
      state.employerFilterListError = action.error.message;
    });
  },
});

export const { resetEmployerDetails, setRefreshEmployerList, resetRefreshEmployerList, } = employerSlice.actions

export default employerSlice.reducer;
