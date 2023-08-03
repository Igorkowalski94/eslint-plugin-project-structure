import { getInvalidIgnorePatternsError } from "./getInvalidIgnorePatternsError";
import { isIgnoredPath } from "./isIgnoredPath";

describe("isIgnoredPath", () => {
    it("should return false when ignorePatterns === undefined", () => {
        expect(
            isIgnoredPath("src/legacy/ComponentName.tsx", undefined),
        ).toEqual(false);
    });

    it.each([{}, 1, "1"])(
        "should throw error when ignorePatterns are invalid ignorePatterns = %s",
        (filePath) => {
            expect(() =>
                isIgnoredPath("src/legacy", filePath as string[]),
            ).toThrow(getInvalidIgnorePatternsError(filePath));
        },
    );

    it.each<[string]>([
        ["src/legacy/ComponentName.tsx"],
        ["src\\legacy\\ComponentName.tsx"],
    ])(
        "should return true when pathname is in ignorePatterns filePath = %s",
        (filePath) => {
            expect(isIgnoredPath(filePath, ["src/legacy"])).toEqual(true);
        },
    );

    it.each<[string]>([
        ["src/feature/ComponentName.tsx"],
        ["src\\feature\\ComponentName.tsx"],
    ])(
        "should return false when pathname is not in ignorePatterns filePath = %s",
        (filePath) => {
            expect(isIgnoredPath(filePath, ["src/legacy"])).toEqual(false);
        },
    );
});
