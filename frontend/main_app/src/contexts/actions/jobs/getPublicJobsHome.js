import axiosInstance from "../../../helpers/axiosInstance";

import {
  PUBLIC_JOBS_HOME_LOADING,
  PUBLIC_JOBS_HOME_SUCCESS,
  PUBLIC_JOBS_HOME_ERROR,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (history) => (dispatch) => {
  // dispatching loading first
  dispatch({
    type: PUBLIC_JOBS_HOME_LOADING,
  });

  axiosInstance(history)
    .get("/jobs/")
    .then((response) => {
      dispatch({
        type: PUBLIC_JOBS_HOME_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: PUBLIC_JOBS_HOME_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
