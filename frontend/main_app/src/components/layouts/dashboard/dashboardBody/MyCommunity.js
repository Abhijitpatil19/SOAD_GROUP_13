import React from "react";
import { useHistory } from "react-router-dom";

const MyCommunity = () => {
  const history = useHistory();

  // helper fn to render history below
  const renderEmptyContent = () => {
    return (
      <div className="pad-16 round-4 bg_pri-light fc_pri fss mar_t-16 vis-flex">
        <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
        <span>No content available here.</span>
      </div>
    );
  };

  return (
    <div className="fcol w-100 of-scr">
      <div className="dash_body_box fcol f1 bb bg_white round-8 pad_pc-32_mob-16">
        <div className="f_lrtb w-100 pc_space_bw">
          <div className="fcol">
            <div className="fsxl fwb">My community</div>
            <div className="fsxs fc_8a mar_t-8">
              View/update details of your followers/following here.
            </div>
          </div>
        </div>
        {/* previously posted jobs list */}
        <div className="fcol mar_t-32 f1">
          <div className="fsm fc_sec fwb">My Followers</div>
          {renderEmptyContent()}
        </div>
      </div>
      <div className="dash_body_box bg_white round-8 pad_pc-32_mob-16">
        <div className="fcol">
          <div className="fsm fc_sec fwb">Following</div>
          {renderEmptyContent()}
        </div>
      </div>
    </div>
  );
};

export default MyCommunity;
