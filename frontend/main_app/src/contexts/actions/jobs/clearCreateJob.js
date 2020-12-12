import { CLEAR_CREATE_JOB } from "../../../constants/actionTypes";

export default () => (dispatch) => {
  dispatch({
    type: CLEAR_CREATE_JOB,
  });
};
