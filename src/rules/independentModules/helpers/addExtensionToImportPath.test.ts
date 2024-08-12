import path from "path";

import { addExtensionToImportPath } from "rules/independentModules/helpers/addExtensionToImportPath";

jest.mock("fs", () => ({
  existsSync: jest.fn((path) => {
    if (
      path ===
      "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature2\\index.ts"
    ) {
      return true;
    }

    if (
      path ===
      "C:\\Users\\user\\Desktop\\repo\\src\\features\\Feature1\\Feature1.testExt"
    ) {
      return true;
    }

    if (path === "C:\\Users\\user\\Desktop\\repo\\node_modules\\lib") {
      return true;
    }

    if (
      path === "C:\\Users\\user\\Desktop\\repo\\node_modules\\lib\\index.d.ts"
    ) {
      return true;
    }

    if (path === "C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\lib") {
      return true;
    }

    if (
      path ===
      "C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\lib\\index.d.ts"
    ) {
      return true;
    }

    return false;
  }),
}));

describe("addExtensionToImportPath", () => {
  test.each([
    {
      importPath: "features/Feature1/Feature1",
      extensions: [".testExt"],
      expected: "features/Feature1/Feature1.testExt",
    },
    {
      importPath: "features/Feature1/Feature1.tsx",
      extensions: undefined,
      expected: "features/Feature1/Feature1.tsx",
    },
    {
      importPath: "features/Feature2",
      extensions: undefined,
      expected: "features/Feature2/index.ts",
    },
    {
      importPath: "lib",
      extensions: undefined,
      expected: "lib/index.d.ts",
    },
    {
      importPath: "lib/index",
      extensions: undefined,
      expected: "lib/index.d.ts",
    },
    {
      importPath: "@types/lib",
      extensions: undefined,
      expected: "@types/lib/index.d.ts",
    },
    {
      importPath: "@types/lib/index",
      extensions: undefined,
      expected: "@types/lib/index.d.ts",
    },
    {
      importPath: "react",
      extensions: undefined,
      expected: "react",
    },
  ])(
    "Should return correct value for %s",
    ({ importPath, extensions, expected }) => {
      jest
        .spyOn(path, "join")
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\src\\${importPath.replaceAll("/", "\\")}`,
        )
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\src\\${importPath.replaceAll("/", "\\")}\\index`,
        )
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\node_modules\\${importPath.replaceAll("/", "\\")}`,
        )
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\node_modules\\${importPath.replaceAll("/", "\\")}\\index`,
        )
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\${importPath.replaceAll("/", "\\")}`,
        )
        .mockImplementationOnce(
          () =>
            `C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\${importPath.replaceAll("/", "\\")}\\index`,
        );

      expect(
        addExtensionToImportPath({
          importPath,
          cwdWithRoot: "C:\\Users\\user\\Desktop\\repo\\src\\",
          extensions,
          cwd: "C:\\Users\\user\\Desktop\\repo",
        }),
      ).toEqual(expected);

      jest.restoreAllMocks();
    },
  );
});
