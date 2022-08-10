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
import { useSelector } from "react-redux";
import { isLoggedIn } from "./application/redux/slices/UserSlice";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

function App() {

  const isLogged: boolean = useSelector(isLoggedIn);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar />

      {isLogged && <SideBar /> }

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
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
      </Box>
    </Box>
  );
}

export default App;