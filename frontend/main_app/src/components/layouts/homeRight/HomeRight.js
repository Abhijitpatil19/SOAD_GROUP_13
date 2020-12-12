import React from "react";
import { Link } from "react-router-dom";

import googlePlay from "../../../res/utils/google-play.svg";
import apple from "../../../res/utils/apple.svg";

const HomeRight = () => {
  return (
    <div className="w-100 bb mob_mar_t-32 fcol">
      <div className="fcol w-100 pad-16 bb shadow_1-1-4-dark round-8">
        <div className="fsxs w-100">Download apps for better experience</div>
        <Link className="link mar_t-16 w-100">
          <button className="btn hov_ter bb fc w-100 pad-8 fc round-4 bg_ter-light cur">
            <img className="mar_l-8 h-20p" src={googlePlay} alt="" />
            <div className="fcol mar_l-16">
              <div className="fs2xs fwb align-l fc_gray-light">GET IT ON</div>
              <div className="fsm fwb fc_white">Google Play</div>
            </div>
          </button>
        </Link>
        <Link className="link mar_t-8 w-100">
          <button className="btn hov_ter bb fc w-100 pad-8 fc round-4 bg_ter-light cur">
            <img className="mar_l-8 h-20p" src={apple} alt="" />
            <div className="fcol mar_l-16">
              <div className="fs2xs fwb align-l fc_gray-light">
                Download on the
              </div>
              <div className="fsm fwb fc_white">App Store</div>
            </div>
          </button>
        </Link>
      </div>
      <div className="fcol w-100 mar_t-32 pad-16 bb shadow_1-1-4-light bg_ter-light round-8">
        <div className="fc w-100">
          <div className="fcol">
            <div className="fsm fwb fc_gray-light">
              Search Jobs on the Go !!
            </div>
            <div className="fsxs mar_t-4 fc_white">
              Download the workgent app for free {"&"} browse from a variety of
              jobs based on your preferences.
            </div>
          </div>
          <img
            className="mar_l-8"
            src="https://static.naukimg.com/s/7/0/assets/images/src/widgets/download-app-link-wdgt/v1/assets/appInstallImg.9d15407f.png"
            alt=""
          />
        </div>
        <div className="fcol w-100 mar_t-16">
          <input
            placeholder="+91XXXXXXXXXX"
            className="w-100 h-40 bg_white mar_t-4 inp_pri pad_0-8 fsm focus-blur fwb"
            type="text"
          />
          <button className="btn btn_pri cur height_sized mar_t-8 round-4 fwb fc_white fss bg_pri">
            Send me the link
          </button>
        </div>
      </div>
      <div className="fcol w-100 mar_t-32 pad-16 bb shadow_1-1-4-dark round-8">
        <div className="fc w-100">
          <div className="fcol">
            <div className="fsm fwb">
              Get best matched jobs directly in your mail.
            </div>
            <div className="fsxs mar_t-4">
              Tell us what kind of a job you are looking out for and stay
              updated with latest opportunities.
            </div>
          </div>
        </div>
        <div className="fcol w-100 mar_t-16">
          <div className="fc_8a fsxs"></div>
          <button className="btn btn_pri cur height_sized mar_t-8 round-4 fwb fc_white fss bg_pri">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
