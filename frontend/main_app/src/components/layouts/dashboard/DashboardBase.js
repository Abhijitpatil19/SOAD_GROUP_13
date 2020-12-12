import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import DashboardDrawer from "./DashboardDrawer";

const Overview = lazy(() => import("./dashboardBody/Overview"));
const Applications = lazy(() => import("./dashboardBody/Applications"));
const Transactions = lazy(() => import("./dashboardBody/Transactions"));
const Postings = lazy(() => import("./dashboardBody/Postings"));
const MyCommunity = lazy(() => import("./dashboardBody/MyCommunity"));
const Notification = lazy(() => import("./dashboardBody/Notification"));
const Alerts = lazy(() => import("./dashboardBody/Alerts"));

const DashboardBase = () => {
  // local state management
  const [isDashDrawerVisible, setIsDashDrawerVisible] = useState(false);
  const [dashDrawerClass, setDashDrawerClass] = useState(
    "dash_drawer_hidden bg_ter vis-flex h-100"
  );
  const [currentTab, setCurrentTab] = useState("Accounts");

  let { path } = useRouteMatch();
  const history = useHistory();

  // toggleDashDrawer
  const toggleDashDrawer = () => {
    setIsDashDrawerVisible(() => !isDashDrawerVisible);
  };

  // closeDashDrawer
  const closeDashDrawer = () => {
    setIsDashDrawerVisible(() => false);
  };

  // useEffect to change dashboard drawer visiblity state
  useEffect(() => {
    if (isDashDrawerVisible) {
      setDashDrawerClass(() => "dash_drawer_visible bg_ter vis-flex h-100");
    } else {
      setDashDrawerClass(() => "dash_drawer_hidden bg_ter vis-flex h-100");
    }
  }, [isDashDrawerVisible]);

  return (
    <div className="fcol h-100 w-100 bb">
      {/* dashboard header */}
      <div className="dash_header of-scr w-100 bg_white shadow_1-1-4-dark">
        <button
          className="dash_header_drawer_btn bg_trans round-4 mar_l-8 pad-0 cur"
          onClick={toggleDashDrawer}
        >
          <i className="fas h-32p w-36p fc_white fsm round-4 fcc bg_ter-light fa-bars"></i>
          <i className="fas fsl fc_pback fa-chevron-right mar_l-8 mar_r-8"></i>
          <span className="fsm mar_t-2">{currentTab}</span>
        </button>
        <div className="fc no_wrap"></div>
        <div className="fc">
          <button className="btn m_r_r-16 h-32p w-32p bg_succ-light round-complete fc_succ cur">
            <i className="fas fsm fa-bell"></i>
          </button>
          <button className="btn m_r_r-16 h-32p w-32p bg_err-light round-complete fc_err cur">
            <i className="fas fsm fa-envelope-open-text"></i>
          </button>
          <button
            onClick={() => history.push("/account/my_postings/new_post")}
            className="btn m_r_r-16 h-32p w-32p bg_pri-light round-complete fc_pri cur"
          >
            <i className="fas fsm fa-plus"></i>
          </button>
        </div>
      </div>
      {/* dashboard drawer + body */}
      <div className="w-100 f1 vis-flex pos_rel">
        {/* drawer */}
        <div className={dashDrawerClass}>
          <DashboardDrawer
            onClose={closeDashDrawer}
            setCurrentTab={setCurrentTab}
          />
          <button
            className="dash_drawer_close_btn btn round-4 bg_gray shadow_neumorph"
            onClick={closeDashDrawer}
          >
            <i className="fas fsxl fa-times"></i>
          </button>
        </div>
        {/* body */}
        <div className="dash_body h-100 of-scr">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="fcc w-100" style={{ height: "100vh" }}>
                  <i className="fas fa-spinner fs2x fa-spin"></i>
                </div>
              }
            >
              <Switch>
                <Route exact strict path={path}>
                  <Overview />
                </Route>
                <Route exact path={`${path}/my_applications`}>
                  <Applications />
                </Route>
                <Route path={`${path}/my_postings`}>
                  <Postings />
                </Route>
                <Route exact path={`${path}/my_transactions`}>
                  <Transactions />
                </Route>
                <Route exact path={`${path}/my_community`}>
                  <MyCommunity />
                </Route>
                <Route exact path={`${path}/notification`}>
                  <Notification />
                </Route>
                <Route exact path={`${path}/alerts`}>
                  <Alerts />
                </Route>
                <Redirect to="/error_404">Page not found.</Redirect>
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default DashboardBase;
