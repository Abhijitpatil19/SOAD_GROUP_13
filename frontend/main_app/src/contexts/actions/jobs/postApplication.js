import axiosInstance from "../../../helpers/axiosInstance";

import {
  POST_APPLICATION_LOADING,
  POST_APPLICATION_SUCCESS,
  POST_APPLICATION_ERROR,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (history) => (dispatchPostApplication, jobId) => {
  // dispatching loading first
  dispatchPostApplication({
    type: POST_APPLICATION_LOADING,
  });

  axiosInstance(history)
    .post("/jobs/my/application/?ordering=-creation_time", {
      job: jobId,
    })
    .then((response) => {
      dispatchPostApplication({
        type: POST_APPLICATION_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatchPostApplication({
        type: POST_APPLICATION_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
