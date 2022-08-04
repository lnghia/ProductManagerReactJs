import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./features/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./features/auth/pages/Logout";

import { ProtectedRouteProps } from "./components/ProtectedRoute";

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
