import { createSlice, type PayloadAction } from "./reduxToolkit";

export type Stage = 0 | 1 | 2;
export type WarningReason = "fps" | "mobile" | "safari";
type WarningAction = WarningReason | "clear";

export interface MainState {
  value: Stage;
  warning: {
    wasTriggered: boolean;
    reason: WarningReason | "";
  };
}

const initialState: MainState = {
  value: 0,
  warning: { wasTriggered: false, reason: "" },
};

export const mainSlice = createSlice({
  name: "mainr",
  initialState,
  reducers: {
    setMain: (state, action: PayloadAction<Stage>) => {
      state.value = action.payload;
    },
    triggerWarning: (state, action: PayloadAction<WarningAction>) => {
      if (!state.warning.wasTriggered) {
        state.warning.wasTriggered = true;
        state.warning.reason =
          action.payload === "clear" ? "" : action.payload;
      }
      if (action.payload === "clear") state.warning.reason = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMain, triggerWarning } = mainSlice.actions;

export default mainSlice.reducer;
