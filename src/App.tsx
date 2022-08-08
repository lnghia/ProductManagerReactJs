import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import NavBar from "./presentation/shared/components/NavBar";
import Login from "./presentation/authentication/pages/Login";
import ProtectedRoute from "./presentation/shared/components/ProtectedRoute";
import Logout from "./presentation/authentication/pages/Logout";

import { ProtectedRouteProps } from "./presentation/shared/components/ProtectedRoute";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/logout"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Logout />}
            />
          }
        />
        <Route path="*" element={<p>Nothing here, 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
