import { addMessage } from "../../../application/redux/slices/MessageBoxSlice";
import { useDispatch } from "react-redux";
import { Component } from "react";

export const raiseMessageBox = (
  message: string,
  type: "info" | "warning" | "error" | "success"
) => {};
