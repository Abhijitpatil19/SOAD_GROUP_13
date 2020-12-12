import React, { createContext, useReducer } from "react";

import auth from "./reducers/auth";
import search from "./reducers/search";
import myJobs from "./reducers/myJobs";
import jobDetail from "./reducers/jobDetail";
import publicJobsHome from "./reducers/publicJobsHome";
import postApplication from "./reducers/postApplication";
import myApplications from "./reducers/myApplications";
import authInitialState from "./initialStates/authInitialState";
import searchInitialState from "./initialStates/searchInitialState";
import myJobsInitialState from "./initialStates/myJobsInitialState";
import jobDetailInitialState from "./initialStates/jobDetailInitialState";
import publicJobsHomeInitialState from "./initialStates/publicJobsHomeInitialState";
import postAppInitialState from "./initialStates/postAppInitialState";
import myAppInitialState from "./initialStates/myAppInitialState";

// creating global contexts
export const GlobalContext = createContext({});

// creating global providers
export const GlobalProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [searchState, searchDispatch] = useReducer(search, searchInitialState);
  const [myJobsState, myJobsDispatch] = useReducer(myJobs, myJobsInitialState);
  const [publicJobsHomeState, publicJobsHomeDispatch] = useReducer(
    publicJobsHome,
    publicJobsHomeInitialState
  );
  const [jobDetailState, jobDetailDispatch] = useReducer(
    jobDetail,
    jobDetailInitialState
  );
  const [postApplicationState, postApplicationDispatch] = useReducer(
    postApplication,
    postAppInitialState
  );
  const [myApplicationsState, myApplicationsDispatch] = useReducer(
    myApplications,
    myAppInitialState
  );

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        searchState,
        searchDispatch,
        myJobsState,
        myJobsDispatch,
        publicJobsHomeState,
        publicJobsHomeDispatch,
        jobDetailState,
        jobDetailDispatch,
        postApplicationState,
        postApplicationDispatch,
        myApplicationsState,
        myApplicationsDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
