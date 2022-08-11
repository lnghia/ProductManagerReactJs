import React, { useState } from "react";
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
import { isAdmin, isLoggedIn } from "./application/redux/slices/UserSlice";
import { Navigate } from "react-router-dom";
import AddUser from "./presentation/user/pages/AddUser";
import { Message } from "./application/types/message";
import { messageBoxSelector } from "./application/redux/slices/MessageBoxSlice";
import ProductList from "./presentation/product/pages/ProductList";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
  authenticationPath: "/",
  accessRole: "",
};

function App() {
  const isLogged: boolean = useSelector(isLoggedIn);
  const isAdminRole: boolean = useSelector(isAdmin);
  const message: Message = useSelector(messageBoxSelector);
  const defaultPage = !isLogged ? (
    <Navigate to="/login" />
  ) : isAdminRole ? (
    <Navigate to="/users" />
  ) : (
    <p>Products Page</p>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <NavBar />

      {isLogged && <SideBar />}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        display="flex"
        justifyContent="center"
        // alignItems="center"
        height="100vh"
        style={{ borderColor: "red", borderStyle: "solid" }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={defaultPage} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<UserList />}
                accessRole="ROLE_ADMIN"
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<ProductList/>}
                accessRole="ROLE_USER"
              />
            }
          />
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
            path="/users/add_user"
            element={
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                outlet={<AddUser />}
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
