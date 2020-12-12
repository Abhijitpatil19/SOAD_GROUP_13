import {
  PUBLIC_JOB_DETAIL_SUCCESS,
  PUBLIC_JOB_DETAIL_LOADING,
  PUBLIC_JOB_DETAIL_ERROR,
} from "../../constants/actionTypes";

// myJobs reducer function
const jobDetail = (state, { type, payload }) => {
  switch (type) {
    case PUBLIC_JOB_DETAIL_LOADING:
      return {
        ...state,
        jobDetail: {
          ...state.jobDetail,
          loading: true,
        },
      };

    case PUBLIC_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetail: {
          ...state.jobDetail,
          loading: false,
          data: payload,
        },
      };

    case PUBLIC_JOB_DETAIL_ERROR:
      return {
        ...state,
        jobDetail: {
          ...state.jobDetail,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default jobDetail;
