import React from "react";

import { getCurrentUserRole, isLoggedIn } from "../../../application/redux/slices/UserSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
  accessRole: string;
};

const ProtectedRoute = ({ authenticationPath, outlet, accessRole }: ProtectedRouteProps) => {
  const isLogged: boolean = useSelector(isLoggedIn);
  if (isLogged) {
    const userRole: string = useSelector(getCurrentUserRole);
    if (!accessRole || accessRole === userRole) {
      return outlet;
    }
  }
  return <Navigate to={authenticationPath } replace/>;
};

export default ProtectedRoute;