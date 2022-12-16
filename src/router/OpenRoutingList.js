import React from "react";
import { Route } from "react-router-dom";
import FresherDashboard from "../features/candidates/views/CandidateDetails/CandidateDashboard/FresherDashboard";
import ExpCandidatesDashboard from "../features/candidates/views/CandidateDetails/CandidateDashboard/ExpCandidatesDashboard";
// import AddEmployerDetails from "../features/employers/views/EmployerDetails/AddEmployers/AddEmployerDetails";
import FreshersList from "../features/candidates/views/CandidateDetails/CandidateListing/FreshersList";
import ExpCandidatesList from "../features/candidates/views/CandidateDetails/CandidateListing/ExpCandidatesList";
import AddCandidateStepper from "../features/candidates/views/CandidateDetails/AddCandidates/AddCandidateStepper";
import EmployersList from "../features/employers/views/EmployerDetails/EmployerListing/EmployersList";
import CompleteProfileView from "../features/candidates/views/CandidateDetails/CandidateMainView/CompleteProfileView";
import AddEmployerStepper from "../features/employers/views/EmployerDetails/AddEmployers/AddEmployerStepper";
import EditorPage from "../features/candidates/views/CandidateDetails/CandidateMainView/EditorPage";
import JobPostingList from "../features/jobs/views/JobsDetails/JobPostingList/JobPostingList";
// import InternshipList from "../features/Internship listing/InternshipList";
import InternshipList from "../features/internships/views/InternshipDetails/InternshipList/InternshipList";
// import JobPosting from "../features/employers/views/EmployerDetails/AddEmployers/JobPosting";

import JobPosting from "../features/jobs/views/JobsDetails/AddJobs/JobPosting";
// import InternShip from "../features/employers/views/EmployerDetails/AddEmployers/InternShip";
import InternShip from "../features/internships/views/InternshipDetails/AddInternships/InternShip";


import InterviewersList from "../features/interviewers/views/InterviewersDetails/InterviewersListing/InterviewersList";
import AddInterviewersDetail from "../features/interviewers/views/InterviewersDetails/AddInterviewers/AddInterviewersDetail";
import AssessmentInfo from "../features/assessments/views/AssessmentDetails/AddAssessments/AssessmentInfo";
import AssessmentList from "../features/assessments/views/AssessmentDetails/AssessmentListing/AssessmentList";
import Interviewers from "../features/interviewers/views/InterviewersDetails/AddInterviewers/Interviewers";

const routes = [
  {
    path: "/",
    component: FresherDashboard,
    key: "/",
  },
  {
    path: "/expcandidates",
    component: ExpCandidatesDashboard,
    key: "/expcandidates",
  },
  {
    path: "/freshers",
    component: FreshersList,
    key: "/freshers",
  },
  {
    path: "/expCandidateList",
    component: ExpCandidatesList,
    key: "/expCandidateList",
  },
  {
    path: "/employers",
    component: EmployersList,
    key: "/employers",
  },
  // {
  //   path: "/AddEmployerDetails",
  //   component: AddEmployerDetails,
  //   key: "/AddEmployerDetails",
  // },
  {
    path: "/AddCandidates",
    component: AddCandidateStepper,
    key: "/AddCandidates",
  },
  {
    path: "/ProfileView",
    component: CompleteProfileView,
    key: "/ProfileView",
  },
  {
    path: "/edit",
    component: EditorPage,
    key: "/edit",
  },
  {
    path: "/employerDetails",
    component: AddEmployerStepper,
    key: "/employerDetails",
  },
  {
    path: "/jobPostingList",
    component: JobPostingList,
    key: "/jobPostingList",
  },
  {
    path: "/internshipList",
    component: InternshipList,
    key: "/internshipList",
  },
  {
    path: "/jobPosting",
    component: JobPosting,
    key: "/jobPosting",
  },
  {
    path: "/internship",
    component: InternShip,
    key: "/internship",
  },
  {
    path: "/interviewerslist",
    component: InterviewersList,
    key: "/interviewerslist",
  },
  {
    path: "/AddInterviewers",
    component: AddInterviewersDetail,
    key: "/AddInterviewers",
  },
  {
    path: "/AddAssessments",
    component: AssessmentInfo,
    key: "/AddAssessments",
  },
  {
    path: "/assessmentList",
    component: AssessmentList,
    key: "/assessmentList",
  },
  {
    path: "/interviewers",
    component: Interviewers,
    key: "/interviewers",
  },
];

function OpenRoutingList() {
  return routes.map((item) => {
    if (item.path.split("/").length === 2) {
      return (
        <Route
          exact
          path={item.path}
          component={item.component}
          key={item.key}
        />
      );
    }
    return <Route path={item.path} component={item.component} key={item.key} />;
  });
}

export default OpenRoutingList;
