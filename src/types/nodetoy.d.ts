declare module "@nodetoy/react-nodetoy" {
  import type {
    ForwardRefExoticComponent,
    RefAttributes,
  } from "react";

  export interface NodeToyMaterialProps {
    data?: unknown;
    [property: string]: unknown;
  }

  export const NodeToyMaterial: ForwardRefExoticComponent<
    NodeToyMaterialProps & RefAttributes<unknown>
  >;
}
