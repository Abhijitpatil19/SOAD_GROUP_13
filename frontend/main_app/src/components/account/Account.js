import React, { useEffect, useContext } from "react";

import { searchBarContext } from "../../App";
import DashboardBase from "../layouts/dashboard/DashboardBase";

const Account = () => {
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

  return <DashboardBase />;
};

export default Account;
