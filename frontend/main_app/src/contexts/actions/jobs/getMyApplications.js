import axiosInstance from "../../../helpers/axiosInstance";

import {
  MY_APPLICATIONS_LOADING,
  MY_APPLICATIONS_SUCCESS,
  MY_APPLICATIONS_ERROR,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (history) => (dispatch) => {
  // dispatching loading first
  dispatch({
    type: MY_APPLICATIONS_LOADING,
  });

  axiosInstance(history)
    .get("/jobs/my/application/")
    .then((response) => {
      dispatch({
        type: MY_APPLICATIONS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: MY_APPLICATIONS_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
