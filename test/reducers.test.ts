import assert from "node:assert/strict";
import { describe, test } from "node:test";

import aboutReducer, {
  decrementAboutCount,
  setAboutCount,
  setBackState,
  setGlitchState,
} from "../src/app/aboutSlice";
import contactReducer, {
  type ContactCounterState,
  incrementContact,
  reset,
  setContactCount,
} from "../src/app/contactsCounterSlice";
import loaderReducer, {
  LOADER_INTRO_END,
  setLoaderProgress,
  startLoaderReveal,
} from "../src/app/loaderSlice";
import mainReducer, {
  setMain,
  triggerWarning,
} from "../src/app/mainSlice";
import projectReducer, {
  decrement,
  increment,
} from "../src/app/projectCounterSlice";

describe("project counter reducer", () => {
  test("moves from the placeholder in both directions", () => {
    assert.equal(projectReducer(undefined, increment()).value, 1);
    assert.equal(projectReducer(undefined, decrement()).value, 7);
  });

  test("cycles through all projects without a negative index", () => {
    let state;
    const visited = [];
    for (let index = 0; index < 8; index += 1) {
      state = projectReducer(state, increment());
      visited.push(state.value);
    }
    assert.deepEqual(visited, [1, 2, 3, 4, 5, 6, 7, 1]);
    assert.ok(visited.every((value) => value >= 1));
  });

  test("wraps backward from the first project", () => {
    assert.equal(projectReducer({ value: 1 }, decrement()).value, 7);
  });
});

describe("contact counter reducer", () => {
  test("increments and caps the interactive sequence", () => {
    let state: ContactCounterState = { value: 3 };
    state = contactReducer(state, incrementContact());
    assert.equal(state.value, 4);
    state = contactReducer(state, incrementContact());
    assert.equal(state.value, 4);
  });

  test("supports explicit scene phases and reset", () => {
    assert.equal(contactReducer(undefined, setContactCount(5)).value, 5);
    assert.equal(contactReducer({ value: 5 }, reset()).value, 0);
  });
});

describe("about reducer", () => {
  test("updates about scene flags", () => {
    let state = aboutReducer(undefined, setGlitchState(true));
    state = aboutReducer(state, setBackState(true));
    assert.equal(state.isGlitch, true);
    assert.equal(state.isBack, true);
  });

  test("decrements and clamps scroll progress at zero", () => {
    let state = aboutReducer(undefined, setAboutCount(0.015));
    state = aboutReducer(state, decrementAboutCount(0.01));
    assert.equal(state.value, 0.004999999999999999);
    state = aboutReducer(state, decrementAboutCount(0.01));
    assert.equal(state.value, 0);
  });
});

describe("main and loader reducers", () => {
  test("changes stages", () => {
    assert.equal(mainReducer(undefined, setMain(2)).value, 2);
  });

  test("only presents the first warning and allows it to be dismissed", () => {
    let state = mainReducer(undefined, triggerWarning("mobile"));
    state = mainReducer(state, triggerWarning("fps"));
    assert.equal(state.warning.reason, "mobile");
    state = mainReducer(state, triggerWarning("clear"));
    assert.deepEqual(state.warning, { wasTriggered: true, reason: "" });
  });

  test("records elapsed loader progress", () => {
    assert.equal(loaderReducer(undefined, setLoaderProgress(0.05)).value, 0.05);
  });

  test("caps loader progress and records the scene reveal handoff", () => {
    let state = loaderReducer(undefined, setLoaderProgress(100));

    assert.equal(state.value, LOADER_INTRO_END);
    assert.equal(state.isRevealing, false);
    state = loaderReducer(state, startLoaderReveal());
    assert.equal(state.isRevealing, true);
  });

  test("rejects negative loader progress", () => {
    assert.equal(loaderReducer(undefined, setLoaderProgress(-1)).value, 0);
  });
});
