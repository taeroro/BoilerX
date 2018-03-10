import React from "react";
import { Route, Switch } from "react-router-dom";

// non-packages
import HomePage from "./components/home_page";
import AppliedRoute from "./components/AppliedRoute";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import SearchResult from "./containers/SearchResult";
import SearchResultDetail from "./containers/SearchResultDetail";
import ProfilePage from "./components/ProfilePage";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/profile" exact component={ProfilePage} props={childProps} />
    <Route path="/search/:id" exact component={SearchResultDetail} props={childProps} />
    <AppliedRoute path="/search" exact component={SearchResult} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/" exact component={HomePage} props={childProps} />

    { /* Catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
