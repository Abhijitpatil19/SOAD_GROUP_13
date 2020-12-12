import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../../contexts/Provider";
import getMyApplications from "../../../../contexts/actions/jobs/getMyApplications";
import placeholder from "../../../../res/jobs/placeholder.svg";
import { TimestampToTime } from "../../../../Utilities";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Applications = () => {
  const history = useHistory();

  // fetching my applications
  const {
    myApplicationsDispatch,
    myApplicationsState: {
      myApplications: {
        myApplicationsLoading,
        myApplicationsError,
        myApplicationsData,
      },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getMyApplications(history)(myApplicationsDispatch);
  }, []);

  console.log(
    "My applications",
    myApplicationsLoading,
    myApplicationsError,
    myApplicationsData
  );

  // renderStatus
  const renderStatus = (status) => {
    if (status === "Accepted") {
      return (
        <div className="pad_4-12 fsxs fwb round-side bg_succ fc_white fcc">
          ACCEPTED
        </div>
      );
    } else if (status === "Rejected") {
      return (
        <div className="pad_4-12 fsxs fwb round-side bg_err fc_white fcc">
          REJECTED
        </div>
      );
    } else {
      return (
        <div className="pad_4-12 fsxs fwb round-side bg_warn fc_white fcc">
          PENDING
        </div>
      );
    }
  };

  // renderApplications
  const renderApplications = () => {
    if (myApplicationsData?.results?.length > 0) {
      return (
        <div className="fcol job_list bb mar_t-16">
          {myApplicationsData.results.map((item) => (
            <div className="fcol job_card_pvt pad-16 bb f0 cur" key={item.id}>
              <div className="fc">
                <img
                  className="h-40 w-40 round-complete"
                  src={item.job.logo_image || placeholder}
                  alt=""
                />
                <div className="fcol mar_l-12">
                  <div className="fsm fwb ellip">{item.job.title || "N/A"}</div>
                  <div className="mar_t-4 fss fc_5c">
                    <i className="fas fa-map-marker-alt mar_r-8"></i>
                    {item.job.villageCity || ""},{" "}
                    {item.job.address || "Location unavailable"}
                  </div>
                </div>
              </div>
              <div className="mar_t-8 fsxs fc_bw">
                <div className="fc">
                  <i className="fas fss fa-clock mar_r-4"></i>
                  {TimestampToTime(
                    item.creation_time || new Date("01 01 2020"),
                    "dd Mmm yyyy, hh:mm"
                  )}
                </div>
                {renderStatus()}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="pad-16 round-4 bg_pri-light fc_pri fss mar_t-16 vis-flex">
          <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
          <span>
            No ongoing applications available. Apply for a job and track your
            application status here.
          </span>
        </div>
      );
    }
  };

  // renderPlaceholder
  const renderPlaceholder = () => {
    return (
      <div style={{ maxWidth: "320px" }} className="fcol mar_t-16 of-hid">
        <SkeletonTheme color="#8a8a8a" highlightColor="#ffffff">
          <div className="fc">
            <Skeleton circle={true} height={40} width={40} />
            <div className="fcol mar_l-8">
              <Skeleton count={1} width={250} height={16} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={140}
                height={10}
              />
            </div>
          </div>
          <div className="fcol mar_t-16">
            <Skeleton count={1} width={300} height={12} />
          </div>
          <div className="fc mar_t-32">
            <Skeleton circle={true} height={40} width={40} />
            <div className="fcol mar_l-8">
              <Skeleton count={1} width={250} height={16} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={140}
                height={10}
              />
            </div>
          </div>
          <div className="fcol mar_t-16">
            <Skeleton count={1} width={300} height={12} />
          </div>
        </SkeletonTheme>
      </div>
    );
  };

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
            <div className="fsxl fwb">My Applications</div>
            <div className="fsxs fc_8a mar_t-8">
              View/update details of your job applications here.
            </div>
          </div>
        </div>
        {/* previously posted jobs list */}
        <div className="fcol mar_t-32 f1">
          <div className="fsm fc_sec fwb">Recent applications</div>
          {myApplicationsLoading ? renderPlaceholder() : renderApplications()}
        </div>
      </div>
      <div className="dash_body_box bg_white round-8 pad_pc-32_mob-16">
        <div className="fcol">
          <div className="fsm fc_sec fwb">Application history</div>
          {renderEmptyContent()}
        </div>
      </div>
    </div>
  );
};

export default Applications;
