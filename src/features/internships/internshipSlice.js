import api from "../../utils/httpCommon";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const end_point = "internships/";

const initialState = {
  getInternshipLoading: "init",
  getInternshipError: "",

  addInternshipLoading: "init",
  addInternshipError: "",
  updateInternshipLoading: "init",
  updateInternshipError: "",

  internshipDetail: {},

  getInternShipListLoading: "init",
  getInternShipListError: "",

  listInternShip: [],
  refreshInternshipList:false,
 
  internshipFilterListLoading: false,
  internshipFilterListError:"",
  internshipFilterList: [],
  
  internshipCount:0,
};


//For listing internship records to table
export const getInternShipList = createAsyncThunk(
  "internship/getInternShipList",
  () => {
    return api
      .get(end_point + "internships")
      .then((response) => response.data);
  }
);

//to get individual internship record from database
export const getInternship = createAsyncThunk(
  "internship/getInternship",
  (id) => {
    return api
      .get(end_point + "internships/" + id)
      .then((response) => response.data);
  }
);

//push data from internship Form to Database
export const addInternship = createAsyncThunk(
  "internship/addInternship",
  (post_data) => {
    return api
      .post(end_point + "internships", post_data)
      .then((response) => response.data);
  }
);

//update data for internship records
export const updateInternship = createAsyncThunk(
  "internship/updateInternship",
  async (data) => {
    const response = await api.put(
      end_point + "internships/" + data[1] ,
      data[0]
    );
    return response.data;
  }
);

export const getInternshipFilterList = createAsyncThunk("internship/getInternshipFilterList", (data) => {
  return api.get("search/internships/?"+data).then((response) => response.data);
}); 

const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    resetInternshipDetails: state => {
      state.internshipDetail = {},
        state.listInternShip = [],
       
        console.log("In reducer resetInternshipDetails");
    },
    setRefreshInternshipList: state => {
      state.refreshInternshipList = true;
      console.log("In reducer setRefreshInternshipList");
    },
    resetRefreshInternshipList: state => {
      state.refreshInternshipList = false;
      console.log("In reducer resetRefreshInternshipList");
    },
  },

  extraReducers: (builder) => {
    // fetch getInternship By Id
    builder.addCase(getInternship.pending, (state) => {
      state.getInternshipLoading = "pending";
    });
    builder.addCase(getInternship.fulfilled, (state, action) => {
      state.getInternshipLoading = "complete_success";
      state.internshipDetail = action.payload;
      // state.listLocations = action.payload.locations;
      state.getInternshipError = "";
    });
    builder.addCase(getInternship.rejected, (state, action) => {
      state.getInternshipLoading = "complete_failure";
      state.internshipDetail = {};
      state.getInternshipError = action.error.message;
    });

    // addInternship
    builder.addCase(addInternship.pending, (state) => {
      state.updateInternshipLoading = "pending";
    });
    builder.addCase(addInternship.fulfilled, (state, action) => {
      state.updateInternshipLoading = "complete_success";
      state.internshipDetail = action.payload;
      state.updateInternshipError = "";
    });
    builder.addCase(addInternship.rejected, (state, action) => {
      state.updateInternshipLoading = "complete_failure";
      state.internshipDetail = {};
      state.updateInternshipError = action.error.message;
    });

    // update Internship
    builder.addCase(updateInternship.pending, (state) => {
      state.updateInternshipLoading = "pending";
    });
    builder.addCase(updateInternship.fulfilled, (state, action) => {
      state.updateInternshipLoading = "complete_success";
      state.internshipDetail = action.payload;
      state.updateInternshipError = "";
    });
    builder.addCase(updateInternship.rejected, (state, action) => {
      state.updateInternshipLoading = "complete_failure";
      state.internshipDetail = {};
      state.updateInternshipError = action.error.message;
    });

    // fetch getInternShipList
    builder.addCase(getInternShipList.pending, (state) => {
      state.getInternShipListLoading = "pending";
    });
    builder.addCase(getInternShipList.fulfilled, (state, action) => {
      state.getInternShipListLoading = "complete_success";
      state.listInternShip = action.payload;
      state.getInternShipListError = "";
    });
    builder.addCase(getInternShipList.rejected, (state, action) => {
      state.getInternShipListLoading = "complete_failure";
      state.listInternShip = [];
      state.getInternShipListError = action.error.message;
    });

    builder.addCase(getInternshipFilterList.pending, (state) => {
      state.internshipFilterListLoading = "pending";
    });
    builder.addCase(getInternshipFilterList.fulfilled, (state, action) => {
      state.internshipFilterListLoading = "complete_success";
      state.internshipCount=action.payload.count;
      state.internshipFilterList = action.payload.results;
      state.internshipFilterListError = "";
    });
    builder.addCase(getInternshipFilterList.rejected, (state, action) => {
      state.internshipFilterListLoading ="complete_failure";
      state.internshipFilterList = [];
      state.internshipFilterListError = action.error.message;
    });


  },
});
export const {resetInternshipDetails,setRefreshInternshipList,resetRefreshInternshipList,refreshInternshipList }=internshipSlice.actions
export default internshipSlice.reducer;
