import { createSlice, type PayloadAction } from "./reduxToolkit";

export interface AboutState {
  value: number;
  isGlitch: boolean;
  isBack: boolean;
}

const initialState: AboutState = {
  value: 0,
  isGlitch: false,
  isBack: false,
};

export const aboutCounterSlice = createSlice({
  name: "aboutCounter",
  initialState,
  reducers: {
    setAboutCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    decrementAboutCount: (state, action: PayloadAction<number>) => {
      if (state.value > 0) {
        if (action.payload > state.value) state.value = 0;
        else state.value -= action.payload;
      }
    },
    setGlitchState: (state, action: PayloadAction<boolean>) => {
      state.isGlitch = action.payload;
    },
    setBackState: (state, action: PayloadAction<boolean>) => {
      state.isBack = action.payload;
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
