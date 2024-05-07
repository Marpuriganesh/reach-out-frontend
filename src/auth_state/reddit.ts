/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Retrieve persisted state from localStorage or use default initial state
const persistedState = localStorage.getItem("redditState")
  ? JSON.parse(localStorage.getItem("redditState")!)
  : { reddit: false };

const initialState = {
  reddit: persistedState.reddit ?? false,
};

const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {
    setReddit: (state, action: PayloadAction<boolean>) => {
      state.reddit = action.payload;
      // Save updated reddit state to localStorage
      localStorage.setItem(
        "redditState",
        JSON.stringify({ reddit: action.payload })
      );
    },
    clearRedditState: (state) => {
      state.reddit = false;
      // Remove reddit state from localStorage
      localStorage.removeItem("redditState");
    },
  },
});

export const { setReddit, clearRedditState } = redditSlice.actions;
const redditReducers = redditSlice.reducer;

export default redditReducers;
