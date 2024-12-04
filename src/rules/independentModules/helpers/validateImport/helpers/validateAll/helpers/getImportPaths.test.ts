import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { Paths } from "rules/independentModules/independentModules.types";

jest.mock("fs", () => ({
  existsSync: jest.fn((path) => {
    if (
      path ===
      "C:/Users/project/src/rules2/independentModules/independentModules.html"
    ) {
      return false;
    }

    return true;
  }),
}));

describe("getImportPaths", () => {
  test.each<{
    importPath: string;
    paths?: Paths;
    expected: { importPath: string; pathAlias: boolean }[];
  }>([
    {
      importPath: "src/rules/independentModules/independentModules",
      paths: undefined,
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules",
          pathAlias: false,
        },
      ],
    },
    {
      importPath: "src/rules/independentModules/independentModules",
      paths: {},
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules",
          pathAlias: false,
        },
      ],
    },
    {
      importPath: "@independentModules/independentModules",
      paths: {
        "@independentModules/*": [
          "src/rules/independentModules/*",
          "src/rules2/independentModules/*",
        ],
      },
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules.html",
          pathAlias: true,
        },
        {
          importPath:
            "src/rules2/independentModules/independentModules/index.html",
          pathAlias: true,
        },
      ],
    },
    {
      importPath: "independentModules/independentModules",
      paths: {
        "independentModules/*": ["src/rules/independentModules/*"],
      },
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules.html",
          pathAlias: true,
        },
      ],
    },

    {
      importPath: "@clerk/nextjs",
      paths: {
        "@/*": ["./src/*"],
      },
      expected: [{ importPath: "@clerk/nextjs", pathAlias: false }],
    },

    {
      importPath: "@datasrc/file",
      paths: {
        "@datasrc/*": ["../../datasrc/*"],
      },
      expected: [{ importPath: "C:/datasrc/file.html", pathAlias: true }],
    },

    {
      importPath: "@/components/hello",
      paths: {
        "@/*": ["./src/*", "../../test/*"],
      },
      expected: [
        { importPath: "src/components/hello.html", pathAlias: true },
        { importPath: "C:/test/components/hello.html", pathAlias: true },
      ],
    },
  ])(
    "Should return correct value for %o",
    ({ importPath, paths, expected }) => {
      expect(
        getImportPaths({
          importPath,
          paths,
          projectRootWithBaseUrl: "C:/Users/project",
        }),
      ).toEqual(expected);
    },
  );
});
