import path from "path";

import { convertImportPathToNonRelative } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/convertImportPathToNonRelative";

describe("convertImportPathToNonRelative", () => {
  test.each([
    {
      filename:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\feature1.types.ts",
      dirname: "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1",
      resolve:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\Feature1.tsx",
      importPath: "./Feature1.tsx",
      projectRootWithBaseUrl: "C:\\Users\\user\\Desktop\\repo\\src",
      expected: "features/Feature1/Feature1.tsx",
    },
    {
      filename:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\feature1.types.ts",
      dirname: "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1",
      resolve: "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature2.tsx",
      importPath: "../Feature2.tsx",
      projectRootWithBaseUrl: "C:\\Users\\user\\Desktop\\repo\\src",
      expected: "features/Feature2.tsx",
    },
    {
      filename:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\feature1.types.ts",
      dirname: "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1",
      resolve: "C:\\Users\\user\\Desktop\\repo\\src\\index.tsx",
      importPath: "../../index.tsx",
      projectRootWithBaseUrl: "C:\\Users\\user\\Desktop\\repo\\src",
      expected: "index.tsx",
    },
    {
      filename:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\feature1.types.ts",
      dirname: "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1",
      resolve:
        "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\Feature1.tsx",
      importPath: "features/Feature1/Feature1.tsx",
      projectRootWithBaseUrl: "C:\\Users\\user\\Desktop\\repo\\src",
      expected: "features/Feature1/Feature1.tsx",
    },
  ])(
    "Should return correct value for %s",
    ({
      filename,
      importPath,
      projectRootWithBaseUrl,
      dirname,
      resolve,
      expected,
    }) => {
      jest.spyOn(path, "dirname").mockImplementation(() => dirname);
      jest.spyOn(path, "resolve").mockImplementation(() => resolve);

      expect(
        convertImportPathToNonRelative({
          filename,
          importPath,
          projectRootWithBaseUrl,
        }),
      ).toEqual(expected);

      jest.restoreAllMocks();
    },
  );
});
