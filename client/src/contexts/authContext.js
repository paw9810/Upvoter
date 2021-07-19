import React from "react";

const AuthContext = React.createContext({
  userId: null,
  setUserId: () => {},
  user: "guest",
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default AuthContext;
