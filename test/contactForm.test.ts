import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  validateContactForm,
  validateEmail,
  validateMessage,
} from "../src/stage2/utils/contactForm";

describe("contact form validation", () => {
  test("accepts ordinary and tagged email addresses", () => {
    assert.equal(validateEmail("person@example.com"), true);
    assert.equal(validateEmail("person+portfolio@sub.example.co.uk"), true);
  });

  test("normalizes surrounding whitespace and case", () => {
    assert.equal(validateEmail("  PERSON@EXAMPLE.COM  "), true);
  });

  test("rejects missing email components", () => {
    assert.equal(validateEmail("person.example.com"), false);
    assert.equal(validateEmail("@example.com"), false);
    assert.equal(validateEmail("person@"), false);
  });

  test("rejects whitespace and short top-level domains", () => {
    assert.equal(validateEmail("person @example.com"), false);
    assert.equal(validateEmail("person@example.c"), false);
  });

  test("rejects ambiguous or oversized email addresses", () => {
    assert.equal(validateEmail("person@@example.com"), false);
    assert.equal(validateEmail(".person@example.com"), false);
    assert.equal(validateEmail("person..name@example.com"), false);
    assert.equal(
      validateEmail(`${"a".repeat(MAX_EMAIL_LENGTH)}@example.com`),
      false
    );
  });

  test("rejects non-string email values", () => {
    assert.equal(validateEmail(null), false);
    assert.equal(validateEmail(42), false);
  });

  test("accepts a non-empty message", () => {
    assert.equal(validateMessage("Hello"), true);
    assert.equal(validateMessage("  Hello  "), true);
  });

  test("rejects blank and non-string messages", () => {
    assert.equal(validateMessage("   "), false);
    assert.equal(validateMessage(""), false);
    assert.equal(validateMessage(undefined), false);
  });

  test("enforces the same message length limit as the form", () => {
    assert.equal(validateMessage("a".repeat(MAX_MESSAGE_LENGTH)), true);
    assert.equal(validateMessage("a".repeat(MAX_MESSAGE_LENGTH + 1)), false);
  });

  test("reports each field independently", () => {
    assert.deepEqual(validateContactForm("bad", "Hello"), {
      email: false,
      message: true,
    });
    assert.deepEqual(validateContactForm("person@example.com", " "), {
      email: true,
      message: false,
    });
  });

  test("accepts a complete valid form", () => {
    assert.deepEqual(validateContactForm("person@example.com", "Hello"), {
      email: true,
      message: true,
    });
  });
});
