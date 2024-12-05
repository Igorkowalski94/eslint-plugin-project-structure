import { getFamilyPath } from "rules/independentModules/helpers/getFamilyPath";
import { NO_FAMILY } from "rules/independentModules/independentModules.consts";

describe("getFamilyPath", () => {
  test.each([
    {
      filename: "features/Feature1/Feature.tsx",
      importPath: "features/Feature1/feature1.types.ts",
      pattern: "{family}/*.ts",
      expected: "features/Feature1",
    },
    {
      filename: "features/Feature1/(components)/Feature.tsx",
      importPath: "features/Feature1/(components)/feature1.types.ts",
      pattern: "{family}/*.ts",
      expected: "features/Feature1/\\(components\\)",
    },
    {
      filename: "features/Feature1/components/Child1.tsx",
      importPath: "features/Feature1/feature1.types.ts",
      pattern: "{family}/*.ts",
      expected: "features/Feature1",
    },
    {
      filename: "features/Feature1/Feature1.tsx",
      importPath: "features/Feature2/feature2.types.ts",
      pattern: "{family_1}/*.ts",
      expected: "features",
    },
    {
      filename: "features/Feature1/Feature1.tsx",
      importPath: "features/Feature2/feature2.types.ts",
      pattern: "{family}/*.ts",
      expected: NO_FAMILY,
    },
    {
      filename: "features/Feature1/Feature.tsx",
      importPath: "features/Feature1/feature1.types.ts",
      pattern: "{family_3}/*.ts",
      expected: NO_FAMILY,
    },
  ])(
    "Should return correct value for %s",
    ({ filename, importPath, pattern, expected }) => {
      expect(getFamilyPath({ filename, importPath, pattern })).toEqual(
        expected,
      );
    },
  );
});
