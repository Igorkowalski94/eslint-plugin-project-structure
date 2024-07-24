import { isRegexInvalid } from "./isRegexInvalid";

describe("isRegexInvalid", () => {
    it("should return true when regex is invalid", () => {
        expect(isRegexInvalid("/^?/")).toEqual(true);
    });

    it("should return false when regex is valid", () => {
        expect(isRegexInvalid("/^$/")).toEqual(false);
    });
});
