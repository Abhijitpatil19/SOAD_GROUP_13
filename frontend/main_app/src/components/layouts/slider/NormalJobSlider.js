import React from "react";
import smoothscroll from "smoothscroll-polyfill";

import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import NormalJob from "../jobs/NormalJob";
import { useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const NormalJobSlider = ({ loading, data, heading }) => {
  const sliderRef = useRef();

  // kick off the polyfill!
  smoothscroll.polyfill();
  window.__forceSmoothScrollPolyfill__ = true;

  // scrollRight
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200;
    }
  };

  // scrollLeft
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += -200;
    }
  };

  // renderPlaceholder
  const renderPlaceholder = () => {
    return (
      <SkeletonTheme color="#8a8a8a" highlightColor="#ffffff">
        <div className="fc w-100 of-scr sb-hid mar_t-16 round-8 shadow_0-0-4-light bb">
          <div className="fcol mar-16">
            <div className="fc">
              <Skeleton height={40} width={40} />
              <div className="fcol mar_l-8">
                <Skeleton count={1} width={120} height={16} />
                <Skeleton
                  style={{ marginTop: "4px" }}
                  count={1}
                  width={80}
                  height={10}
                />
              </div>
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={12} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={12}
              />
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={16} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={16}
              />
              <Skeleton
                style={{ marginTop: "16px" }}
                count={1}
                width={170}
                height={20}
              />
            </div>
          </div>
          <div className="fcol mar-16">
            <div className="fc">
              <Skeleton height={40} width={40} />
              <div className="fcol mar_l-8">
                <Skeleton count={1} width={120} height={16} />
                <Skeleton
                  style={{ marginTop: "4px" }}
                  count={1}
                  width={80}
                  height={10}
                />
              </div>
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={12} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={12}
              />
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={16} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={16}
              />
              <Skeleton
                style={{ marginTop: "16px" }}
                count={1}
                width={170}
                height={20}
              />
            </div>
          </div>
          <div className="fcol mar-16">
            <div className="fc">
              <Skeleton height={40} width={40} />
              <div className="fcol mar_l-8">
                <Skeleton count={1} width={120} height={16} />
                <Skeleton
                  style={{ marginTop: "4px" }}
                  count={1}
                  width={80}
                  height={10}
                />
              </div>
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={12} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={12}
              />
            </div>
            <div className="fcol mar_t-16">
              <Skeleton count={1} width={170} height={16} />
              <Skeleton
                style={{ marginTop: "4px" }}
                count={1}
                width={170}
                height={16}
              />
              <Skeleton
                style={{ marginTop: "16px" }}
                count={1}
                width={170}
                height={20}
              />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  };

  // render job list conditionally
  const renderJobList = () => {
    if (data?.results?.length > 0) {
      return (
        <div
          ref={sliderRef}
          style={{
            scrollBehavior: "smooth",
          }}
          className="fc w-100 of-scr sb-hid mar_t-16 round-8 shadow_0-0-4-light bb"
        >
          {data.results.map((job) => (
            <div className="bor_r_gray-1" key={job.id}>
              <NormalJob job={job} />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="fc w-100 pad-16 bb bg_pri-light round-4 fc_sec fsm mar_t-16">
          <i className="fas fa-info-circle mar_r-8"></i>
          No jobs available in this category.
        </div>
      );
    }
  };

  return (
    <div className="fcol mar_t-32 w-100">
      <div className="fc_bw pad_0-8">
        <div className="fwb fc_sec fsm">{heading}</div>
        <div className="fc">
          <Link className="link fsm" to="/trending/jobs">
            Show all
          </Link>
          <button
            onClick={scrollLeft}
            className="btn cur mar_l-16 hov_gray-light fcc fsxs h-20p w-20p round-4 bg_gray-light shadow_1-1-4-light"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollRight}
            className="btn cur mar_l-8 hov_gray-light fcc fsxs h-20p w-20p round-4 bg_gray-light shadow_1-1-4-light"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      {loading ? renderPlaceholder() : renderJobList()}
    </div>
  );
};

export default NormalJobSlider;
