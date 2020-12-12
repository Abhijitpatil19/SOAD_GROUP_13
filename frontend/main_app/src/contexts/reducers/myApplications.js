import {
  MY_APPLICATIONS_LOADING,
  MY_APPLICATIONS_SUCCESS,
  MY_APPLICATIONS_ERROR,
} from "../../constants/actionTypes";

// myJobs reducer function
const myApplications = (state, { type, payload }) => {
  switch (type) {
    case MY_APPLICATIONS_LOADING:
      return {
        ...state,
        myApplications: {
          ...state.myApplications,
          myApplicationsLoading: true,
        },
      };

    case MY_APPLICATIONS_SUCCESS:
      return {
        ...state,
        myApplications: {
          ...state.myApplications,
          myApplicationsLoading: false,
          myApplicationsData: payload,
        },
      };

    case MY_APPLICATIONS_ERROR:
      return {
        ...state,
        myApplications: {
          ...state.myApplications,
          myApplicationsLoading: false,
          myApplicationsError: payload,
        },
      };

    default:
      return state;
  }
};

export default myApplications;
