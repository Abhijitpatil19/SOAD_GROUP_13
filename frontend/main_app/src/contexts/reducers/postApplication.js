import {
  POST_APPLICATION_LOADING,
  POST_APPLICATION_SUCCESS,
  POST_APPLICATION_ERROR,
} from "../../constants/actionTypes";

// myJobs reducer function
const postApplication = (state, { type, payload }) => {
  switch (type) {
    case POST_APPLICATION_LOADING:
      return {
        ...state,
        postApplication: {
          ...state.postApplication,
          postApplicationLoading: true,
        },
      };

    case POST_APPLICATION_SUCCESS:
      return {
        ...state,
        postApplication: {
          ...state.postApplication,
          postApplicationLoading: false,
          postApplicationData: payload,
        },
      };

    case POST_APPLICATION_ERROR:
      return {
        ...state,
        postApplication: {
          ...state.postApplication,
          postApplicationLoading: false,
          postApplicationError: payload,
        },
      };

    default:
      return state;
  }
};

export default postApplication;
