import axiosInstance from "../../../helpers/axiosInstance";

import {
  MY_JOBS_ERROR,
  MY_JOBS_LOADING,
  MY_JOBS_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (history) => (dispatch) => {
  // dispatching loading first
  dispatch({
    type: MY_JOBS_LOADING,
  });

  axiosInstance(history)
    .get("/jobs/my/?ordering=-date_of_creation")
    .then((response) => {
      dispatch({
        type: MY_JOBS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: MY_JOBS_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
