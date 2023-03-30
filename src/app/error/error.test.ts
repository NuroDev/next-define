import { describe, it, expect } from "vitest";
import { number } from "minifaker";

import { error } from ".";

describe("error", () => {
  it("true", () => expect(true).toEqual(true));
});
