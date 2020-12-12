import React, { Suspense } from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import Footer from "../layouts/footer/Footer";
import JobPage from "../layouts/jobPage/JobPage";

const Search = () => {
  let { path } = useRouteMatch();

  return (
    <ErrorBoundary>
      <Suspense fallback={"Loading..."}>
        <Switch>
          <Route exact path={path}>
            <div className="fcol w-100">
              <section className="home_layout_box bg_white fcol">
                Display Search results here
                <Link to="/jobs/whatever">Whatever</Link>
                <Link to="/jobs/agriculture">Agriclture</Link>
                <Link to="/jobs/all">All</Link>
              </section>
              <section className="w-100 mar_t-16">
                <Footer />
              </section>
            </div>
          </Route>
          <Route path={`${path}/:jobParams`}>
            <JobPage />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Search;
