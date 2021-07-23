import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
