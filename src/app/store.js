import { configureStore } from "@reduxjs/toolkit";
import projectCounterReducer from "./projectCounterSlice";

export const store = configureStore({
  reducer: {
    projectCounter: projectCounterReducer,
  },
});
