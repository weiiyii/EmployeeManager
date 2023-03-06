import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth";

import Home from "../pages/Home";

const AuthRoute = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Navigate replace to="/authenticate" /> : <Home />;
};

export default AuthRoute;
