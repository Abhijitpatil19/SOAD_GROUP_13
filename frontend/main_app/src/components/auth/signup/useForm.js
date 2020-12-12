import { useState, useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { GlobalContext } from "../../../contexts/Provider";
import { register } from "../../../contexts/actions/auth/register";

export default () => {
  // local state management
  const [form, setForm] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const history = useHistory();
  const { addToast } = useToasts();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
    },
  } = useContext(GlobalContext);

  // handling error responses
  useEffect(() => {
    if (error) {
      let errorObject = {};
      let hasNonFieldErrorOccured = false;

      for (let item in error) {
        // tempItem to manipulte username-field error display
        let tempItem = item;
        if (item === "email" || item === "phone") {
          item = "username";
        }

        errorObject[item] = error[tempItem][0];

        // hasNonFieldErrorOccured checking
        if (
          tempItem !== "email" &&
          tempItem !== "phone" &&
          tempItem !== "password" &&
          tempItem !== "password_confirm"
        ) {
          hasNonFieldErrorOccured = true;
        }
      }
      setFieldErrors(() => errorObject);

      // if some other error occured (apart from username/password)
      if (hasNonFieldErrorOccured) {
        addToast("Registration failed. See logs for more details.", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }, [error]);

  // handling data responses
  useEffect(() => {
    if (data) {
      addToast("Registration successful.", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/login");
    }
  }, [data]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    setFieldErrors(() => {});
    register(form)(authDispatch);
  };

  return {
    form,
    onChange,
    submitForm,
    loading,
    fieldErrors,
  };
};
