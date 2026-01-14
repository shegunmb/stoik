import { describe, it, expect } from "vitest";
import { generateShortCode } from "../urls.js";

describe("generateShortCode", () => {
  it("should generate a 6 char string", () => {
    const code = generateShortCode();
    expect(code).toHaveLength(6);
  });
});
