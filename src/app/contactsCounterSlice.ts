import { createSlice, type PayloadAction } from "./reduxToolkit";

export type ContactPhase = 0 | 1 | 2 | 3 | 4 | 5;

export interface ContactCounterState {
  value: ContactPhase;
}

const initialState: ContactCounterState = {
  value: 0,
};

const maxCount = 4;

export const contactCounterSlice = createSlice({
  name: "contactCounter",
  initialState,
  reducers: {
    incrementContact: (state) => {
      if (state.value >= maxCount) state.value = maxCount;
      else state.value = (state.value + 1) as ContactPhase;
    },
    setContactCount: (state, action: PayloadAction<ContactPhase>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementContact, setContactCount, reset } =
  contactCounterSlice.actions;

export default contactCounterSlice.reducer;
