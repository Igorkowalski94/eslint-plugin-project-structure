import { isIgnoredPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/isIgnoredPathname";

describe("isIgnoredPathname", () => {
    it("should return false when ignorePatterns === undefined", () => {
        expect(
            isIgnoredPathname({
                pathname: "src/legacy/ComponentName.tsx",
                ignorePatterns: undefined,
            }),
        ).toEqual(false);
    });

    it.each<{ expected: boolean; pathname: string }>([
        { pathname: "src/legacy/ComponentName.tsx", expected: true },
        { pathname: "src/ComponentName.tsx", expected: false },
    ])("Should return correct value for %o", ({ expected, pathname }) => {
        expect(
            isIgnoredPathname({
                pathname,
                ignorePatterns: ["src/legacy/**"],
            }),
        ).toEqual(expected);
    });
});
