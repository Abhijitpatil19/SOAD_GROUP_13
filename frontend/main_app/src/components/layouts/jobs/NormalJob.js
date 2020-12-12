import React from "react";
import { useHistory } from "react-router-dom";

import placeholder from "../../../res/jobs/placeholder.svg";

const NormalJob = ({ job }) => {
  const history = useHistory();

  // handleJobClick
  const handleJobClick = () => {
    history.push(`/jobs/${job.title}&id=${job.id}&refferer=self`);
  };

  return (
    <div
      onClick={handleJobClick}
      style={{ minWidth: "200px" }}
      className="normal_job pos_rel hov_gray-light hov_shad pad-24 bb cur"
    >
      {job.isAd && (
        <div style={{ right: "4px", top: "4px" }} className="pos_abs fsxs">
          Ad
        </div>
      )}
      <div className="fcol">
        <div className="fc">
          <img
            className="h-40 w-40 min_w-40 round-4"
            src={job.logo_image || placeholder}
            alt=""
          />
          <div className="mar_l-8 fsm fwb height_sized of-hid">
            {job.title || "N/A"}
          </div>
        </div>
        <div
          style={{ maxWidth: "140px" }}
          className="mar_t-16 ellip fsxs fc_sec"
        >
          <i className="fas fa-briefcase mar_r-8 w-12p"></i>
          {job.owner?.first_name || "Name"}{" "}
          {job.owner?.last_name || "Unavailable"}
        </div>
        <div style={{ maxWidth: "150px" }} className="ellip fsxs fc_5c">
          <i className="fas fa-map-marker-alt mar_r-8 w-12p"></i>
          {job.villageCity}, {job.address}
        </div>
        <div className="no_wrap fss mar_t-16">
          <span className="fc_5c mar_r-4">Required:</span>
          <span className="fwb fc_5c">
            {job.vacancy_count} {job.emp_type}
          </span>
        </div>
        <div className="no_wrap fss">
          <span className="fc-8a mar_r-4">Work duration:</span>
          <span className="fwb fc_sec fc_5c">
            {job.duration} {job.duration_unit}
          </span>
        </div>
        <div className="no_wrap fss mar_t-16">
          <i className="fas fa-coins mar_r-8 w-12p"></i>
          <span className="fwb fc_succ pwb">
            ₹{job.payment}/{job.payment_unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NormalJob;
