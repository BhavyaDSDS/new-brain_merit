import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    key: "/login",
  },
];

function AuthRoutingList() {
  return routes.map((item) => {
    if (item.path.split("/").length === 2) {
      return (
        <Route
          exact
          path={item.path}
          component={item.component}
          key={item.key}
        />
      );
    }
    return <Route path={item.path} component={item.component} key={item.key} />;
  });
}

export default AuthRoutingList;
