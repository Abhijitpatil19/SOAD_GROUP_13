import React, { lazy, Suspense, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

// importing contexts
import { searchBarContext } from "../../App";
import { GlobalContext } from "../../contexts/Provider";
import getPublicJobsHome from "../../contexts/actions/jobs/getPublicJobsHome";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import Chatbot from "../chatbot/Chatbot";
const CarouselSlider = lazy(() => import("../layouts/carousel/CarouselSlider"));
const TrendingBox = lazy(() => import("../layouts/trendingBox/TrendingBox"));
const NormalJobSlider = lazy(() => import("../layouts/slider/NormalJobSlider"));
const HomeTabs = lazy(() => import("../layouts/tabs/HomeTabs"));
const Footer = lazy(() => import("../layouts/footer/Footer"));
const HomeRight = lazy(() => import("../layouts/homeRight/HomeRight"));
const HomeLeft = lazy(() => import("../layouts/homeLeft/HomeLeft"));

const Home = () => {
  // using imported context
  const {
    isSearchBarVisible,
    setIsSearchBarVisible,
    setSearchBarVisibleClass,
    setSearchBarClass,
  } = useContext(searchBarContext);

  const history = useHistory();

  // fetching public jobs of home
  const {
    publicJobsHomeDispatch,
    publicJobsHomeState: {
      publicJobsHome: { loading, error, data },
    },
  } = useContext(GlobalContext);

  useEffect(() => {
    getPublicJobsHome(history)(publicJobsHomeDispatch);
  }, []);

  console.log("Home public jobs", loading, error, data);

  // hiding search bar by default
  useEffect(() => {
    if (isSearchBarVisible) {
      setIsSearchBarVisible(() => false);
      setSearchBarVisibleClass(() => "search_hidden_body h-100 w-100");
      setSearchBarClass(() => "search_bar_hidden pos_abs fcc w-100");
    }
  }, []);

  return (
    <div className="home w-100 bb fcol">
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="fcc w-100" style={{ height: "100vh" }}>
              <i className="fas fa-spinner fs2x fa-spin"></i>
            </div>
          }
        >
          <CarouselSlider />
          <section className="home_layout_box bg_white">
            {/* left part */}
            <div className="home_lb-1 bb round-8">
              <HomeLeft />
            </div>

            {/* center part */}
            <div className="home_lb-2 bb fcol">
              <TrendingBox />
              <div className="w-100 bg_white h-1 mar_t-32 shadow_1-1-4-dark"></div>
              <NormalJobSlider
                loading={loading}
                data={data}
                heading="Trending jobs nearby"
              />
              <div className="w-100 bg_white h-1 mar_t-48 shadow_1-1-4-dark"></div>
              <NormalJobSlider
                loading={loading}
                data={data}
                heading="Based on your profile"
              />
              <div className="w-100 bg_white h-1 mar_t-48 shadow_1-1-4-dark"></div>
              <HomeTabs />
            </div>

            {/* right part */}
            <div className="home_lb-3 bb">
              <HomeRight />
            </div>
          </section>
          <section className="home_layout_box bg_white">
            Other section will be added soon.
          </section>
          <section className="w-100 mar_t-16">
            <Footer />
          </section>

          {/* <div
        style={{ position: "absolute", bottom: 0, right: 0 }}
        className="mar_r-32 mar_b-32"
      >
        <Chatbot />
      </div> */}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
