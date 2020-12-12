import React, { useContext, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import JobCardPrivate from "../../../jobs/JobCardPrivate";
import { GlobalContext } from "../../../../../contexts/Provider";
import getMyJobs from "../../../../../contexts/actions/jobs/getMyJobs";

// helper fn to render jobs below
const renderJobs = (data) => {
  if (data.results?.length > 0) {
    return (
      <div className="fcol job_list bb mar_t-16">
        {data.results.map((job) => (
          <JobCardPrivate key={job.id} job={job} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="pad-16 round-4 bg_pri-light fc_pri fss mar_t-16 vis-flex">
        <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
        <span>
          No ongoing recruitment available. You can post a new job to
          hire/recruit workforce(es).
        </span>
      </div>
    );
  }
};

// helper fn to render history below
const renderHistory = (data) => {
  if (data?.results?.length > 0) {
    return (
      <div className="fcol job_list bb mar_t-16">
        {data.results.map((job) => (
          <JobCardPrivate key={job.id} job={job} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="pad-16 round-4 bg_pri-light fc_pri fss mar_t-16 vis-flex">
        <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
        <span>No postings history available.</span>
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
          <Skeleton
            style={{ marginTop: "4px" }}
            count={1}
            width={300}
            height={12}
          />
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
          <Skeleton
            style={{ marginTop: "4px" }}
            count={1}
            width={300}
            height={12}
          />
        </div>
      </SkeletonTheme>
    </div>
  );
};

const PostingsBase = () => {
  let { url } = useRouteMatch();
  const history = useHistory();

  const {
    myJobsDispatch,
    myJobsState: {
      myJobs: { loading, error, data },
    },
  } = useContext(GlobalContext);

  console.log("My postings", loading, error, data);

  useEffect(() => {
    getMyJobs(history)(myJobsDispatch);
  }, []);

  // handlePostNewJob
  const handlePostNewJob = () => {
    history.push(`${url}/new_post`);
  };

  return (
    <div className="fcol w-100 of-scr">
      <div className="dash_body_box fcol f1 bg_white round-8 pad_pc-32_mob-16">
        <div className="f_lrtb w-100 pc_space_bw">
          <div className="fcol">
            <div className="fsxl fwb">My postings</div>
            <div className="fsxs fc_8a mar_t-8">
              View/update the details of your job postings here.
            </div>
          </div>
          <button
            className="dash_opt_btn-1 btn cur fsm fcc mob_mar_t-32 pad_8-16 round-4 bg_pri fc_white fwb bb"
            onClick={handlePostNewJob}
          >
            <i className="fas fa-plus mar_r-8"></i>Post new job
          </button>
        </div>
        {/* previously posted jobs list */}
        <div className="fcol mar_t-32 f1">
          <div className="fsm fc_sec fwb">Ongoing recruitments</div>
          {loading ? renderPlaceholder() : renderJobs(data)}
        </div>
      </div>
      <div className="dash_body_box bg_white round-8 pad_pc-32_mob-16">
        <div className="fcol">
          <div className="fsm fc_sec fwb">Postings history</div>
          {renderHistory()}
        </div>
      </div>
    </div>
  );
};

export default PostingsBase;
