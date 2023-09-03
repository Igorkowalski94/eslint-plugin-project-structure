import { getInvalidIgnorePatternsError } from "./getInvalidIgnorePatternsError";
import { isIgnoredPathname } from "./isIgnoredPathname";

describe("isIgnoredPathname", () => {
    it("should return false when ignorePatterns === undefined", () => {
        expect(
            isIgnoredPathname("src/legacy/ComponentName.tsx", undefined),
        ).toEqual(false);
    });

    it.each([{}, 1, "1", [0], [1], [""], [undefined], [null], [{}], [[]]])(
        "should throw error when ignorePatterns are invalid ignorePatterns = %s",
        (filePath) => {
            expect(() =>
                isIgnoredPathname("src/legacy", filePath as string[]),
            ).toThrow(getInvalidIgnorePatternsError(filePath));
        },
    );

    it.each<[boolean, string]>([
        [true, "src/legacy/ComponentName.tsx"],
        [false, "src/ComponentName.tsx"],
    ])("should return = %s when filePath = %s", (ignore, filePath) => {
        expect(isIgnoredPathname(filePath, ["src/legacy"])).toEqual(ignore);
    });
});
