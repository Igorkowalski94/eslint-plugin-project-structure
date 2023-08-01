import { getRegexWithInheritName } from "./getRegexWithInheritName";

describe("getRegexWithInheritName", () => {
    it("should return correct regex", () => {
        expect(
            getRegexWithInheritName("/^.*\\.(types|api)$/", "ComponentName"),
        ).toEqual("/^ComponentName.*\\.(types|api)$/");
    });
});
