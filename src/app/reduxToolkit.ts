import * as toolkitNamespace from "@reduxjs/toolkit";

type ToolkitModule = typeof toolkitNamespace;

// Redux Toolkit 1.x publishes ESM for bundlers and CommonJS for Node. Node
// exposes that CommonJS entry under `default`, while Vite exposes named exports.
const commonJsToolkit = Reflect.get(toolkitNamespace, "default") as
  | ToolkitModule
  | undefined;
const toolkit = commonJsToolkit ?? toolkitNamespace;

export const { configureStore, createSlice } = toolkit;
export type { PayloadAction } from "@reduxjs/toolkit";
