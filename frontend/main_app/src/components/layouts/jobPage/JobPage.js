import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import Footer from "../footer/Footer";
import { getUrlParams } from "../../../Utilities";
import placeholder from "../../../res/jobs/placeholder.svg";
import { GlobalContext } from "../../../contexts/Provider";
import getPublicJobDetail from "../../../contexts/actions/jobs/getPublicJobDetail";
import { TimestampToTime } from "../../../Utilities";
import { searchBarContext } from "../../../App";
import isAuthenticated from "../../../utils/isAuthenticated";
import postApplication from "../../../contexts/actions/jobs/postApplication";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const JobPage = () => {
  // local state management
  const [appliedStatus, setAppliedStatus] = useState(false);

  const {
    isSearchBarVisible,
    setIsSearchBarVisible,
    setSearchBarVisibleClass,
    setSearchBarClass,
  } = useContext(searchBarContext);

  // hiding search bar by default
  useEffect(() => {
    if (isSearchBarVisible) {
      setIsSearchBarVisible(() => false);
      setSearchBarVisibleClass(() => "search_hidden_body h-100 w-100");
      setSearchBarClass(() => "search_bar_hidden pos_abs fcc w-100");
    }
  }, []);

  const history = useHistory();
  const location = useLocation();
  let { jobParams } = useParams();
  const { addToast } = useToasts();

  // fetching public jobs of home
  const {
    jobDetailDispatch,
    jobDetailState: {
      jobDetail: { loading, error, data },
    },
    postApplicationDispatch,
    postApplicationState: {
      postApplication: {
        postApplicationLoading,
        postApplicationError,
        postApplicationData,
      },
    },
  } = useContext(GlobalContext);

  console.log("Job page", loading, error, data);

  useEffect(() => {
    let params = "title=" + jobParams;
    params = getUrlParams(params);
    getPublicJobDetail(history)(jobDetailDispatch, params.id);
  }, [jobParams]);

  console.log(
    "Apply job",
    postApplicationLoading,
    postApplicationError,
    postApplicationData
  );

  // handleApply
  const handleApply = () => {
    // check for login and proceed
    if (isAuthenticated() && data.id) {
      postApplication(history)(postApplicationDispatch, data.id);

      if (postApplicationData !== []) {
        addToast("You have applied for this job.", {
          appearance: "success",
          autoDismiss: true,
        });
        setAppliedStatus(() => true);
        history.push("/account/my_applications/");
      } else {
        setAppliedStatus(() => false);
      }
    } else {
      addToast("Please login to apply for the job", {
        appearance: "info",
        autoDismiss: true,
      });
      history.push(`/login?destination=${location.pathname}`);
    }
  };

  // renderApplyBtn
  const renderApplyBtn = () => {
    if (appliedStatus) {
      return (
        <button className="btn fcc round-4 bg_succ cur h-36p w-180p fc_white fwb fsm">
          Applied <i className="fas fa-check-circle mar_l-8"></i>
        </button>
      );
    } else {
      return (
        <button
          onClick={handleApply}
          className="btn fcc round-4 bg_pri btn_pri cur h-36p w-180p fc_white fwb fsm"
        >
          Apply
        </button>
      );
    }
  };

  // renderPlaceholder
  const renderPlaceholder = () => {
    return (
      <SkeletonTheme color="#8a8a8a" highlightColor="#ffffff">
        <div className="fcol">
          <div className="f_lrtb alignc-mob">
            <Skeleton height={120} width={120} />
            <div className="mar_pc-l_mob-t-32 alignc-mob fcol">
              <Skeleton count={1} width={100} height={32} />
              <Skeleton
                style={{ marginTop: "8px" }}
                count={1}
                width={150}
                height={16}
              />
              <Skeleton
                style={{ marginTop: "32px" }}
                count={1}
                width={100}
                height={16}
              />
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152 fcol">
            <Skeleton
              style={{ marginTop: "8px" }}
              count={1}
              width={80}
              height={12}
            />
            <Skeleton
              style={{ marginTop: "16px" }}
              count={1}
              width={250}
              height={32}
            />
          </div>
          <div className="mar_t-32 mar_pc-l-152">
            <div className="fc mar_t-32">
              <Skeleton count={1} width={80} height={40} />
              <Skeleton
                circle={true}
                style={{ marginLeft: "8px" }}
                width={40}
                height={40}
              />
              <Skeleton
                circle={true}
                style={{ marginLeft: "8px" }}
                width={40}
                height={40}
              />
              <Skeleton
                circle={true}
                style={{ marginLeft: "8px" }}
                width={40}
                height={40}
              />
            </div>
            <Skeleton
              style={{ marginTop: "16px" }}
              count={1}
              width={200}
              height={12}
            />
          </div>
        </div>
      </SkeletonTheme>
    );
  };

  // renderJobDetails
  const renderJobDetails = () => {
    if (data) {
      return (
        <div className="fcol">
          <div className="f_lrtb alignc-mob">
            <img
              className="h-120p w-120p round-16 shadow_0-0-8-dark"
              src={data.logo_image || placeholder}
              alt=""
            />
            <div className="mar_pc-l_mob-t-32 fcol alignc-mob">
              <div className="fwb fsl">{data.title || "N/A"}</div>
              <div className="mar_t-4 fsm fc_5c">
                {data.address || "India"}, {data.subDist || ""}
              </div>
              <div className="mar_t-16 fsm fc_sec">
                {data.owner?.first_name || "Name"}{" "}
                {data.owner?.last_name || "Unavailable"}
              </div>
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152 fcol">
            <div className="fc_sec fwb fsm">Job description</div>
            <div className="mar_t-8 fc_5c fsm bg_pri-light round-4 pad-16 bb">
              {data.description || "No description available for this job."}
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152">
            <div className="fc">
              {renderApplyBtn()}
              <button className="mar_l-16 no_wrap btn h-40 w-40 round-complete bg_warn fcc bb cur fc_white pad_0-8">
                <i className="fas fsl fa-comments"></i>
              </button>
              <button className="mar_l-8 no_wrap btn h-40 w-40 fcc round-complete bg_ter-light fc_white bb cur">
                <i className="fas fsl fa-share-square"></i>
              </button>
              <button className="mar_l-8 no_wrap btn h-40 w-40 fcc round-complete bg_succ fc_white bb cur">
                <i className="fas fsl fa-location-arrow"></i>
              </button>
            </div>
            <div className="fc fc_5c fsxs mar_t-16 f_wrap">
              <div className="fc mar_r-8 no_wrap">
                <i className="fas fa-clock mar_r-4"></i>Posted:{" "}
                <strong>
                  {TimestampToTime(
                    data.date_of_creation ? data.date_of_creation : new Date(),
                    "dd Mmm yyyy, hh:mm"
                  )}
                </strong>
                ,
              </div>
              <div className="fc mar_r-8 no_wrap">
                <i className="fas fa-briefcase mar_r-4"></i>Vacancy:{" "}
                <strong>{data.vacancy_count || "N/A"}</strong>,
              </div>
              <div className="fc no_wrap">
                <i className="fas fa-file-alt mar_r-4"></i>Total applicants:{" "}
                <strong>{data.total_submitted || "N/A"}</strong>
              </div>
            </div>
          </div>
          <div className="mar_t-48 mar_pc-l-152 fcol">
            <div className="fc_sec fwb fsm">Job details</div>
            <div className="mar_t-8 fss round-4 w-100 bb fcol">
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Category</div>
                <div>{data.job_sector || "N/A"}</div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Job duration</div>
                <div>
                  {data.duration || "N/A"} {data.duration_unit || "N/A"}
                </div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Pay scale</div>
                <div>
                  ₹{data.payment || "N/A"} per {data.payment_unit || "N/A"}
                </div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Quanity required</div>
                <div>{data.vacancy_count || "N/A"}</div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Application deadline</div>
                <div>
                  {TimestampToTime(
                    data.date_of_expiry ? data.date_of_expiry : new Date(),
                    "dd Mmm yyyy, hh:mm"
                  )}
                </div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Pay negotiable</div>
                <div>{data.is_negotiable ? "Yes" : "No"}</div>
              </div>
              <div className="fc nth_f5 pad-8">
                <div className="w-180p fwb fc_5c">Accomodation available</div>
                <div>{data.accomodation_available ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152">
            <div className="fc_sec fwb fsm">Required skillset</div>
            <div className="bg_body_gray fss mar_t-8 pad-16 round-4 bb">
              {data.skills_required ||
                "Skillset requirements aren't available for this job."}
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152">
            <div className="fc_sec fwb fsm">Additional details</div>
            <div className="bg_body_gray fss mar_t-8 pad-16 round-4 bb">
              {data.other_details || "No additional requirements available."}
            </div>
          </div>
          <div className="mar_t-32 mar_pc-l-152">
            <div className="fc_sec fwb fsm">Job location</div>
            <div className="bg_pri-light fss mar_t-8 pad-16 round-4 bb">
              {data.address || "Local address not available"}
              <br />
              {data.villageCity || "N/A"}, {data.subDist || "N/A"},{" "}
              {data.dist || "N/A"}, {data.state || "N/A"},{" "}
              {data.country || "N/A"}, {data.pin || "N/A"}
              <br />
              <strong>Contact: </strong>
              {data.contact || "N/A"}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>No such jobs found. Please check your url.</div>;
    }
  };

  return (
    <div className="fcol w-100">
      <section className="job_page_layout_box bg_white fcol w-100">
        {loading ? renderPlaceholder() : renderJobDetails()}
      </section>
      <section className="home_layout_box bg_white fcol">
        Other contents to be added soon.
      </section>
      <section className="w-100 mar_t-16">
        <Footer />
      </section>
    </div>
  );
};

export default JobPage;
