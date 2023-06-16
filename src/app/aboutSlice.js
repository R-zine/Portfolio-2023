import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  isGlitch: false,
  isBack: false,
};

export const aboutCounterSlice = createSlice({
  name: "aboutCounter",
  initialState,
  reducers: {
    setAboutCount: {
      reducer: (state, action) => {
        state.value = action.payload;
      },
    },
    decrementAboutCount: {
      reducer: (state, action) => {
        if (state.value > 0) {
          if (action.payload > state.value) state.value = 0;
          else state.value -= action.payload;
        }
      },
    },
    setGlitchState: {
      reducer: (state, action) => {
        state.isGlitch = action.payload;
      },
    },
    setBackState: {
      reducer: (state, action) => {
        state.isBack = action.payload;
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAboutCount,
  setGlitchState,
  setBackState,
  decrementAboutCount,
} = aboutCounterSlice.actions;

export default aboutCounterSlice.reducer;
