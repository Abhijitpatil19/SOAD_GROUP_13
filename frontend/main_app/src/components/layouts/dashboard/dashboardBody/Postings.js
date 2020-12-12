import React, { Suspense } from "react";
import { lazy } from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

import ErrorBoundary from "../../../errorBoundary/ErrorBoundary";

const PostingsBase = lazy(() => import("./postings/PostingsBase"));
const NewPost = lazy(() => import("./postings/NewPost"));

const Postings = () => {
  let { path } = useRouteMatch();

  return (
    <ErrorBoundary>
      <Suspense fallback="">
        <Switch>
          <Route exact strict path={path}>
            <PostingsBase />
          </Route>
          <Route exact path={`${path}/new_post`}>
            <NewPost />
          </Route>
          <Redirect to="/error_404">Page not found.</Redirect>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Postings;
