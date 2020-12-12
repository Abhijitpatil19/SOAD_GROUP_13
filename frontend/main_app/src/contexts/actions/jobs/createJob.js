import axiosInstance from "../../../helpers/axiosInstance";
import formData from "form-data";

import {
  CREATE_JOB_ERROR,
  CREATE_JOB_LOADING,
  CREATE_JOB_SUCCESS,
} from "../../../constants/actionTypes";
import { CONNECTION_ERROR } from "../../../constants/api";

export default (form) => (myJobsDispatch) => {
  myJobsDispatch({
    type: CREATE_JOB_LOADING,
  });

  const formDataObj = new formData();

  for (let key in form) {
    if (key === "date_of_expiry") {
      formDataObj.append(key, new Date(form[key]).toISOString());
    } else {
      formDataObj.append(key, form[key]);
    }
  }

  axiosInstance()
    .post("/jobs/my/", formDataObj)
    .then((response) => {
      myJobsDispatch({
        type: CREATE_JOB_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response?.data, "Error code: coacjo-cr");
      myJobsDispatch({
        type: CREATE_JOB_ERROR,
        payload: error.response ? error.response.data : CONNECTION_ERROR,
      });
    });
};
