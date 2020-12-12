import React, { useContext, useEffect } from "react";

import LoginUI from "../../layouts/formUI/LoginUI";

// importing contexts
import { searchBarContext } from "../../../App";
import useForm from "./useForm";

const Login = () => {
  // using imported context
  const {
    isSearchBarVisible,
    setIsSearchBarVisible,
    setSearchBarVisibleClass,
    setSearchBarClass,
  } = useContext(searchBarContext);

  // hiding search bar by default
  useEffect(() => {
    if (isSearchBarVisible) {
      setIsSearchBarVisible(() => false);
      setSearchBarVisibleClass(() => "search_hidden_body h-100 w-100");
      setSearchBarClass(() => "search_bar_hidden pos_abs fcc w-100");
    }
  }, []);

  return <LoginUI formHook={useForm()} />;
};

export default Login;
