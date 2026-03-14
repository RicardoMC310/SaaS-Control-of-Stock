import { expect } from "vitest";
import { describe, it } from "vitest";

describe("testando test", () => {
    it("1 + 1", () => {
        const res = 1 + 1;

        expect(res).toBe(2);
    });
});