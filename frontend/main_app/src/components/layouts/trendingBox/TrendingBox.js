import React from "react";
import { Link } from "react-router-dom";

const TrendingBox = () => {
  return (
    <div className="trend_box round-8 bg_ter-light m_r_t-16 w-100 pad-16 bb fcol">
      <div className="pad_0-8 w-100 bb fc_bw">
        <div className="fwb fsm">Featured companies</div>
        <Link className="link fsm" to="/trending/recruiters">
          Show all
        </Link>
      </div>
      <div className="mar_t-16 fss fc w-100 of-scr sb-hid bb">
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">Surya Apartments</div>
        </div>
        {/* - */}
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">IIITS</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">Kurl-on</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">Shree Leathers</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">MHGOV</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">IFFCO</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">Leather Factory</div>
        </div>
        <div className="fcc bg_white bg_gray_grad mar-4 shadow_1-1-4-light cur round-4">
          <img
            className="h-40 w-40 round_tbl-3"
            src="https://static.planetminecraft.com/files/resource_media/screenshot/1811/apartment-buildings-2002-1520899648_thumb.jpg"
            alt=""
          />
          <div className="no_wrap fcc pad_0-16">IIT, Kanpur</div>
        </div>
        {/* ---- */}
      </div>
    </div>
  );
};

export default TrendingBox;
