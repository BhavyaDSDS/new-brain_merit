import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../features/candidates/candidateSlice";
import utilsReducer from "../features/components/componentsSlice";
import employerSlice from "../features/employers/employerSlice";
import interviewerSlice from "../features/interviewers/interviewerSlice";
import assessmentSlice from "../features/assessments/assessmentSlice";
import jobSlice from "../features/jobs/jobSlice";
import internshipSlice from "../features/internships/internshipSlice";

const store = configureStore({
  reducer: {
    candidate: candidateReducer,
    utils: utilsReducer,
    employer: employerSlice,
    interviewer: interviewerSlice,
    assessment: assessmentSlice,
    job: jobSlice,
    internship: internshipSlice
  },
});

export default store;
