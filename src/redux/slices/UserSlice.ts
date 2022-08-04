import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload;
    },
    logoutUser: (state) => {
      state.username = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const authUsernameSelector = (state: any) => state.user.username;

export default userSlice.reducer;
