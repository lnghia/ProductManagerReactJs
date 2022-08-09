import React from "react";

import { authUsernameSelector } from "../../../application/redux/slices/UserSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
  authenticationPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  authenticationPath,
  outlet,
}: ProtectedRouteProps) {
  const authUsername = useSelector(authUsernameSelector);

  if (authUsername) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
