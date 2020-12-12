import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";

const DashboardDrawer = ({ onClose, setCurrentTab }) => {
  let { url } = useRouteMatch();

  // setActiveTabName
  const setActiveTabName = (name) => {
    setCurrentTab(() => name);
  };

  return (
    <div className="fcol h-100 of-scr pad_b-16 bb w-100">
      <div className="w-100 pad-16 bb bg_ter-light">
        <div className="h-40 w-100 bg_white round-4"></div>
      </div>
      <div className="mar-16 fccc round-8 pad-16 bb bg_ter-light">
        <img
          className="h-60p w-60p round-complete"
          src="https://up.quizlet.com/x129k-RpTJ6-256s.jpg"
          alt=""
        />
        <div className="fwb mar_t-8 fsm fc_gray-light">Hello User</div>
        <div className="fc_white mar_t-4 fsxs">8002023337</div>
        <button className="bg_ter mar_t-16 round-4 btn cur pad_8-16 fc_white">
          View profile
        </button>
      </div>
      <div className="f1 fcol mar_l-16 mar_r-16">
        <div className="fcol m_r_t-16">
          <div className="fc_gray fsxs">ACCOUNT</div>
          <div onClick={onClose} className="fcol mar_t-16 fc_gray-light fss">
            <NavLink
              to={`${url}`}
              strict
              exact
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Overview")}
            >
              <i className="fas fa-chart-area mar_r-8 w-20p fcc"></i> Overview
            </NavLink>
            <NavLink
              to={`${url}/my_applications`}
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Applications")}
            >
              <i className="fas fa-file-invoice mar_r-8 w-20p fcc"></i>{" "}
              Applications
            </NavLink>
            <NavLink
              to={`${url}/my_postings`}
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Postings")}
            >
              <i className="fas fa-people-carry mar_r-8 w-20p fcc"></i> Postings
            </NavLink>
            <NavLink
              to={`${url}/my_transactions`}
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Transactions")}
            >
              <i className="fas fa-coins mar_r-8 w-20p fcc"></i> Transactions
            </NavLink>
            <NavLink
              to={`${url}/my_community`}
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("My community")}
            >
              <i className="fas fa-users mar_r-8 w-20p fcc"></i> My community
            </NavLink>
          </div>
        </div>
        <div className="fcol m_r_t-32">
          <div className="fc_gray fsxs">EXTRAS</div>
          <div onClick={onClose} className="fcol mar_t-16 fc_gray-light fss">
            <NavLink
              to={`${url}/notification`}
              exact
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Notifications")}
            >
              <i className="fas fa-bell mar_r-8 w-20p fcc"></i> Notifications
            </NavLink>
            <NavLink
              to={`${url}/my_alerts`}
              className="pad_8-16 fc fc_gray-light link"
              activeClassName="bg_ter-light round-4 fwb"
              onClick={() => setActiveTabName("Alerts")}
            >
              <i className="fas fa-bullhorn mar_r-8 w-20p fcc"></i> Alerts
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDrawer;
