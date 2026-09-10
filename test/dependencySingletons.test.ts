import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, test } from "node:test";

const projectRequire = createRequire(
  new URL("../package.json", import.meta.url)
);
const nodeToyRequire = createRequire(
  new URL(
    "../node_modules/@nodetoy/react-nodetoy/package.json",
    import.meta.url
  )
);

describe("NodeToy renderer dependencies", () => {
  for (const dependency of [
    "react",
    "react-dom",
    "three",
    "@react-three/fiber",
  ]) {
    test(`shares the application's ${dependency} instance`, () => {
      assert.equal(
        nodeToyRequire.resolve(dependency),
        projectRequire.resolve(dependency)
      );
    });
  }
});
