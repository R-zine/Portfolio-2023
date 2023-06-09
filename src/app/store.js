import { configureStore } from "@reduxjs/toolkit";
import projectCounterReducer from "./projectCounterSlice";
import contactsCounterReducer from "./contactsCounterSlice";

export const store = configureStore({
  reducer: {
    projectCounter: projectCounterReducer,
    contactCounter: contactsCounterReducer,
  },
});
