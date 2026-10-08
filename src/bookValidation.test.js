import { describe, test, expect } from "vitest";
import { validateBook } from "./bookValidation";

describe("Book Management", () => {
  test("should accept valid book details", () => {
    expect(validateBook("Java Programming", "James Gosling", "Programming")).toBe(
      "Book is valid"
    );
  });
  test("should reject empty book title", () => {
    expect(validateBook("", "James Gosling", "Programming")).toBe(
      "Book title is required"
    );
  });
  test("should reject empty author", () => {
    expect(validateBook("Java Programming", "", "Programming")).toBe(
      "Author is required"
    );
  });
});
