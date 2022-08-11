import { ADMIN } from "../../../application/types/constant";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState : {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    isLogin: false
  },
  reducers: {
    setCurrentUserState: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLogin = true
    },
    logoutUser: (state) => {
      state.id = 0;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.role = "";
      state.isLogin = false
    }
  },
});

export const { setCurrentUserState, logoutUser } = userSlice.actions;

export const authUsernameSelector = (state: any) => `${state.user.firstName} ${state.user.lastName}`;

export const isLoggedIn = (state: any) =>  state.user.isLogin;

export const isAdmin = (state: any) =>  ADMIN === state.user.role;

export const getCurrentUserRole = (state: any) => state.user.role;

export default userSlice.reducer;



