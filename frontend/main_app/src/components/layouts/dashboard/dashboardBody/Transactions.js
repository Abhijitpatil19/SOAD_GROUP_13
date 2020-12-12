import React from "react";
import { useHistory } from "react-router-dom";

const Transactions = () => {
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
            <div className="fsxl fwb">Transactions</div>
            <div className="fsxs fc_8a mar_t-8">
              View details of your transaction here.
            </div>
          </div>
        </div>
        {/* previously posted jobs list */}
        <div className="fcol mar_t-32 f1">
          <div className="fsm fc_sec fwb">Recent transactions</div>
          {renderEmptyContent()}
        </div>
      </div>
      <div className="dash_body_box bg_white round-8 pad_pc-32_mob-16">
        <div className="fcol">
          <div className="fsm fc_sec fwb">History</div>
          {renderEmptyContent()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
