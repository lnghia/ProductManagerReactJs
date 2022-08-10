import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import NavBar from "./presentation/shared/components/NavBar";
import Login from "./presentation/authentication/pages/Login";
import ProtectedRoute from "./presentation/shared/components/ProtectedRoute";
import Logout from "./presentation/authentication/pages/Logout";

import { ProtectedRouteProps } from "./presentation/shared/components/ProtectedRoute";
import SideBar from "./presentation/shared/components/SideBar";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import UserList from "./presentation/user/pages/UserList";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar />

      <SideBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
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
          <Route
            path="/users"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<UserList />}
              />
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="*" element={<p>Nothing here, 404!</p>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
