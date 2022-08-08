import { LogClient } from "../../../application/logger/LogClient";
import React from "react";

const Login = () => {
  LogClient.log("alo");

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
