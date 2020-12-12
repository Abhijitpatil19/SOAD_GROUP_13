import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../res/header/logo_dark_bg.png";
import ToggleButton from "./sideDrawer/ToggleButton";
import SearchBar from "./search/SearchBar";

import { searchBarContext } from "../../App";

const Header = ({ headerPosTop, drawerClickHandler }) => {
  // managing local state

  // destructuring imported context
  const {
    isSearchBarVisible,
    setIsSearchBarVisible,
    setSearchBarVisibleClass,
    searchBarClass,
    setSearchBarClass,
  } = useContext(searchBarContext);

  // toggleSearchBarVisiblity
  const toggleSearchBarVisiblity = () => {
    if (isSearchBarVisible) {
      setSearchBarVisibleClass(() => {
        return "search_hidden_body h-100 w-100";
      });
      setSearchBarClass(() => {
        return "search_bar_hidden pos_abs fcc w-100";
      });
    } else {
      setSearchBarVisibleClass(() => {
        return "search_visible_body h-100 w-100";
      });
      setSearchBarClass(() => {
        return "search_bar_visible pos_abs fcc w-100";
      });
    }
    setIsSearchBarVisible(() => {
      return !isSearchBarVisible;
    });
  };

  return (
    <div
      style={{ top: headerPosTop }}
      className="w-100 header fccc shadow_1-1-4-light pos_rel"
    >
      <div className="w-100 fc_bw fc_white">
        {/* left part of header */}
        <div className="fc">
          <button
            className="toggle_btn foc_opt_btn round-complete fcc bg_trans btn cur"
            onClick={drawerClickHandler}
          >
            <ToggleButton />
          </button>
          <Link to="/" className="link">
            <img src={logo} alt="" className="site_logo"></img>
          </Link>
        </div>
        {/* right part of the header */}
        <div className="fc">
          <button
            className="opt_btn foc_opt_btn bg_trans btn cur fcc round-complete fsl fc_white"
            onClick={toggleSearchBarVisiblity}
          >
            <i className="fas fa-search"></i>
          </button>
          <button className="opt_btn foc_opt_btn bg_trans btn cur fcc round-complete fsl fc_white">
            <i className="fas fa-language"></i>
          </button>
          <button className=" opt_btn foc_opt_btn bg_trans btn cur fcc round-complete fsl fc_white">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
      <div className={searchBarClass}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
