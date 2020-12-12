import {
  PUBLIC_JOBS_HOME_LOADING,
  PUBLIC_JOBS_HOME_SUCCESS,
  PUBLIC_JOBS_HOME_ERROR,
} from "../../constants/actionTypes";

// myJobs reducer function
const publicJobsHome = (state, { type, payload }) => {
  switch (type) {
    case PUBLIC_JOBS_HOME_LOADING:
      return {
        ...state,
        publicJobsHome: {
          ...state.publicJobsHome,
          loading: true,
        },
      };

    case PUBLIC_JOBS_HOME_SUCCESS:
      return {
        ...state,
        publicJobsHome: {
          ...state.publicJobsHome,
          loading: false,
          data: payload,
        },
      };

    case PUBLIC_JOBS_HOME_ERROR:
      return {
        ...state,
        publicJobsHome: {
          ...state.publicJobsHome,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default publicJobsHome;
