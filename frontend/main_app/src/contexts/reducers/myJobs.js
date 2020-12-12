import {
  CLEAR_CREATE_JOB,
  CREATE_JOB_ERROR,
  CREATE_JOB_LOADING,
  CREATE_JOB_SUCCESS,
  LOGOUT_USER,
  MY_JOBS_ERROR,
  MY_JOBS_LOADING,
  MY_JOBS_SUCCESS,
} from "../../constants/actionTypes";

import myJobsInitialState from "../initialStates/myJobsInitialState";

// myJobs reducer function
const myJobs = (state, { type, payload }) => {
  switch (type) {
    case MY_JOBS_LOADING:
      return {
        ...state,
        myJobs: {
          ...state.myJobs,
          loading: true,
        },
      };

    case MY_JOBS_SUCCESS:
      return {
        ...state,
        myJobs: {
          ...state.myJobs,
          loading: false,
          data: payload,
        },
      };

    case MY_JOBS_ERROR:
      return {
        ...state,
        myJobs: {
          ...state.myJobs,
          loading: false,
          error: payload,
        },
      };

    case LOGOUT_USER:
      return {
        ...state,
        myJobsInitialState,
      };

    case CREATE_JOB_LOADING:
      return {
        ...state,
        addJob: {
          ...state.addJob,
          loading: true,
          error: null,
        },
      };

    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        addJob: {
          ...state.addJob,
          loading: false,
          data: payload,
        },
      };

    case CREATE_JOB_ERROR:
      return {
        ...state,
        addJob: {
          ...state.addJob,
          loading: false,
          error: payload,
        },
      };

    case CLEAR_CREATE_JOB:
      return {
        ...state,
        addJob: {
          ...state.addJob,
          loading: false,
          error: null,
          data: null,
        },
      };

    default:
      return state;
  }
};

export default myJobs;
