import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("Token");
  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;
  const login = (token, email) => {
    localStorage.setItem("Token", token);
    localStorage.setItem("email", email);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
