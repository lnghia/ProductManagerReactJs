import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import userReducer from "./slices/UserSlice";
import MessageBoxReducer from "./slices/MessageBoxSlice";

const rootReducer = combineReducers({
  user: userReducer,
  message: MessageBoxReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
