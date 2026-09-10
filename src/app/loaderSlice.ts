import { createSlice, type PayloadAction } from "./reduxToolkit";

export const LOADER_INTRO_END = 8.7;

export interface LoaderState {
  value: number;
  isRevealing: boolean;
}

const initialState: LoaderState = {
  value: 0,
  isRevealing: false,
};

export const loaderCounterSlice = createSlice({
  name: "loaderCounter",
  initialState,
  reducers: {
    setLoaderProgress: (state, action: PayloadAction<number>) => {
      state.value = Math.min(
        LOADER_INTRO_END,
        Math.max(0, action.payload)
      );
    },
    startLoaderReveal: (state) => {
      state.isRevealing = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoaderProgress, startLoaderReveal } =
  loaderCounterSlice.actions;

export default loaderCounterSlice.reducer;
