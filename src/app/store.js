import { configureStore } from "@reduxjs/toolkit";
import projectCounterReducer from "./projectCounterSlice";
import contactsCounterReducer from "./contactsCounterSlice";
import aboutCounterReducer from "./aboutSlice";
import mainReducer from "./mainSlice";
import loaderReducer from "./loaderSlice";

export const store = configureStore({
  reducer: {
    projectCounter: projectCounterReducer,
    contactCounter: contactsCounterReducer,
    aboutCounter: aboutCounterReducer,
    main: mainReducer,
    loader: loaderReducer,
  },
});
