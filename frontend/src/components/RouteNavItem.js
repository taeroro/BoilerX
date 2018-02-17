import React from "react";
import { Route } from "react-router-dom";
import { NavItem } from "react-bootstrap";

export default props =>
  <Route
    path={props.href}
    id={props.id}
    exact
    children={({ match, history }) =>
      <button
        id={props.id}
        className="nav-item"
        onClick={e => history.push(e.currentTarget.getAttribute("href"))}
        {...props}
        active={match ? true : false}
      >
        {props.children}
      </button>}
  />;
