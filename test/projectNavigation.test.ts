import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  UNKNOWN_PROJECT_INDEX,
  getNextProjectIndex,
  getPreviousProjectIndex,
  getProjectByIndex,
} from "../src/stage1/utils/projectNavigation";

describe("project navigation", () => {
  const projectCount = 7;

  test("starts forward navigation at the first project", () => {
    assert.equal(getNextProjectIndex(UNKNOWN_PROJECT_INDEX, projectCount), 1);
  });

  test("advances to the next project", () => {
    assert.equal(getNextProjectIndex(3, projectCount), 4);
  });

  test("wraps forward from the last project", () => {
    assert.equal(getNextProjectIndex(projectCount, projectCount), 1);
  });

  test("recovers forward navigation from an out-of-range index", () => {
    assert.equal(getNextProjectIndex(projectCount + 1, projectCount), 1);
  });

  test("starts backward navigation at the last project", () => {
    assert.equal(
      getPreviousProjectIndex(UNKNOWN_PROJECT_INDEX, projectCount),
      projectCount
    );
  });

  test("moves to the previous project", () => {
    assert.equal(getPreviousProjectIndex(4, projectCount), 3);
  });

  test("wraps backward from the first project", () => {
    assert.equal(getPreviousProjectIndex(1, projectCount), projectCount);
  });

  test("recovers backward navigation from an out-of-range index", () => {
    assert.equal(
      getPreviousProjectIndex(projectCount + 1, projectCount),
      projectCount
    );
  });

  test("returns the selected project", () => {
    const projects = [{ id: 1 }, { id: 2 }];
    assert.deepEqual(getProjectByIndex(projects, 2), { id: 2 });
  });

  test("returns null for the placeholder and invalid indexes", () => {
    const projects = [{ id: 1 }];
    assert.equal(getProjectByIndex(projects, 0), null);
    assert.equal(getProjectByIndex(projects, -1), null);
    assert.equal(getProjectByIndex(projects, 2), null);
  });

  test("handles invalid inputs without producing unsafe indexes", () => {
    assert.equal(
      getNextProjectIndex("1" as unknown as number, projectCount),
      0
    );
    assert.equal(getPreviousProjectIndex(Number.NaN, projectCount), 0);
    assert.equal(getNextProjectIndex(1, 0), 0);
    assert.equal(getPreviousProjectIndex(1, 0), 0);
    assert.equal(getNextProjectIndex(1, Number.NaN), 0);
    assert.equal(getPreviousProjectIndex(1, 2.5), 0);
    assert.equal(getProjectByIndex(null, 1), null);
    assert.equal(
      getProjectByIndex([{ id: 1 }], "1" as unknown as number),
      null
    );
    assert.equal(getProjectByIndex([{ id: 1 }], 1.5), null);
  });
});
