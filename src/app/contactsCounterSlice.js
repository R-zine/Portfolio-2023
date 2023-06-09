import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const maxCount = 4;

export const contactCounterSlice = createSlice({
  name: "contactCounter",
  initialState,
  reducers: {
    incrementContact: (state) => {
      if (state.value >= maxCount) state.value = maxCount;
      else state.value += 1;
    },
    setContactCount: {
      reducer: (state, action) => {
        state.value = action.payload;
      },
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
