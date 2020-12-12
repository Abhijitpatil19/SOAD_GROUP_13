import axiosInstance from "../../../helpers/axiosInstance";

import {
  PUBLIC_JOB_DETAIL_LOADING,
  PUBLIC_JOB_DETAIL_SUCCESS,
  PUBLIC_JOB_DETAIL_ERROR,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (history) => (dispatchDetail, jobId) => {
  // dispatching loading first
  dispatchDetail({
    type: PUBLIC_JOB_DETAIL_LOADING,
  });

  axiosInstance(history)
    .get(`/jobs/${jobId}`)
    .then((response) => {
      dispatchDetail({
        type: PUBLIC_JOB_DETAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatchDetail({
        type: PUBLIC_JOB_DETAIL_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
