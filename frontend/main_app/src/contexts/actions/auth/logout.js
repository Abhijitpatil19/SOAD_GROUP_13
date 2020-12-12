import { LOGOUT_USER } from "../../../constants/actionTypes";

export default (history) => (authDispatch, myJobsDispatch) => {
  localStorage.removeItem("tokens");
  localStorage.removeItem("username");

  authDispatch({
    type: LOGOUT_USER,
  });

  myJobsDispatch({
    type: LOGOUT_USER,
  });

  history.push("/");
};
