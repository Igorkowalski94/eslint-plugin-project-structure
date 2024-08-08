import { convertReferencesToPath } from "rules/independentModules/helpers/convertReferencesToPath";

describe("convertReferencesToPath", () => {
    test.each([
        {
            filename: "features/Feature1/feature1.types.ts",
            importPath: "features/Feature1/Feature1.tsx",
            pattern: ["{family}/*.tsx", "{dirname}/*.ts"],
            expected: ["features/Feature1/*.tsx", "features/Feature1/*.ts"],
        },
        {
            filename: "features/Feature1/feature1.types.ts",
            importPath: "features/Feature1/Feature1.tsx",
            pattern: "{family}/*.tsx",
            expected: "features/Feature1/*.tsx",
        },
    ])(
        "Should return correct value for %s",
        ({ filename, importPath, pattern, expected }) => {
            expect(
                convertReferencesToPath({ filename, importPath, pattern }),
            ).toEqual(expected);
        },
    );
});
