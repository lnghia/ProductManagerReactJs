import { Message } from "./../../types/message";
import { ADMIN } from "../../../application/types/constant";
import { createSlice } from "@reduxjs/toolkit";

interface messagesStateType {
  message: Message;
}

const initialStatesValue: messagesStateType = {
  message: {
    content: "",
    type: "error",
  },
};

export const messageBoxSlice = createSlice({
  name: "message",
  initialState: initialStatesValue,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = initialStatesValue.message;
    },
  },
});

export const { addMessage, clearMessage } = messageBoxSlice.actions;

export const messageBoxSelector = (state: any) => state.message.message;

export default messageBoxSlice.reducer;
