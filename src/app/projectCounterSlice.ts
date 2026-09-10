import { createSlice } from "./reduxToolkit";
import { projects } from "../stage1/utils/projects";
import {
  getNextProjectIndex,
  getPreviousProjectIndex,
} from "../stage1/utils/projectNavigation";

interface ProjectCounterState {
  value: number;
}

const initialState: ProjectCounterState = {
  value: 0,
};

const fullCount = projects.length;

export const projectCounterSlice = createSlice({
  name: "projectCounter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = getNextProjectIndex(state.value, fullCount);
    },
    decrement: (state) => {
      state.value = getPreviousProjectIndex(state.value, fullCount);
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = projectCounterSlice.actions;

export default projectCounterSlice.reducer;
