import axiosInstance from "../../../helpers/axiosInstance";

import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../../../constants/actionTypes";

export const register = ({
  username: email,
  password,
  cnfPassword: password_confirm,
}) => (dispatch) => {
  dispatch({
    type: REGISTER_LOADING,
  });

  axiosInstance()
    .post("auth/register/", {
      email,
      password,
      password_confirm,
    })
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response?.data, "Error code: coacau-re");
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response ? error.response.data : "COULD NOT CONNECT",
      });
    });
};
