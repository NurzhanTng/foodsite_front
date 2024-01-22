import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice.ts";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
