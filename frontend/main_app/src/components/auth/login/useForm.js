import { useState, useContext, useEffect } from "react";

import { useToasts } from "react-toast-notifications";

import { GlobalContext } from "../../../contexts/Provider";
import { login } from "../../../contexts/actions/auth/login";
import { getUrlParams } from "../../../Utilities";
import { useHistory } from "react-router-dom";

export default () => {
  // local state management
  const [form, setForm] = useState({});

  const { addToast } = useToasts();
  const history = useHistory();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  // check for error - backend
  useEffect(() => {
    if (error) {
      addToast(
        error.detail ? error.detail : "Some error occured. Code: coaulo-uF",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  }, [error]);

  // on successful login redirects to destination if present else to homepage
  useEffect(() => {
    if (data) {
      if (data.username && data.tokens) {
        // get url params to login and redirect back
        const params = getUrlParams(window.location.search);

        if (params.destination) {
          //   redirect to destination
          history.push(params.destination);
        } else {
          history.push("/");
        }
      }
    }
  }, [data]);

  // onChange
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submitForm
  const submitForm = () => {
    login(form)(authDispatch);
  };

  return {
    form,
    onChange,
    submitForm,
    loading,
    data,
  };
};
