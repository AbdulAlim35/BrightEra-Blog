import React from "react";
import { useTheme } from "../contex/TheemProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuth } = useTheme();
 const data= useLocation();


  return isAuth ? children : <Navigate to="/" state={data.pathname} replace />;
}
