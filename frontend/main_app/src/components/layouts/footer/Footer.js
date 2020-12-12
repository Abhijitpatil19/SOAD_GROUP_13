import React from "react";
import { Link } from "react-router-dom";

import googlePlay from "../../../res/utils/google-play.svg";
import apple from "../../../res/utils/apple.svg";

const Footer = () => {
  // handleScrollToTop
  const handleScrollToTop = () => {
    if (
      document.body.scrollTop !== 0 ||
      document.documentElement.scrollTop !== 0
    ) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="fcol w-100">
      <div
        onClick={handleScrollToTop}
        className="fcc pad_16-0 bg_ter fc_white cur w-100"
      >
        <i className="fas fa-arrow-circle-up mar_r-8 fsm"></i>
        Scroll to top
      </div>
      <div className="w-100 bg_ter-light f_lrtb pad-32 justev-pc bb">
        <div className="fcol fsm mob_mar_t-32">
          <div className="fwb fc_white">INFORMATION</div>
          <div className="fcol mar_t-16 fc_gray-light fss">
            <Link className="link link-v mar_t-4">About us</Link>
            <Link className="link link-v mar_t-4">Terms and conditions</Link>
            <Link className="link link-v mar_t-4">Privacy policy</Link>
            <Link className="link link-v mar_t-4">Contact us</Link>
            <Link className="link link-v mar_t-4">FAQs</Link>
            <Link className="link link-v mar_t-4">Legals</Link>
            <Link className="link link-v mar_t-4">Report bug</Link>
            <Link className="link link-v mar_t-4">Feedback</Link>
          </div>
        </div>
        <div className="fcol fsm mob_mar_t-32">
          <div className="fwb fc_white">OUR SERVICES</div>
          <div className="fcol mar_t-16 fc_gray-light fss">
            <Link className="link link-v mar_t-4">For recruiters</Link>
            <Link className="link link-v mar_t-4">API integration</Link>
            <Link className="link link-v mar_t-4">Premium</Link>
            <Link className="link link-v mar_t-4">Easy apply</Link>
            <Link className="link link-v mar_t-4">Partnership</Link>
            <Link className="link link-v mar_t-4">Govt. jobs</Link>
            <Link className="link link-v mar_t-4">Connections</Link>
          </div>
        </div>
        <div className="fcol fsm mob_mar_t-32">
          <div className="fwb fc_white">FOR JOB SEEKERS</div>
          <div className="fcol mar_t-16 fc_gray-light fss">
            <Link className="link link-v mar_t-4">Registration</Link>
            <Link className="link link-v mar_t-4">Job seraching</Link>
            <Link className="link link-v mar_t-4">Alerts</Link>
            <Link className="link link-v mar_t-4">Follow</Link>
            <Link className="link link-v mar_t-4">Report bad job</Link>
            <Link className="link link-v mar_t-4">Help</Link>
          </div>
        </div>
        <div className="fcol mob_mar_t-32">
          <div className="fwb fsm fc_white">FOLLOW US ON</div>
          <div className="fc mar_t-16 fc_gray-light fsxl">
            <Link className="link link-v mar_l-4">
              <i className="fab fa-twitter-square fc_white"></i>
            </Link>
            <Link className="link link-v mar_l-4">
              <i className="fab fa-facebook-square fc_white"></i>
            </Link>
            <Link className="link link-v mar_l-4">
              <i className="fab fa-youtube-square fc_white"></i>
            </Link>
            <Link className="link link-v mar_l-4">
              <i className="fab fa-linkedin fc_white"></i>
            </Link>
            <Link className="link link-v mar_l-4">
              <i className="fab fa-instagram-square fc_white"></i>{" "}
            </Link>
          </div>
          <div className="fwb fsm fc_white mar_t-16">DOWNLOAD OUR APPS</div>
          <div style={{ maxWidth: "220px" }} className="mar_t-16 fcol">
            <Link className="link w-100">
              <button className="btn hov_gray-light bb fc w-100 pad_4-8 fc round-4 bg_white cur">
                <img className="mar_l-8 h-20p" src={googlePlay} alt="" />
                <div className="fcol mar_l-16">
                  <div className="fs2xs fwb align-l fc_gray">GET IT ON</div>
                  <div className="fsm fwb">Google Play</div>
                </div>
              </button>
            </Link>
            <Link className="link mar_t-4 w-100">
              <button className="btn hov_gray-light bb fc w-100 pad_4-8 fc round-4 bg_white cur">
                <i className="mar_l-8 fab fa-apple fsxl"></i>
                <div className="fcol mar_l-16">
                  <div className="fs2xs fwb align-l fc_gray">
                    Download on the
                  </div>
                  <div className="fsm fwb">App Store</div>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="fcc pad_4-0 fss">
        © All rights reserved @ 2020 workgent.com
      </div>
    </div>
  );
};

export default Footer;
