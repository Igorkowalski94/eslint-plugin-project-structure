import { isIgnoredFile } from "./isIgnoredFile";

describe("isIgnoredFile", () => {
    it("should return true when pathname is in ignorePatterns", () => {
        expect(
            isIgnoredFile("src/legacy", {
                structure: {},
                ignorePatterns: ["src/legacy"],
            }),
        ).toEqual(true);
    });

    it("should return false when pathname is not in ignorePatterns", () => {
        expect(
            isIgnoredFile("src/feature", {
                structure: {},
                ignorePatterns: ["src/legacy"],
            }),
        ).toEqual(false);
    });

    it("should return false when ignorePatterns === undefined", () => {
        expect(isIgnoredFile("src/legacy", { structure: {} })).toEqual(false);
    });
});
