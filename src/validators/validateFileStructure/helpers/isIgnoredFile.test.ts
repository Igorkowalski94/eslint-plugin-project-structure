import { isIgnoredFile } from "./isIgnoredFile";

describe("isIgnoredFile", () => {
    it.each<[string]>([
        ["src/legacy/ComponentName.tsx"],
        ["src\\legacy\\ComponentName.tsx"],
    ])(
        "should return true when pathname is in ignorePatterns filePath = %s",
        (filePath) => {
            expect(
                isIgnoredFile(filePath, {
                    structure: {},
                    ignorePatterns: ["src/legacy"],
                }),
            ).toEqual(true);
        },
    );

    it.each<[string]>([
        ["src/feature/ComponentName.tsx"],
        ["src\\feature\\ComponentName.tsx"],
    ])(
        "should return false when pathname is not in ignorePatterns filePath = %s",
        (filePath) => {
            expect(
                isIgnoredFile(filePath, {
                    structure: {},
                    ignorePatterns: ["src/legacy"],
                }),
            ).toEqual(false);
        },
    );

    it.each<[string]>([
        ["src/legacy/ComponentName.tsx"],
        ["src\\legacy\\ComponentName.tsx"],
    ])(
        "should return false when ignorePatterns === undefined filePath = %s",
        (filePath) => {
            expect(
                isIgnoredFile(filePath, {
                    structure: {},
                }),
            ).toEqual(false);
        },
    );
});
