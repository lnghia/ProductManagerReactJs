import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./features/auth/pages/Login";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>Nothing here, 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
