import React, { memo, useState, useEffect } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import * as Colors from "../../constants/Colors";

const TopMessage = ({
  isTopMsgVisible,
  setIsTopMsgVisible,
  setHeaderPosTop,
  setBodyMarginTop,
}) => {
  // state management
  const [topMessage, setTopMessage] = useState({
    offerText: undefined,
    secText: undefined,
    linkText: undefined,
    link: "/",
  });
  // destructuring props
  const { offerText, secText, linkText, link } = topMessage;

  // closeTopMessage - top msg visiblity
  let topMsgClass = isTopMsgVisible
    ? "top_msg w-100 fc fsxs bg_white fc_pri pos_rel no_wrap sb-hid"
    : "hid";

  const closeTopMessage = () => {
    setIsTopMsgVisible(() => {
      return false;
    });
    setHeaderPosTop(() => {
      return "0px";
    });
    setBodyMarginTop(() => {
      return "48px";
    });
  };

  // fetchData - data fetching and setting state
  const baseUrl = "https://run.mocky.io";

  const fetchData = async () => {
    try {
      let response = await axios.get(
        baseUrl + "/v3/56013304-21d4-4d49-b53f-09e74de9bd83"
      );

      setTopMessage(() => {
        return {
          offerText: response.data.offerText,
          secText: response.data.secText,
          linkText: response.data.linkText,
          link: response.data.link,
        };
      });
    } catch (error) {
      console.log("Top msg data fetching failed. Error: ", error);
    }
  };

  // useEffect - called once per render
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={topMsgClass}>
      <div className="mar-0-auto of-scr sb-hid">
        <SkeletonTheme color={Colors.pri_col} highlightColor={Colors.white}>
          <i className="fas fa-crown mar_l-4 mar_r-8"></i>
          <span>
            <strong>{offerText || <Skeleton width={320} />}</strong> {secText}
          </span>
          <Link
            to={link}
            className="mar_l-4 link-active fwb link_foc_u mar_r-24"
          >
            {linkText}
          </Link>
          <button
            className="btn bg_white fc_33 pos_abs-0-0-r h-100 pad_0-8 cur foc_btn_icon_op-1"
            onClick={closeTopMessage}
          >
            <i className="w-100 fcc h-100 fas fa-times op-5"></i>
          </button>
        </SkeletonTheme>
      </div>
    </div>
  );
};

// defining propTypes
TopMessage.propTypes = {
  offerText: PropTypes.string,
  secText: PropTypes.string,
  linkText: PropTypes.string,
  link: PropTypes.string,
};

export default memo(TopMessage);
