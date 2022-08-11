import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { LoginFormState } from "../../../infrastructure/api/dtos/LoginFormState";
import { login } from "../../../infrastructure/api/auth-api";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../infrastructure/api/user-api";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoggedIn,
  setCurrentUserState,
} from "../../../application/redux/slices/UserSlice";
import { ACCESS_TOKEN, ADMIN } from "../../../application/types/constant";

const initialState: LoginFormState = {
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      getAndSaveUserLoggedInfo();
    }
  }, []);

  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setState({ ...state, password: event.target.value });
  };

  const handleLogin = () => {
    login(state.email, state.password)
      .then((data: any) => {
        localStorage.setItem(ACCESS_TOKEN, data.id_token);
        getAndSaveUserLoggedInfo();
      })
      .catch((err) => {
        setErrorMessage("Email or Password wrong. Please check again!!!");
      });
  };

  const getAndSaveUserLoggedInfo = () => {
    getCurrentUser().then((response: any) => {
      const user = response.data;
      dispatch(setCurrentUserState(user));
      if (user.role === ADMIN) {
        navigate("/users");
      } else {
        navigate("/products");
      }
    });
  };

  return (
    <form noValidate autoComplete="off" style={{ alignSelf: "center" }}>
      <Card>
        <CardHeader title="Login App" />
        <CardContent>
          {errorMessage && (
            <div>
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
          <div>
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={onChangeEmail}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={onChangePassword}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
