import React from "react";
import Header from "../components/Header";
import SignIn from "../components/SignIn";

const LoginView = () => {
  return (
    <div>
      <Header location="Sign in" />
      <SignIn />
    </div>
  );
};

export default LoginView;
