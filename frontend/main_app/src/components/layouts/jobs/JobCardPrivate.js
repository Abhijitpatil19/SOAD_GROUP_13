import React from "react";
import Popup from "reactjs-popup";

import placeholder from "../../../res/jobs/placeholder.svg";
import { TimestampToTime } from "../../../Utilities";

const JobCardPrivate = ({ job }) => {
  // sendDeleteRequest
  const sendDeleteRequest = () => {
    // handle detete here
    alert("deleted");
  };

  return (
    <div className="fcol job_card_pvt f0 pad-16 bb cur">
      <div className="vis-flex pos_rel">
        <img
          className="h-40 w-40 round-complete"
          src={job.logo_image ? job.logo_image : placeholder}
          alt=""
        />
        <div
          style={{ maxWidth: "calc(100% - 88px)" }}
          className="mar_l-12 fcol"
        >
          <div className="fss fwb ellip">{job.title || "N/A"}</div>
          <div className="mar_t-4 fsxs ellip fc_5c">
            <i className="fas fa-map-marker-alt mar_r-8"></i>
            {job.villageCity || "Location unavailable"}, {job.address || ""}
          </div>
        </div>
        <Popup
          nested
          trigger={
            <button
              style={{ top: "-8px", right: "-12px" }}
              className="btn cur pos_abs mar-4 h-32p w-32p round-complete bg_trans btn_gray"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          }
          position="left top"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={250}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          {(mainClose) => (
            <div className="card_menu fss fcol round-8">
              <Popup
                trigger={
                  <div className="card_menu_item fc">
                    <i className="fas fa-trash-alt mar_r-8"></i>Delete posting
                  </div>
                }
                modal
                className="cnf_popup-dark"
              >
                {(subClose) => (
                  <div className="fcol bg_ter-light round-8 pad-16">
                    <div className="fsm fwb fc_white w-100 align-c">
                      Delete "{job.title || ""}" ?
                    </div>
                    <div className="w-100 mar_t-16 pad-16 bb fc_white fss round-8 bg_ter vis-flex">
                      <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
                      <span>
                        You will no longer receive any job application on this
                        post. However, you can still access its details in the
                        history section. Proceed to delete ?
                      </span>
                    </div>
                    <div className="fcc mar_t-32">
                      <button
                        className="btn bg_gray-light h-32p w-80p fc_8a round-4 fwb cur"
                        onClick={() => {
                          subClose();
                          mainClose();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn mar_l-32 bg_err h-32p w-80p fc_white round-4 fwb cur"
                        onClick={sendDeleteRequest}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
              <div className="card_menu_item">
                <i className="fas fa-share-square mar_r-8"></i>Share
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="no_wrap fss mar_t-8 fc">
        <div className="fcc">
          <span className="fc_5c mar_r-4">Require:</span>
          <span className="fwb fc_sec">
            {job.vacancy_count || "N/A"} {job.emp_type || "Person"}
          </span>
        </div>
        <div className="mar_0-4 fwb fc_5c fsxs">for</div>
        <div className="fwb fc_sec">
          {job.duration || "N/A"} {job.duration_unit || "N/A"}
        </div>
      </div>
      <div className="fc_bw mar_t-8">
        <span className="fc_5c fc mar_r-4">
          <i className="fas fss fa-clock mar_r-4"></i>
          <span style={{ fontSize: "0.7rem" }}>
            {TimestampToTime(
              job.date_of_creation || new Date(),
              "dd Mmm yyyy, hh:mm"
            )}
          </span>
        </span>
        <span className="fc_5c fc fsxs">
          Applications received:{" "}
          <span className="fc_sec mar_l-4 fwb">
            {job.total_submitted || "0"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default JobCardPrivate;
